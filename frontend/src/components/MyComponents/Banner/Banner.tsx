import {type ReactElement, useContext} from "react";
import type {Percorso, Lesson} from '../../../model/model.ts';
import './Banner.css';
import {UserContext} from "../../../UserContext.ts";

interface BannerProprs{
    percorso: Percorso;
    lezioni: Lesson[];
}


function Banner({percorso, lezioni} : BannerProprs): ReactElement{

    const {user} = useContext(UserContext);

    const completed: number = user?.completedLessons.filter(id =>
        percorso.lessons.includes(id)
    ).length ?? 0;

    const progress = lezioni.length > 0 ? completed / lezioni.length : 0;

    return (
        <div className="percorso-banner">
            <h2 className="fw-bold">{percorso.title}</h2>
            <p className="mb-2">Lezioni totali: {lezioni.length}</p>

            <p>{completed}/{lezioni.length} completate – {Math.round(progress * 100)}%</p>
        </div>
    );
}


export default Banner;