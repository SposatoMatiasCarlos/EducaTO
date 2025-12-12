import {type ReactElement, useContext, useState} from "react";
import type {Lesson, Percorso} from "../../../model/model.ts";
import './Mappa.css';
import icon2 from '../../../assets/icon2.png';
import icon3 from '../../../assets/icon3.png';
import Confetti from "react-confetti";
import {isUnlocked, hasCompletedLessons} from '../../../data/data.ts';
import {UserContext} from '../../../UserContext.ts';

interface MappaProps {
    lezioni: Lesson[];
    percorso : Percorso;
    setLezioneSelezionata: (lezione: Lesson | null) => void;
}


function Mappa({lezioni, percorso, setLezioneSelezionata}: MappaProps): ReactElement {

    const {user, setUser} = useContext(UserContext);

    const [showPopup, setShowPopup] = useState(false);
    const [showCoriandoli, setCoriandoli] = useState(false);

    if(user == null) return <></>


    const assegnaPuntiBonus = () => {
        const completate: number = hasCompletedLessons(percorso.id, lezioni, user);


        if (completate === 1) {

            fetch(`http://localhost:6767/quiz/bonus?idPercorso=${percorso.id}`,
                {
                    method: "POST",
                    credentials: "include"
                })
                .then(res => {
                    if (res.status === 200) {
                        return res.json();
                    } else throw new Error("Errore fetch Bonus");
                })
                .then(data => {
                    setCoriandoli(true);
                    setUser(data);
                    console.log("Utente aggiornato: ", data);
                    setShowPopup(false);
                })
        } else if (completate === -1) {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        }
    };

    return (
        <div className="d-flex flex-column align-items-center mt-5">
            {lezioni.map((lezione) => {
                const unlocked = isUnlocked(lezione, user);
                const completed = user.completedLessons.includes(lezione.id);

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


            {showCoriandoli && <Confetti />}
        </div>
    );
}

export default Mappa;