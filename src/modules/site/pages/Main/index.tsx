import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AppContext } from '../../../../context';

const MainPage = () => {
    const { state, dispatch } = useContext(AppContext);

    return (
        <div>
            <h1>Main Page</h1>
        </div>
    );
}

export default MainPage;