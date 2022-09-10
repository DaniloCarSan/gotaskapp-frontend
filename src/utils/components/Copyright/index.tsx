import { Box, Typography } from "@mui/material";

const Copyright = () => {
    return (
        <Box sx={{ marginTop: 2 }}>
            <Typography align='center' fontSize={10} fontWeight='bold' >
                Copyright © - {new Date().getFullYear()} - {process.env.REACT_APP_NAME}
            </Typography>
            <Typography align='center' fontSize={10}>
                Todos os direitos reservados
            </Typography>
        </Box>
    );
}

export default Copyright;