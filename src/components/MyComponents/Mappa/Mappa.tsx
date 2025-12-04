import {type ReactElement, useState} from "react";
import type {Lesson, User, Percorso} from "../../../model/model.ts";
import './Mappa.css';
import icon2 from '../../../assets/icon2.png';
import icon3 from '../../../assets/icon3.png';
import Confetti from "react-confetti";
import {isUnlocked, hasCompletedLessons, aggiungiPuntiLezioneUtente} from '../../../data/data.ts';


interface MappaProps {
    lezioni: Lesson[];
    utente: User;
    percorso : Percorso;
    setLezioneSelezionata: (lezione: Lesson | null) => void;
    setPoints: (punti: number) => void;
}


function Mappa({lezioni, percorso, utente, setLezioneSelezionata, setPoints}: MappaProps): ReactElement {

    console.log("utente: ", utente);
    console.log("Lezioni ricevute:", lezioni);

    const [showPopup, setShowPopup] = useState(false);
    const [showCoriandoli, setCoriandoli] = useState(false);

    const assegnaPuntiBonus = () => {
        const completate: number = hasCompletedLessons(percorso.id, lezioni, utente);

        if (completate === 1) {

            setCoriandoli(true);

            // tutte completate e bonus non ancora dato quindi assegna punti
            setPoints(utente.points + 50);
            aggiungiPuntiLezioneUtente(utente, 50);

            // segna che il bonus è stato assegnato
            utente.bonusReceived.push(percorso.id);

            setShowPopup(false);
        } else if (completate === -1) {
            // non tutte completate → mostra popup
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center mt-5">
            {lezioni.map((lezione) => {
                const unlocked = isUnlocked(lezione, utente);
                const completed = utente.completedLessons.includes(lezione.id);

                return (
                    <div key={lezione.id} className="d-flex flex-column align-items-center mb-4">
                        <button
                            onClick={() => unlocked && setLezioneSelezionata(lezione)}
                            disabled={!unlocked}
                            className={`button-3d rounded-circle d-flex justify-content-center align-items-center
                                ${completed ? 'completed' : ''} 
                                ${!unlocked ? 'locked' : ''}`}
                        >
                            <img src={icon2} alt="Lezione"/>
                        </button>
                    </div>
                );
            })}
            <div className="d-flex flex-column align-items-center mt-5" style={{position: 'relative'}}>
                <button
                    onClick={assegnaPuntiBonus}
                    className="button-3d-gold rounded-circle d-flex justify-content-center align-items-center"
                >
                    <img src={icon3} alt="Tesoro"/>
                </button>

                {showPopup && (
                    <div className="popup-avviso-right">
                        Devi prima completare tutte le lezioni!
                        <div className="popup-arrow"></div>
                    </div>
                )}
            </div>

            {/* Confetti */}
            {showCoriandoli && <Confetti />}
        </div>
    );
}

export default Mappa;