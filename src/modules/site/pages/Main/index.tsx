import { Link } from "react-router-dom";

const MainPage = () => {
    return (
        <div>
            <h1>Main Page</h1>
            <Link to="/auth/sign/in">Go to Sign In</Link>
        </div>
    );
}

export default MainPage;