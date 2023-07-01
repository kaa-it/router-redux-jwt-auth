import { useSelector } from 'react-redux';
import { selectUser } from '../services/user-slice';
import { Form } from 'react-router-dom';
import { updateUserAction } from '../services/actions/update-user-action';

const Profile = () => {
  const { name, email } = useSelector(selectUser);

  return (
    <section>
      <Form method="post" className="flex flex-col gap-4 justify-center items-center">
        <h1>Edit Profile</h1>
        <label htmlFor="email">
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={email}
            placeholder="Email"
            className="border p-2"
          />
        </label>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={name}
            placeholder="Name"
            className="border p-2"
          />
        </label>
        <label htmlFor="password">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="border p-2"
          />
          <div className="flex flex-row-reverse gap-4 mt-4">
            <button type="submit" className="bg-blue-600 px-4 py-2 text-white">
              Edit
            </button>
            <button type="reset" className="px-4 py-2 border">
              Reset
            </button>
          </div>
        </label>
      </Form>
    </section>
  );
};

Profile.updateUser = updateUserAction;

export { Profile };
