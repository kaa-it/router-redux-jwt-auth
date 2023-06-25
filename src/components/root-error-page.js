import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { PATH } from '../utils/config';

export const RootErrorPage = () => {
  const error = useRouteError();

  return (
    <div>
      <h1>Oops! Something went wrong :(</h1>
      <p>
        Error {error.status}: {error.statusText}
      </p>
      <Link to={PATH.HOME}>Back to Home</Link>
    </div>
  );
};
