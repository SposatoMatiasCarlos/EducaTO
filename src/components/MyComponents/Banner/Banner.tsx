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

    console.log("progress: ", progress);

    return (
        <div className="percorso-banner">
            <h2 className="fw-bold">{percorso.title}</h2>
            <p className="mb-2">Lezioni totali: {lezioni.length}</p>

            <p>{completed}/{lezioni.length} completate – {Math.round(progress * 100)}%</p>
        </div>
    );
}


export default Banner;