import type {
    Lesson,
    Question,
    Percorso,
    AnswerResponse,
    StartResponse,
    CompleteResponse
} from "../../model/model.ts";
import {type ReactElement, useContext, useEffect, useState} from "react";
import Domanda from "../../components/MyComponents/Domanda/Domanda.tsx";
import Vite from "../../components/MyComponents/Vite/Vite.tsx";
import {ArrowLeft} from "lucide-react";
import FineQuiz from "../../components/MyComponents/FineQuiz/FineQuiz.tsx";
import {UserContext} from "../../UserContext.ts";
import {shuffleArray} from "../../data/data.ts";

interface QuizViewerProps {
    lezione: Lesson;
    onClose: () => void;
    percorso: Percorso;
}


function QuizViewer({lezione, percorso, onClose}: QuizViewerProps): ReactElement {

    const {setUser} = useContext(UserContext);

    const [domande, setDomande] = useState<Question[]>([]);
    const [errori, setErrori] = useState(0);
    const [vite, setVite] = useState(3);
    const [finito, setFinito] = useState(false);

    useEffect(startQuiz, [lezione.id, percorso.id]);
    useEffect(handleQuizCompletato, [finito]);

    function startQuiz() {
        let valid = true;

        fetch(`http://localhost:6767/quiz/start?lezioneId=${lezione.id}`, {
            method: "POST",
            credentials: "include"
        })
            .then(res => {
                if (res.status === 200) return res.json();
                else throw Error("Errore fetch domande");
            })
            .then((data : StartResponse) => {
                if(valid){
                    const domandemescolate = shuffleArray(data.domande);
                    setDomande(domandemescolate);
                    console.log("StartResponse: ", data);
                }
            })
            .catch(err => console.log(err));

        return () => {
            fetch("http://localhost:6767/quiz/abbandona", {
                method: "POST",
                credentials: "include"
            }).catch(console.log);
            valid = false;
            console.log("Hai abbandonato il quiz");
        };
    }
    function handleQuizCompletato() {
        if (!finito) return;
        let valid = true;

        if (finito) {
            fetch(`http://localhost:6767/quiz/risultato?lezioneId=${lezione.id}`, {
                method: "POST",
                credentials: "include"
            })
                .then(res => {
                    if(res.status === 200) return res.json();
                    else throw new Error("Errore check risultato quiz");
                })
                .then((data: CompleteResponse) => {
                    if(valid){
                        setUser(data.utente);
                        console.log("Risultato finale:", data);
                    }
                })
                .catch(err => console.log(err));

        }

        return () => { valid = false; };
    }
    function handleAnswer(risposta: AnswerResponse) {
        setVite(risposta.viteRimanenti);
        setErrori(risposta.errori);

        if (risposta.viteRimanenti <= 0 || domande.length === 0) {
            setFinito(true);
        }
    }

    if (finito) return <FineQuiz superata={errori < 3} onClose={onClose}/>;
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
                <Domanda
                    domanda={domande[0]}
                    onNext={() => {setDomande(prev => {
                            const nuove = prev.slice(1);
                            if (nuove.length === 0) setFinito(true);
                            return nuove;});}}
                    onAnswer={handleAnswer}
                />
            </div>


        </>

    );
}

export default QuizViewer;