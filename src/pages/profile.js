import { useSelector } from 'react-redux';
import { selectUser } from '../services/user-slice';

export const Profile = () => {
  const { name, email } = useSelector(selectUser);

  return (
    <div>
      <h1 className="mb-2">Profile</h1>
      <p>name: {name}</p>
      <p>email: {email}</p>
    </div>
  );
};
