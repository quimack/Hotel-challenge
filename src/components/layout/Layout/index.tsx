import { FC } from "react"
import { Header, Main } from ".."

const Layout: FC = ({children}) => {
    return(
        <>
            <Header />
            <Main>
                { children }
            </Main>
        </>
    )
}

export { Layout }