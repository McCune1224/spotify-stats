import { useCookies } from "react-cookie";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
    const [cookies, setCookies] = useCookies<string>(["accessToken"]);
    const searchParams = new URLSearchParams(document.location.search);
    const accessToken = searchParams.get("access_token");
    setCookies("AccessToken", accessToken);

    if (accessToken == null) {
        return (
            <div className="bg-zinc-900 px-4 sm:px-6 md:px-12 max-w-3xl mx-auto w-screen">
                <Login />
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 px-4 sm:px-6 md:px-12 max-w-3xl mx-auto w-screen">
            <Dashboard token={cookies["AccessToken"]} />
        </div>
    );
}

export default App;
