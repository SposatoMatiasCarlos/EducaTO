import type {Lesson, Question, Percorso} from "../../model/model.ts";
import {type ReactElement, useContext, useEffect, useState} from "react";
import {aggiornaLezioniSuperateUtente, aggiungiPuntiLezioneUtente} from '../../data/data.ts';
import Domanda from "../../components/MyComponents/Domanda/Domanda.tsx";
import Vite from "../../components/MyComponents/Vite/Vite.tsx";
import {ArrowLeft} from "lucide-react";
import FineQuiz from "../../components/MyComponents/FineQuiz/FineQuiz.tsx";
import {UserContext} from "../../UserContext.ts";

interface QuizViewerProps {
    lezione: Lesson;
    onClose: () => void;
    percorso: Percorso;
}


function QuizViewer({lezione, percorso, onClose}: QuizViewerProps): ReactElement {

    const {user} = useContext(UserContext);
    const [domande, setDomande] = useState<Question[]>([]);
    const [errori, setErrori] = useState(0);
    const [vite, setVite] = useState(3);

    const finito = vite <= 0 || domande.length === 0;

    useEffect(fetchDomande, [lezione.id, percorso.id]);
    useEffect(handleQuizCompletato, [finito, user]);


    function fetchDomande(){
        fetch(`http://localhost:6767/percorsi/${percorso.id}/lezioni/${lezione.id}/domande`, {credentials: "include"})
            .then(res => {
                if (res.status === 200) return res.json();
                else throw Error("Errore fetch domande");
            })
            .then(data => {
                setDomande(data);
                console.log("Domande: ", data);
            })
            .catch(err => console.log(err));
    }
    function handleQuizCompletato(){
        if (finito && errori < 3) {
            aggiornaLezioniSuperateUtente(user, lezione.id);
            aggiungiPuntiLezioneUtente(user, lezione.points);
        }
    }
    function handleAnswer(sbagliata: boolean) {

        if (sbagliata) {
            setErrori(e => e + 1);
            setVite(v => v - 1);
        }

        // Rimuovo la domanda corrente (la prima)
        setDomande(prev => prev.slice(1));
    }



    if (finito) return <FineQuiz superata={errori < 3} onClose={onClose} />;
    if (domande.length === 0) return <p>Nessuna domanda disponibile.</p>;


    return (
        <>
            <div className="row" style={{position: "relative", zIndex: 10}}>
                <div className="col-4">
                    <button className="btn m-5" onClick={onClose}>
                        <ArrowLeft size={50}/>
                    </button>
                </div>

                <div className="col-4"></div>

                <div className="col-4 mt-5">
                    <Vite vite={vite} maxVite={3}/>
                </div>
            </div>


            <div className="row justify-content-center">
                <Domanda domanda={domande[0]} onAnswer={handleAnswer}/>
            </div>
        </>

    );
}

export default QuizViewer;