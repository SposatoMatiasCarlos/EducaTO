import {type ReactElement, useState} from "react";
import type {Question} from "../../../model/model.ts";
import './Domanda.css';


interface DomandaProps{
    domanda : Question;
    handleAnswer: (sbagliata : boolean) => void;
}

function Domanda({domanda, handleAnswer}: DomandaProps): ReactElement {

    const [selected, setSelected] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const checkResult = (index: number) => {
        setSelected(index);
        setIsCorrect(index === domanda.correctOptionIndex);
    };


    return (
        <div className="domanda-container">

            <h1 className="domanda-testo">{domanda.text}</h1>

            <div className="domanda-opzioni">
                {domanda.options.map((option, index) => {

                    let className = "opzione-btn";

                    if (selected !== null) {
                        if (index === domanda.correctOptionIndex) {
                            className += " corretta";
                        } else {
                            className += " sbagliata";
                        }
                    }

                    return (
                        <button
                            key={index}
                            className={className}
                            onClick={() => checkResult(index)}
                            disabled={selected !== null}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>

            {selected !== null && (
                <div className="avanti-container">
                    <button
                        className="btn-avanti"
                        onClick={() => {
                            setSelected(null);
                            setIsCorrect(null);
                            handleAnswer(!isCorrect);
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