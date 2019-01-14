import { api } from '../../barrels/api';
import { enums } from '../../barrels/enums';
import { ServerError } from '../server-error';

export async function errorToResponse(err: any, req: any, res: any, next: any) {
  if (err) {
    console.log(err); // sentry

    res.json({
      info: {
        origin: api.CommunicationOriginEnum.SERVER,
        type: api.CommunicationTypeEnum.RESPONSE,
        reply_to: req.body.info.request_id,
        status:
          err.name === enums.middlewareErrorsEnum.MIDDLEWARE_CHECK_JWT &&
          err.originalError.name === 'UnauthorizedError'
            ? api.ServerResponseStatusEnum.AuthorizationError
            : err instanceof ServerError
            ? mapErrors(err.name)
            : api.ServerResponseStatusEnum.InternalServerError,
        error: {
          message: undefined
        }
      },
      payload: undefined
    });
  } else {
    next();
  }
}

function mapErrors(name: string) {
  switch (name) {
    case enums.otherErrorsEnum.INTERNAL:
      return api.ServerResponseStatusEnum.InternalServerError;

    case enums.otherErrorsEnum.REGISTER_ERROR_USER_ALREADY_EXISTS:
      return api.ServerResponseStatusEnum.REGISTER_ERROR_USER_ALREADY_EXISTS;

    case enums.otherErrorsEnum.LOGIN_ERROR_WRONG_PASSWORD:
      return api.ServerResponseStatusEnum.LOGIN_ERROR_WRONG_PASSWORD;

    case enums.otherErrorsEnum.LOGIN_ERROR_USER_DOES_NOT_EXIST:
      return api.ServerResponseStatusEnum.LOGIN_ERROR_USER_DOES_NOT_EXIST;

    case enums.otherErrorsEnum.VERIFY_EMAIL_ERROR_USER_DOES_NOT_EXIST:
      return api.ServerResponseStatusEnum
        .VERIFY_EMAIL_ERROR_USER_DOES_NOT_EXIST;

    case enums.otherErrorsEnum.CONFIRM_EMAIL_ERROR_USER_DOES_NOT_EXIST:
      return api.ServerResponseStatusEnum
        .CONFIRM_EMAIL_ERROR_USER_DOES_NOT_EXIST;

    case enums.otherErrorsEnum.API:
      return api.ServerResponseStatusEnum.ApiError;
    case enums.otherErrorsEnum.AUTHORIZATION_EMAIL:
      return api.ServerResponseStatusEnum.AuthorizationEmailError;

    default:
      return api.ServerResponseStatusEnum.InternalServerError;
  }
}
