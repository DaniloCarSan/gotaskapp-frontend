import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import ForgotPasswordPage from './pages/ForgotPassword';

const AuthRoutes = [
    { path: '/auth/sign/in', element: <SignInPage /> },
    { path: '/auth/sign/up', element: <SignUpPage /> },
    { path: '/auth/forgot/password', element: <ForgotPasswordPage /> },
];


export default AuthRoutes;