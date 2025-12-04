import type {Lesson, Question, User} from "../../model/model.ts";
import {type ReactElement, useEffect, useState} from "react";
import {aggiornaLezioniSuperateUtente, aggiungiPuntiLezioneUtente, getQuestionsFromLesson} from '../../data/data.ts';
import TextType from "../../components/ThirdPartyComponents/TextType/TextType.tsx";
import Domanda from "../../components/MyComponents/Domanda/Domanda.tsx";
import Vite from "../../components/MyComponents/Vite/Vite.tsx";
import {ArrowLeft} from "lucide-react";
import vittoria from "../../assets/vittoria.mp4";
import sconfitta from '../../assets/sconfitta.mp4';
import FineQuiz from "../../components/MyComponents/FineQuiz/FineQuiz.tsx";

interface QuizViewerProps {
    lezione: Lesson;
    onClose: () => void;
    utente: User;
    setPoints: (points: number) => void;
}


function QuizViewer({lezione, onClose, utente, setPoints}: QuizViewerProps): ReactElement {

    const domande: Question[] = getQuestionsFromLesson(lezione);


    // Indice domanda corrente
    const [indicecorrente, setIndiceDomanda] = useState(0);

    // Numero di risposte sbagliate
    const [sbagliate, setSbagliate] = useState(0);

    // Domande finite
    const [finito, setFinito] = useState(false);

    // Stato per le vite
    const [numeroVite, setVite] = useState(3);


    const domandacorrente = domande[indicecorrente];
    if (!domandacorrente) return <p>Nessuna domanda disponibile.</p>;


    const handleAnswer = (sbagliata: boolean) => {

        // se la risposta è sbagliata diminuisce di 1 le vite
        if (sbagliata) {
            setSbagliate(prev => prev + 1);
            setVite(prev => prev - 1);
        }

        // Se questa era l'ultima domanda passo schermata finale
        if (indicecorrente === domande.length - 1) {
            setFinito(true);
            return;
        }

        // Altrimenti passa alla successiva
        setIndiceDomanda(prev => prev + 1);
    };


    // Facendo cosi le funzioni di aggiornamento dipendono solo
    // dai valori finito e numeroVite e quando faccio setPoints
    // per aggiornare i dati dell'utente nella navbar non ho un loop infinito
    // TODO: se ho gia completato la lezione in precedenza non devo aggiungere i punti
    useEffect(() => {
        if (finito || numeroVite <= 0) {
            const superata = sbagliate < 3;
            if (superata) {
                aggiornaLezioniSuperateUtente(utente, lezione.id);
                aggiungiPuntiLezioneUtente(utente, lezione.points);
                setPoints(utente.points + lezione.points);
            }
        }
    }, [finito, numeroVite]);



    if (finito || numeroVite <= 0) {
        const superata : boolean = sbagliate < 3;
        return (
            <>
                <FineQuiz superata = {superata} onClose={onClose}/>
            </>
        );
    }




    console.log("Domande: ", domande);

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
                    <Vite vite={numeroVite} maxVite={3}/>
                </div>
            </div>


            <div className="row justify-content-center">
                <Domanda domanda={domandacorrente} handleAnswer={handleAnswer}/>
            </div>
        </>

    );
}

export default QuizViewer;