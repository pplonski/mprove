export enum ServerResponseStatusEnum {
  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  DbError = 'db_error',
  DiskError = 'disk_error',
  GitError = 'git_error',
  GithubError = 'github_error',
  ApiError = 'api_error',
  AuthorizationError = 'authorization_error',
  AuthorizationEmailError = 'authorization_email_error',
  InternalServerError = 'internal_server_error',
  Ok = 'ok',
  MaintenanceMode = 'maintenance_mode',
  BlockmlWrongRequestParams = 'blockml_wrong_request_params',
  BlockmlInternalError = 'blockml_internal_error',
  BlockmlConnectionError = 'blockml_connection_error',
  AccessDenied = 'access_denied',
  BqError = 'bq_error',
  ConfirmMessageNotFound = 'confirm_message_not_found',
  DashboardEntityAlreadyExist = 'dashboard_entity_already_exist',
  DashboardEntityNotFound = 'dashboard_entity_not_found',
  DashboardEntityDeleted = 'dashboard_entity_deleted',
  FileEntityAlreadyExist = 'file_entity_already_exist',
  FileEntityNotFound = 'file_entity_not_found',
  FolderEntityAlreadyExist = 'folder_entity_already_exist',
  FolderEntityNotFound = 'folder_entity_not_found',
  GithubRepoAlreadyExist = 'github_repo_already_exist',
  GithubRepoNameWasChanged = 'github_repo_name_was_changed',
  GithubTransportServerError = 'github_transport_server_error',
  InitEntityNotFound = 'init_entity_not_found',
  InvalidCredentials = 'invalid_credentials',
  MconfigEntityAlreadyExist = 'mconfig_entity_already_exist',
  MconfigEntityNotFound = 'mconfig_entity_not_found',
  MconfigEntityDeleted = 'mconfig_entity_deleted',
  MemberEntityAlreadyExist = 'member_entity_already_exist',
  MemberEntityNotFound = 'member_entity_not_found',
  MessageEntityNotFound = 'message_entity_not_found',
  MissingRequiredFieldInRequestBody = 'missing_required_field_in_request_body',
  MissingRequiredFieldInRequestBodyPayload = 'missing_required_field_in_request_body_payload',
  ModelEntityAlreadyExist = 'model_entity_already_exist',
  ModelEntityNotFound = 'model_entity_not_found',
  ModelEntityDeleted = 'model_entity_deleted',
  NotImplemented = 'not_implemented',
  PingNotFound = 'ping_not_found',
  PlanEntityAlreadyExist = 'plan_entity_already_exist',
  PlanEntityNotFound = 'plan_entity_not_found',
  ProjectDeleted = 'project_deleted',
  ProjectEntityAlreadyExist = 'project_entity_already_exist',
  ProjectEntityNotFound = 'project_entity_not_found',
  ProjectNameNotValid = 'project_name_not_valid',
  ProjectNameNotUnique = 'project_name_not_unique',
  QueryEntityAlreadyExist = 'query_entity_already_exist',
  QueryEntityNotFound = 'query_entity_not_found',
  QueryEntityDeleted = 'query_entity_deleted',
  RepoEntityAlreadyExist = 'repo_entity_already_exist',
  RepoEntityNotFound = 'repo_entity_not_found',
  ServerTsOutdatedOnClient = 'server_ts_outdated_on_client',
  ServiceOff = 'service_off',
  ServiceUnavailable = 'service_unavailable',
  SubscriptionEntityAlreadyExist = 'subscription_entity_already_exist',
  SubscriptionEntityNotFound = 'subscription_entity_not_found',
  SubscriptionEntityDoNotCancelled = 'subscription_entity_do_not_cancelled',
  SubscriptionsSwitchAnalyticsSubscriptionPlanFailed = 'subscriptions_switch_analytics_subscription_plan_failed',
  TestAlreadyStarted = 'test_already_started',
  TestAlreadyFinished = 'test_already_finished',
  TestNotStarted = 'test_not_started',
  UserEntityNotFound = 'user_entity_not_found'
}
