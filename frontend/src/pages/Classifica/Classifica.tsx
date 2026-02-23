import {type ReactElement, useEffect, useState} from "react";
import type {User} from "../../model/model.ts";
import './Classifica.css';
import profilo0 from '../../assets/temp.jpg';
import profilo1 from '../../assets/profilo1.png';
import profilo2 from '../../assets/profilo2.png';
import profilo3 from '../../assets/profilo3.png';

const avatarOptions = [profilo0, profilo1, profilo2, profilo3];


function Classifica(): ReactElement {

    const [classifica, setClassifica] = useState<User[]>([]);

    useEffect(fetchClassifica, []);
    function fetchClassifica(){

        let valid = true;

        fetch("http://localhost:6767/utenti/classifica", {credentials:"include"})
            .then(res => {
                if(res.status === 200) return res.json();
                else throw new Error("Errore fetch classifica");
            })
            .then(data =>{
                if(valid){
                    console.log("Classifica: ", data);
                    setClassifica(data);
                }
            })


        return () => { valid = false; };
    }


    if(classifica.length === 0) return <>...</>

    return (
        <div className="classifica-container">
            <h1 className="classifica-title">Classifica Utenti</h1>
            <table className="classifica-table">
                <thead>
                <tr>
                    <th>Posizione</th>
                    <th></th>
                    <th>Username</th>
                    <th>Badge</th>
                    <th>Punti</th>
                </tr>
                </thead>
                <tbody>
                {classifica.map((user, index) => (
                    <tr
                        key={user.username}>
                        <td>{index + 1}</td>
                        <td>
                            <img
                            className="profilo-avatar"
                            src={avatarOptions[user.avatarId]}
                            alt={`${user.username} avatar`}
                            />
                        </td>
                        <td>{user.username}</td>
                        <td>{user.badge}</td>
                        <td>{user.points}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Classifica;