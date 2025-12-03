import type {Lesson, Question} from "../../../model/model.ts";
import {type ReactElement, useState} from "react";
import {getQuestionsFromLesson} from "../../../data/data.ts";
import Waves from "../../ThirdPartyComponents/Waves/Waves.tsx";
import {ArrowLeft} from "lucide-react";
import Domanda from "../Domanda/Domanda.tsx";

interface QuizViewerProps {
    lezione: Lesson;
    onClose: () => void;
}


function QuizViewer({lezione, onClose}: QuizViewerProps): ReactElement {

    const domande: Question[] = getQuestionsFromLesson(lezione);
    const [indicecorrente, setIndiceDomanda] = useState(0);

    const domandacorrente = domande[indicecorrente];
    if (!domandacorrente) return <p>Nessuna domanda disponibile.</p>;

    console.log("Domande: ", domande);
    return (
        <>

            <Waves
                lineColor="#C7C7C7"
                backgroundColor="rgba(255, 255, 255, 1)"
                waveSpeedX={0.02}
                waveSpeedY={0.01}
                waveAmpX={40}
                waveAmpY={20}
                friction={0.9}
                tension={0.01}
                maxCursorMove={120}
                xGap={12}
                yGap={36}
            />



            <div className="row" style={{ position: "relative", zIndex: 10 }}>
                <div className="col-4">
                    <button className="btn m-5" onClick={onClose}>
                        <ArrowLeft size={50}/>
                    </button>
                </div>
            </div>


            <div className="row justify-content-center">
                <Domanda domanda={domandacorrente} indicecorrente={indicecorrente} setIndiceDomanda={setIndiceDomanda}/>
            </div>
        </>

    );
}

export default QuizViewer;