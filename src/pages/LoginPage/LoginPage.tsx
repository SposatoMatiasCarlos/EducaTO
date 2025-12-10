import {type ReactElement, useState} from "react";
import './LoginPage.css';
import Waves from '../../components/ThirdPartyComponents/Waves/Waves';


interface LoginPageProps {
    onLogin: (username: string, password: string) => Promise<{ ok: boolean; message: string }>;
    setPage: (page: string) => void;
}

function LoginPage({onLogin, setPage}: LoginPageProps): ReactElement {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errore, setErrore] = useState("");


    function handleLogin() {
        setErrore(""); // in caso ci siano più richieste annullo quelle precedenti


        onLogin(username, password)
            .then(result => {
                if (result.ok) setPage("Home")
                else {
                    setErrore(result.message);
                    setTimeout(() => setErrore(""), 3000);
                }
            });


    }

    return (
        <>
            <Waves
                backgroundColor="rgba(255, 255, 255, 0.2)"
                waveSpeedX={0.02}
                waveSpeedY={0.01}
                waveAmpX={40}
                waveAmpY={20}
                friction={0.9}
                tension={0.01}
                maxCursorMove={120}
                xGap={12}
                yGap={36}
            />


            <div className="login-page">
                <form className="login-form">
                    <h2>Login</h2>

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {errore && <label className="login-error">{errore}</label>}

                    <button type="button" className="btn btn-success"
                            onClick={() => handleLogin()}>
                        Login
                    </button>
                </form>
            </div>


        </>


    );

}


export default LoginPage;