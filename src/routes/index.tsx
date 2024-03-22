import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import Breed from './Breed';
import Search from './Search';
import ErrorPage from './ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'search/:breed',
        element: <Search />,
      },
      {
        path: 'breed/:id',
        element: <Breed />,
      },
    ],
  },
]);
