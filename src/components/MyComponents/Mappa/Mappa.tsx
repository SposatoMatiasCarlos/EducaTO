import type {ReactElement} from "react";
import type {Lesson, User} from "../../../model/model.ts";
import './Mappa.css';
import icon2 from '../../../assets/icon2.png';
import icon3 from '../../../assets/icon3.png';
import {isUnlocked} from '../../../data/data.ts';


interface MappaProps {
    lezioni: Lesson[];
    utente: User;
    setLezioneSelezionata: (lezione : Lesson | null) => void;
}


function Mappa({lezioni, utente, setLezioneSelezionata}: MappaProps): ReactElement {

    console.log("utente: ", utente);
            console.log("Lezioni ricevute:", lezioni);

    return (
        <>

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
                                <img src={icon2} alt="Lezione" />
                            </button>
                        </div>
                    );
                })}

                <div className="d-flex flex-column align-items-center mt-5">
                    <button className="button-3d-gold rounded-circle d-flex justify-content-center align-items-center">
                        <img src={icon3} alt="Tesoro"/>
                    </button>
                </div>
            </div>

        </>
    );
}

export default Mappa;