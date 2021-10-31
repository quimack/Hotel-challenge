import { ThemeProvider } from "@mui/material"
import { FC } from "react"
import { Header, Main } from ".."
import { theme } from '../../../styles'


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