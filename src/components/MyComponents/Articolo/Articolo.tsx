import type {ReactElement} from "react";
import type {Articolo as ArticoloType} from '../../../model/model';
import {ArrowLeft} from "lucide-react";
import './Articolo.css';

interface ArticoloProps {
    articolo: ArticoloType;
    setArticoloSelezionato: (articolo: ArticoloType | null) => void;
}

function Articolo({articolo, setArticoloSelezionato}: ArticoloProps): ReactElement {

    return (
        <>
            <div className="header-row mt-5">
                <button className="btn back-btn" onClick={() => setArticoloSelezionato(null)}>
                    <ArrowLeft size={40} />
                </button>
                <h1 className="cartella-title">{articolo.title}</h1>
            </div>


            <div className="articolo-page">
                <h4 className="autore">Autore: {articolo.author}</h4>
                <div className="articolo-container">
                    <p>{articolo.content}</p>
                </div>
            </div>
        </>
    );
}

export default Articolo;