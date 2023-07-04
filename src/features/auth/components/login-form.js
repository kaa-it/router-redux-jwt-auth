import { Form } from 'react-router-dom';

export const LoginForm = ({ redirectTo }) => {
  return (
    <Form method="post" className="flex flex-col gap-4 justify-center items-center">
      <h1>Login form</h1>
      <label htmlFor="email">
        <input id="email" name="email" placeholder="Email" className="border p-2" />
      </label>
      <label htmlFor="password">
        <input id="password" name="password" placeholder="Password" className="border p-2" />
      </label>
      <input type="hidden" id="path" value={redirectTo} name="redirectTo" className="border p-2" />
      <button type="submit" className="bg-blue-600 px-4 py-2 text-white">
        Login
      </button>
    </Form>
  );
};
