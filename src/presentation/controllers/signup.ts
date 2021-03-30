import { MissingParamError } from '../errors/MissingParamError';
import { badRequest } from '../helpers/http-helper';
import { HttpRequest, HttpResponse } from '../protocols/http';

export default class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email'];

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
