import { Grid } from "@mui/material";
import { FC } from "react";

const Main: FC = ({children}) => {
    return (
        <Grid container p={6} sx={{bgcolor: 'background.paper', color: 'primary.dark'}}>
            { children }
        </Grid>
    )
}

export { Main };