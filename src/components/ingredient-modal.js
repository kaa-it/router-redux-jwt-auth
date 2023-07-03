import { useLocation, useParams } from 'react-router-dom';
import { Modal } from './modal';
import { useQuery } from '@tanstack/react-query';
import { ingredientsQuery } from '../services/loaders/ingredients-loader';
import { ModalFullScreen } from './modal-fullscreen';

export const IngredientModal = () => {
  const { data: ingredients } = useQuery(ingredientsQuery());
  const { id } = useParams();
  const location = useLocation();

  const isFromHome = !!location.state;

  const ingredient = ingredients.find((ingredient) => ingredient._id === id);

  return isFromHome ? (
    <Modal>
      <div className="flex flex-col items-center max-w-lg mx-auto mt-10">
        <h1>{ingredient.name}</h1>
        <img src={ingredient.image_large} alt={ingredient.name} />
        <p>Price: ${ingredient.price}</p>
      </div>
    </Modal>
  ) : (
    <ModalFullScreen>
      <div className="flex flex-col items-center max-w-lg mx-auto mt-10">
        <h1>{ingredient.name}</h1>
        <img src={ingredient.image_large} alt={ingredient.name} />
        <p>Price: ${ingredient.price}</p>
      </div>
    </ModalFullScreen>
  );
};
