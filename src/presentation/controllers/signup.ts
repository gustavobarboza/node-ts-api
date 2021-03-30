import { MissingParamError } from '../errors/MissingParamError';
import { badRequest } from '../helpers/http-helper';
import { HttpRequest, HttpResponse } from '../protocols/http';

export default class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('Missing param: name'));
    }
    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('Missing param: email'));
    }

    return null;
  }
}
