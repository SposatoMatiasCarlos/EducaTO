import {type ReactElement} from "react";
import type {Articolo as ArticoloType} from '../../../model/model';
import {ArrowLeft} from "lucide-react";
import './Articolo.css';

interface ArticoloProps {
    articolo: ArticoloType;
    onClose: ()=>void;
}

function Articolo({articolo, onClose}: ArticoloProps): ReactElement {


    return (
        <>
            <div className="header-row mt-5">
                <button className="btn back-btn" onClick={onClose}>
                    <ArrowLeft size={40} />
                </button>
                <h1 className="cartella-title">{articolo.title}</h1>
            </div>


            <div className="articolo-page">
                <h4 className="autore">Autore: {articolo.author}</h4>
                <div className="articolo-container"
                     dangerouslySetInnerHTML={{ __html: articolo.content }}
                />
            </div>
        </>
    );
}

export default Articolo;