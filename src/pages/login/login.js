import { useLocation } from 'react-router-dom';
import { loginAction } from './login-action';
import { PATH } from '../../utils/config';
import { LoginForm } from '../../features/auth';

const Login = () => {
  const location = useLocation();
  const redirectTo = location?.state?.from?.pathname || PATH.HOME;

  return (
    <section className="p-8">
      <LoginForm redirectTo={redirectTo} />
    </section>
  );
};

Login.login = loginAction;

export { Login };
