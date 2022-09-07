import { useRoutes } from 'react-router-dom';
import MainPage from '../pages/Main';
import NotFound from '../pages/NotFound';
import SignInPage from '../pages/SignIn';
import SignUpPage from '../pages/SignUp';

const AppRoutes = () => {
    return useRoutes([
        { path: '/', element: <MainPage /> },
        { path: '/auth/sign/in', element: <SignInPage /> },
        { path: '/auth/sign/up', element: <SignUpPage /> },
        { path: '*', element: <NotFound /> },
    ]);
}

export default AppRoutes;