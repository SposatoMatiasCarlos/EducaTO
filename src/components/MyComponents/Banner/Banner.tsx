import type {ReactElement} from "react";
import type {Percorso, Lesson, User} from '../../../model/model.ts';
import './Banner.css';

interface BannerProprs{
    percorso: Percorso;
    utente: User;
    lezioni: Lesson[];
}


function Banner({percorso, utente, lezioni} : BannerProprs): ReactElement{


    const completed = utente?.completedLessons.filter(id =>
        percorso.lessons.includes(id)
    ).length ?? 0;


    const progress = completed / lezioni.length;


    return (
        <>
            <div className="percorso-banner">
                <h2 className="fw-bold">{percorso.title}</h2>
                <p className="mb-2">Lezioni totali: {lezioni.length}</p>

                {/* Barra di progresso */}
                <div className="progress-container">
                    <div
                        className="progress-bar"
                        style={{ width: `${progress * 100}%` }}
                    />
                </div>

                <div className="d-flex justify-content-between mt-2">
                    <span>{completed}/{lezioni.length} completate</span>
                    <span>{Math.round(progress * 100)}%</span>
                </div>
            </div>
        </>
    );
}


export default Banner;