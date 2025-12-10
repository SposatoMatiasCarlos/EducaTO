import Navbar from './components/MyComponents/Navbar/Navbar.tsx';
import QuizHome from './pages/QuizPage/QuizHome.tsx';
import Learn from './pages/LearnPage/Learn.tsx';
import Home from './pages/Home/Home.tsx';
import {useEffect, useState} from "react";
import {UserContext} from './UserContext.ts';
import type {User} from './model/model.ts';
import Profilo from "./pages/Profilo/Profilo.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";


interface SessionData{
    user : User | null;
    message : string;
}

function App() {

    const [page, setPage] = useState("Home");
    const [currentuser, setCurrentUser] = useState<User | null>(null);

    useEffect(checkConnection, []);
    function checkConnection(){
        let valid = true;

        fetch("http://localhost:6767/session/login", { credentials:"include"})
            .then(res => res.json())
            .then((sd : SessionData) => valid ? setCurrentUser(sd.user) : "")
            .catch((err) => console.log(err));

        return ()=> {valid = false; }
    }

    const renderPage = () => {
        switch (page) {
            case "Home":    return <Home/>;
            case "Quiz":    return <QuizHome/>;
            case "Learn":   return <Learn/>;
            case "Profilo": return <Profilo/>
            case "Login":   return<LoginPage onLogin={(username: string, password : string)=>{
                    return fetch(`http://localhost:6767/session/login?username=${username}&password=${password}`, { credentials : "include" })
                        .then(res => {
                            if(res.status === 200 || res.status === 401) return res.json();
                            else throw Error("Errore fetch login");
                        })
                        .then((sd:SessionData) => {
                            setCurrentUser(sd.user);

                            if(sd.user == null) return {ok : false, message:sd.message};
                            else return { ok: true, message: sd.message};
                        })
                        .catch(err => {
                            console.log(err);
                            return {ok: false, message: "Errore fetch login"};
                        });

                }} setPage={setPage}/>;

            default:        return <Home/>;
        }
    };

    return (
        <>
            <UserContext.Provider value={{user: currentuser, setUser: setCurrentUser}}>
                {page === "Login" ? <></> : <Navbar setPage={setPage} onLogout={()=> {
                    fetch("http://localhost:6767/session/logout", { credentials: "include" })
                        .then(res => res.json())
                        .then((sd : SessionData) => {
                            console.log(sd.message);
                            setCurrentUser(null);
                            setPage("Home");
                        })
                        .catch(err => console.error(err));
                }}/>}
                {renderPage()}
            </UserContext.Provider>
        </>
    );
}

export default App

