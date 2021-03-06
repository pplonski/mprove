import { In } from 'typeorm';
import { api } from '../../barrels/api';
import { entities } from '../../barrels/entities';
import { enums } from '../../barrels/enums';
import { helper } from '../../barrels/helper';
import { store } from '../../barrels/store';
import { runQueryWithoutDeps } from './run-query-without-deps';
import { forEach } from 'p-iteration';

export async function runQuery(item: {
  all_dep_queries: entities.QueryEntity[];
  checked_query_ids_without_deps: string[];
  bigquery_project: string;
  is_top: boolean;
  query: entities.QueryEntity;
  new_last_run_ts: string;
  credentials_file_path: string;
  user_id: string;
  refresh: boolean;
}): Promise<entities.QueryEntity[]> {
  let query = item.query;

  if (
    query.status === api.QueryStatusEnum.Waiting ||
    query.status === api.QueryStatusEnum.Running
  ) {
    return [];
  }

  if (
    item.refresh === false &&
    item.is_top === false && // means also that query.is_pdt === bEnum.TRUE
    Number(query.last_complete_ts) > 1
  ) {
    return [];
  }

  let pdtDeps = JSON.parse(query.pdt_deps);

  if (pdtDeps.length === 0) {
    if (item.checked_query_ids_without_deps.indexOf(query.query_id) > -1) {
      return [];
    }

    item.checked_query_ids_without_deps.push(query.query_id);

    query = <entities.QueryEntity>await runQueryWithoutDeps({
      credentials_file_path: item.credentials_file_path,
      bigquery_project: item.bigquery_project,
      user_id: item.user_id,
      query: query,
      new_last_run_ts: item.new_last_run_ts
    }).catch(e =>
      helper.reThrow(e, enums.procErrorsEnum.PROC_RUN_QUERY_WITHOUT_DEPS)
    );

    return [query];
  } else {
    let queries = item.all_dep_queries.filter(
      q => pdtDeps.indexOf(q.pdt_id) > -1
    );

    let processedQueries: entities.QueryEntity[] = [];

    await forEach(queries, async q => {
      let depQueries = await (<Promise<entities.QueryEntity[]>>runQuery({
        all_dep_queries: item.all_dep_queries,
        checked_query_ids_without_deps: item.checked_query_ids_without_deps,
        is_top: false,
        query: q,
        credentials_file_path: item.credentials_file_path,
        bigquery_project: item.bigquery_project,
        user_id: item.user_id,
        refresh: item.refresh,
        new_last_run_ts: item.new_last_run_ts
      }).catch(e => helper.reThrow(e, enums.procErrorsEnum.PROC_RUN_QUERY)));

      processedQueries = helper.makeNewArray(processedQueries, depQueries);
    });

    let errorQueries = processedQueries.filter(
      q => q.status === api.QueryStatusEnum.Error
    );

    if (errorQueries.length > 0) {
      let newLastErrorTs = helper.makeTs();

      query.status = api.QueryStatusEnum.Error;
      query.is_checking = enums.bEnum.FALSE;
      query.refresh = null;
      query.last_error_message = 'required pdt(s) has error';
      query.last_error_ts = newLastErrorTs;
      query.last_run_by = item.user_id;
      query.last_run_ts = item.new_last_run_ts;
    } else {
      query.status = api.QueryStatusEnum.Waiting;
      query.is_checking = enums.bEnum.FALSE;
      query.refresh = helper.booleanToBenum(item.refresh);
      query.last_run_by = item.user_id;
      query.last_run_ts = item.new_last_run_ts;
    }

    processedQueries.push(query);

    return processedQueries;
  }
}
