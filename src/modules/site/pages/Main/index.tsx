import React from 'react'
import { Container } from "@mui/material";
import Scaffold from "../../../../utils/components/Scaffold";

import { AppContext } from "../../../../context";


const MainPage = () => {

    const { state } = React.useContext(AppContext);

    return (
        <Scaffold>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                {state.auth.credential?.user?.firstname}
            </Container>
        </Scaffold>
    );
}

export default MainPage;