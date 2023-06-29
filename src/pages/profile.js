import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { userQuery } from '../services/loaders/user-loader';

export const Profile = () => {
  const { data: user } = useQuery(userQuery());

  const { name, email } = user;

  return (
    <div>
      <h1 className="mb-2">Profile</h1>
      <p>name: {name}</p>
      <p>email: {email}</p>
    </div>
  );
};
