import {type ReactElement, useState} from "react";
import type {AnswerRequest, AnswerResponse, Question} from "../../../model/model.ts";
import './Domanda.css';


interface DomandaProps{
    domanda : Question;
    onAnswer: (risposta : AnswerResponse) => void;
    onNext: () => void;
}

function Domanda({ domanda, onNext, onAnswer }: DomandaProps): ReactElement {

    const [selected, setSelected] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<{ corretta: boolean; spiegazione: string } | null>(null);

    const handleAnswer = (index: number) => {
        if (loading || selected !== null) return;

        setSelected(index);
        setLoading(true);


        const request: AnswerRequest = {
            domandaId: domanda.id,
            rispostaIndex: index
        };

        fetch("http://localhost:6767/quiz/risposta", {
            method: "POST",
            credentials: "include",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(request)
        })
            .then(res => {
                if (!res.ok) throw new Error("Errore server");
                return res.json();
            })
            .then( (data : AnswerResponse) => {
                setFeedback({ corretta: data.corretta, spiegazione: data.spiegazione });

                console.log("AnswerResponse: ", data);

                onAnswer(data);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    return (
        <div className="domanda-container">

            <h1 className="domanda-testo">{domanda.text}</h1>

            <div className="domanda-opzioni">
                {domanda.options.map((option, index) => {
                    let className = "opzione-btn";

                    if (feedback) {
                        if (feedback.corretta && index === selected) className += " corretta";
                        else if (!feedback.corretta && index === selected) className += " sbagliata";
                    }

                    return (
                        <button
                            key={index}
                            className={className}
                            onClick={() => handleAnswer(index)}
                            disabled={selected !== null || loading}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>

            {feedback && (
                <div className="avanti-container">
                    <p className={`spiegazione ${feedback.corretta ? 'corretta' : 'sbagliata'}`}>
                        {feedback.spiegazione}
                    </p>
                    <button
                        className="btn-avanti"
                        onClick={() => {
                            setSelected(null);
                            setFeedback(null);
                            onNext();
                        }}
                    >
                        Avanti →
                    </button>
                </div>
            )}
        </div>
    );
}

export default Domanda;