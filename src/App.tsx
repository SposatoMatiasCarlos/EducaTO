import Navbar from './components/MyComponents/Navbar/Navbar.tsx';
import QuizHome from './pages/QuizPage/QuizHome.tsx';
import Learn from './pages/LearnPage/Learn.tsx';
import Home from './pages/Home/Home.tsx';
import {useState} from "react";
import type {User} from './model/model.ts';
import {getUserById} from './data/data.ts';
import Profilo from "./pages/Profilo/Profilo.tsx";


function App() {

    const utente: User = getUserById(1);

    const [page, setPage] = useState("Home");
    const [user, setUser] = useState<User>(utente);
    const [points, setPoints] = useState<number>(utente.points);


    // home non richiede un utente
    const renderPage = () => {
        switch (page) {
            case "Home":
                return <Home/>;
            case "Quiz":
                return <QuizHome utente={user} setPoints={setPoints}/>;
            case "Learn":
                return <Learn utente={user}/>;
            case "Profilo":
                return <Profilo utente={user} setUser={setUser}/>
            default:
                return <Home/>;
        }
    };


    console.log(page);

    return (
        <>
            <Navbar setPage={setPage} utente={user}/>
            {renderPage()}
        </>
    );
}

export default App

