import type {ReactElement} from "react";
import type {Question} from "../../../model/model.ts";
import './Domanda.css';


interface DomandaProps{
    domanda : Question;
    indicecorrente : number;
    setIndiceDomanda : (indice : number) => void;
}

function Domanda({domanda, indicecorrente, setIndiceDomanda} : DomandaProps): ReactElement{

    return(
        <>
            <h1>{domanda.text}</h1>
            <h2>{domanda.options}</h2>
        </>
    );
}

export default Domanda;