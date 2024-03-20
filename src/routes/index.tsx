import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import Breed from './Breed';
import Search from './Search';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'search/:breed',
        element: <Search />,
      },
      {
        path: 'breeds/:id',
        element: <Breed />,
      },
    ],
  },
]);
