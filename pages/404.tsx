import Meta from "../components/Meta"
import TheHeader from "../components/TheHeader/index";

const C404: React.FunctionComponent = () => {
    return <>
        <Meta 
            titleShort="Page unavailable"
            titleLong="LIGHTFILMS. Page unavailable"
            description="LIGHTFILMS. Page unavailable"
            url="https://lightfilms-ssandry.vercel.app/404"
            keywords="LIGHTFILMS, Page unavailable"
        />
        <TheHeader />
        <div className="custom404">
            <div>
                <h1>404</h1>
                <p>Page not found</p>
            </div>
        </div>
    </>
}

export default C404;