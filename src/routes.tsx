import { useRoutes } from 'react-router-dom';

import MainPage from './modules/site/pages/Main';
import NotFound from './modules/site/pages/NotFound';

import AuthRoutes from './modules/auth/routes';
import AuthenticatedRoute from './utils/components/Authenticated';

const AppRoutes = () => {
    return useRoutes([
        { path: '/', element: <AuthenticatedRoute><MainPage /></AuthenticatedRoute> },
        ...AuthRoutes,
        { path: '*', element: <NotFound /> },
    ]);
}

export default AppRoutes;