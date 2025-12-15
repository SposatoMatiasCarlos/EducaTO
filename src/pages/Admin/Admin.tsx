import {type ReactElement, useContext, useEffect, useState} from "react";
import {UserContext} from "../../UserContext.ts";
import type {User, UserResponse} from "../../model/model.ts";
import './Admin.css';


const PAGE_SIZE = 10;

function Admin() : ReactElement {

    const {user} = useContext(UserContext);


    const [utenti, setUtenti] = useState<User[]>([]);
    const [pagina, setPagina] = useState(1);
    const [numeropagine, setNumeroPagine] = useState(1);


    useEffect(fetchUtenti, [pagina]);
    function fetchUtenti(){

        let valid = true;

        fetch(`http://localhost:6767/utenti?pagina=${pagina}&limite=${PAGE_SIZE}`, {credentials:"include"})
            .then(res => {
                if(res.status === 200) return res.json();
                else throw Error("Errore fetch classifica");
            })
            .then(((data: UserResponse)=>{
                if(valid){
                    console.log("Utenti (pagina) e numero utenti: ", data);
                    setUtenti(data.users);
                    setNumeroPagine(Math.ceil(data.totalCount / PAGE_SIZE));
                }
            }))
            .catch(err => console.log(err));


        return () => { valid = false; };
    }
    function cambiaRuolo(username : string, nuovoruolo : string){

        fetch(`http://localhost:6767/utenti/ruolo`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username : username, ruolo: nuovoruolo})
        })
            .then(res => {
                if(res.status === 200) return res.json();
                else throw Error("Errore cambio ruolo");
            })
            .then(data => {
                console.log("Utente aggiornato: ", data);
                setUtenti(prev => prev.map(u => u.username === data.username ? data : u));
            })
            .catch(err => console.log(err));
    }


    if(user == null || utenti.length === 0) return <></>;
    return (
        <div className="admin-container">
            <h1>Gestione Utenti</h1>
            <table className="admin-table">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Punti</th>
                    <th>Badge</th>
                    <th>Ruolo</th>
                </tr>
                </thead>
                <tbody>
                {utenti.map(u => (
                    <tr key={u.username}>
                        <td>{u.username}</td>
                        <td>{u.points}</td>
                        <td>{u.badge}</td>
                        <td>
                            <select
                                value={u.ruolo}
                                onChange={(e) => cambiaRuolo(u.username, e.target.value)}
                            >
                                <option value="studente">Studente</option>
                                <option value="admin">Admin</option>
                                <option value="mod">Moderatore</option>
                            </select>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="pagination">
                <button disabled={pagina === 1} onClick={() => setPagina(prev => prev - 1)}>
                    Indietro
                </button>
                <span>Pagina {pagina} di {numeropagine}</span>
                <button disabled={pagina === numeropagine} onClick={() => setPagina(prev => prev + 1)}>
                    Avanti
                </button>
            </div>
        </div>
    );
}

export default Admin;