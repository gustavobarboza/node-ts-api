import SignUpController from './signup';

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    const stu = new SignUpController();
    const httpRequest = {
      body: {
        // name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = stu.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });
});
