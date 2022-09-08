import { useRoutes } from 'react-router-dom';

import MainPage from './modules/site/pages/Main';
import NotFound from './modules/site/pages/NotFound';

import AuthRoutes from './modules/auth/routes';

const AppRoutes = () => {
    return useRoutes([
        { path: '/', element: <MainPage /> },
        ...AuthRoutes,
        { path: '*', element: <NotFound /> },
    ]);
}

export default AppRoutes;