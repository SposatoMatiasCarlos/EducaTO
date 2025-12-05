import {ReactElement, useState} from "react";
import type {User} from "../../model/model.ts";
import './Profilo.css';
import profilo0 from '../../assets/temp.jpg';
import profilo1 from '../../assets/profilo1.png';
import profilo2 from '../../assets/profilo2.png';
import profilo3 from '../../assets/profilo3.png';
import {getLessonNumber, impostaNuovoAvatarUtente} from '../../data/data.ts';

interface ProfiloProps {
    utente: User;
    setUser: (utente: User) => void;
}


const avatarOptions = [profilo0, profilo1, profilo2, profilo3];


function Profilo({utente, setUser}: ProfiloProps): ReactElement {


    const totaleLezioni = getLessonNumber();
    const progressPercent = Math.min((utente.completedLessons.length / totaleLezioni) * 100, 100);


    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [useravatar, setAvatar] = useState(utente.avatarId);

    const [selectedavatar, setSelectedAvatar] = useState<number | null>(null)


    function cambiaImmagineProfilo(index: number): void {
        impostaNuovoAvatarUtente(utente, index);
        setAvatar(index);

        // Crea un nuovo oggetto utente aggiornato
        const updatedUser = {...utente, avatarId: index};
        setUser(updatedUser);
    }

    return (
        <>
            <div className="profilo-page">
                <div className="profilo-card">
                    <div className="avatar-wrapper" onClick={() => setIsOverlayOpen(true)}>
                        <img
                            className="profilo-avatar"
                            src={avatarOptions[useravatar]}
                            alt={`${utente.username} avatar`}
                        />
                        <div className="avatar-hover-overlay">
                            <span>Cambia immagine profilo</span>
                        </div>
                    </div>

                    <h2 className="profilo-username">{utente.username}</h2>
                    <p className="profilo-ruolo">Ruolo: {utente.ruolo}</p>
                    <p className="profilo-badge">Badge: {utente.badge}</p>
                    <p>Articoli letti: {utente.completedArticles.length}</p>
                    <p className="profilo-points">Punti: {utente.points}</p>

                    <div className="profilo-progress-wrapper">
                        <span>Lezioni completate: {utente.completedLessons.length}/{totaleLezioni}</span>
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