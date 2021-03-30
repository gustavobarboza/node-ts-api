import { MissingParamError } from '../errors/MissingParamError';
import { badRequest } from '../helpers/http-helper';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export default class SignUpController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

    // const missingFields: Array<string> = [];

    // requiredFields.forEach((field) => {
    //   if (!httpRequest.body[field]) {
    //     missingFields.push(field);
    //   }
    // });

    // eslint-disable-next-line no-restricted-syntax
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    return null;
  }
}
