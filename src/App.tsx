import Navbar from './components/MyComponents/Navbar/Navbar.tsx';
import QuizHome from './pages/QuizPage/QuizHome.tsx';
import Learn from './pages/LearnPage/Learn.tsx';
import Home from './pages/Home/Home.tsx';
import {useState} from "react";
import type {User} from './model/model.ts';
import {getUserById} from './data/data.ts';


function App() {

    const utente: User = getUserById(0);

    const [page, setPage] = useState("Home");
    const [user, setUser] = useState<User>(utente);


    // home e learn non richiedono un utente
    const renderPage = () => {
        switch (page) {
            case "Home":
                return <Home/>;
            case "Quiz":
                return <QuizHome utente={user}/>;
            case "Learn":
                return <Learn/>;
            default:
                <Home/>;
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

