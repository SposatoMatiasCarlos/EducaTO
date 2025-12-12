import {useContext, useEffect, useState} from "react";
import type {ReactElement} from "react";
import {UserContext} from '../../UserContext.ts';
import './Profilo.css';
import profilo0 from '../../assets/temp.jpg';
import profilo1 from '../../assets/profilo1.png';
import profilo2 from '../../assets/profilo2.png';
import profilo3 from '../../assets/profilo3.png';
import type {User} from "../../model/model.ts";


const avatarOptions = [profilo0, profilo1, profilo2, profilo3];


function Profilo(): ReactElement {

    const [totaleLezioni, setTotaleLezioni] = useState(0);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [selectedavatar, setSelectedAvatar] = useState<number| null>(null);
    const {user, setUser} = useContext(UserContext);
    useEffect(fetchNumeroLezioni, []);

    if(user == null) return <></>;

    function fetchNumeroLezioni() {

        let valid = true;

        fetch("http://localhost:6767/percorsi/lezioni/count", {credentials: "include"})
            .then(res => {
                if (res.status === 200) return res.json();

                throw Error("Errore fetch numero lezioni");
            })
            .then(dati => {
                if(valid){
                    console.log("Numero lezioni: ", dati);
                    setTotaleLezioni(dati);
                }
            })
            .catch(err => console.log(err));


        return () => {valid = false};
    }
    function cambiaImmagineProfilo(index: number): void {
        if(!user) return;


        // post di UserAvatarID al server
        fetch("http://localhost:6767/utenti/avatar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ index })
        })
            .then(res => {
                if(res.status === 200) return res.json();

                throw new Error("Errore caricamento avatar utente");
            })
            .then((data : User) => {
                setUser(data);
                console.log("Utente Aggiornato: ", data);
            })
            .catch(err => console.log(err));

    }

    const progressPercent = Math.min((user.completedLessons.length / totaleLezioni) * 100, 100);

    return (
        <>
            <div className="profilo-page">
                <div className="profilo-card">
                    <div className="avatar-wrapper" onClick={() => setIsOverlayOpen(true)}>
                        <img
                            className="profilo-avatar"
                            src={avatarOptions[user.avatarId]}
                            alt={`${user.username} avatar`}
                        />
                        <div className="avatar-hover-overlay">
                            <span>Cambia immagine profilo</span>
                        </div>
                    </div>

                    <h2 className="profilo-username">{user.username}</h2>
                    <p className="profilo-ruolo">Ruolo: {user.ruolo}</p>
                    <p className="profilo-badge">Badge: {user.badge}</p>
                    <p className="profilo-points">Punti: {user.points}</p>

                    <div className="profilo-progress-wrapper">
                        <span>Lezioni completate: {user.completedLessons.length}/{totaleLezioni}</span>
                        <div className="profilo-progress-bar">
                            <div
                                className="profilo-progress-fill"
                                style={{width: `${progressPercent}%`}}
                            />
                        </div>
                    </div>

                </div>




                {isOverlayOpen && (
                    <div className="overlay">
                        <div className="overlay-content">
                            <h3></h3>
                            <div className="avatar-options">
                                {avatarOptions.map((avatar, index) => (
                                    <img
                                        key={index}
                                        src={avatar}
                                        onClick={() => setSelectedAvatar(index)}
                                        className={`option-avatar ${selectedavatar === index ? 'selected' : ''}`}
                                    />
                                ))}
                            </div>
                            <button className="btn btn-success" onClick={() => {
                                if (selectedavatar !== null) {
                                    cambiaImmagineProfilo(selectedavatar);
                                    setIsOverlayOpen(false);
                                }
                            }}>
                                Imposta
                            </button>
                            <button style={{marginLeft: '20px'}} className="btn btn-danger"
                                    onClick={() => setIsOverlayOpen(false)}>Annulla
                            </button>
                        </div>
                    </div>
                )}
            </div>


        </>
    );
}

export default Profilo;