import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';

const baseURL = 'https://norma.nomoreparties.space/api';
const headers = {
  'Content-Type': 'application/json',
};

export const api = axios.create({
  baseURL,
  headers,
});

export const authApi = axios.create({
  baseURL: `${baseURL}/auth`,
  headers,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});
