import { ThemeProvider } from "@mui/material";
import { FC } from "react";
import { theme } from "../../../styles";
import { Header } from "../Header";
import { Main } from "../Main";


const Layout: FC = ({children}) => {
    return(
        <>
        <ThemeProvider theme={theme}>
            <Header />
            <Main>
                { children }
            </Main>
        </ThemeProvider>
        </>
    )
}

export { Layout }