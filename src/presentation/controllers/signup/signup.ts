import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, serverError, created } from '../../helpers/http-helper';
import {
  Controller, HttpRequest, HttpResponse, EmailValidator, AddAccount,
} from './signup-protocols';

export default class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  private readonly addAccount: AddAccount;

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator;
    this.addAccount = addAccount;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
    try {
      // eslint-disable-next-line no-restricted-syntax
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const {
        name, password, passwordConfirmation, email,
      } = httpRequest.body;
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }
      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidParamError('email'));
      }

      const addedAccount = this.addAccount.add({
        name,
        email,
        password,
      });
      return created({
        statusCode: 201,
        body: addedAccount,
      });
    } catch (error) {
      return serverError();
    }
  }
}
