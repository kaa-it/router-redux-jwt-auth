import { Form } from 'react-router-dom';
import { loginAction } from '../services/actions/login-action';

const Login = () => {
  return (
    <section className="p-8">
      <Form method="post" className="flex flex-col gap-4 justify-center items-center">
        <h1>Login form</h1>
        <label htmlFor="email">
          <input id="email" name="email" placeholder="Email" className="border p-2" />
        </label>
        <label htmlFor="password">
          <input id="password" name="password" placeholder="Password" className="border p-2" />
        </label>
        <button type="submit">Login</button>
      </Form>
    </section>
  );
};

Login.action = loginAction;

export { Login };
