import { QUERYKEY } from '../../utils/config';
import { api } from '../../services/api-setup';

export const ingredientsQuery = () => ({
  queryKey: [QUERYKEY.INGREDIENTS],
  queryFn: async () => {
    const ingredients = await api.get('ingredients');

    if (!ingredients) {
      throw new Response('', {
        status: 404,
        statusText: 'Ingredients Not Found',
      });
    }

    return ingredients.data.data;
  },
});

// return data or fetch it
export const ingredientsLoader = (queryClient) => async () =>
  await queryClient.ensureQueryData(ingredientsQuery());
