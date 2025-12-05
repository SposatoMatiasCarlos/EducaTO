import {type ReactElement, useState} from "react";
import type {Cartella, User} from "../../model/model.ts";
import type {Articolo as ArticoloType} from "../model/model.ts";
import {ArrowLeft} from "lucide-react";
import {getArticoliFromCartella} from "../../data/data.ts";
import './EsploraArticoli.css';
import Articolo from "../../components/MyComponents/Articolo/Articolo.tsx";
import AddContentButton from "../../components/MyComponents/AddContentButton/AddContentButton.tsx";
import MyForm from '../../components/MyComponents/MyForm/MyForm.tsx';



interface EsploraArticoliProps {
    setCartellaSelezionata: (cartella: Cartella | null) => void;
    cartellaaperta: Cartella;
    utente : User;
}


function EsploraArticoli({setCartellaSelezionata, cartellaaperta, utente}: EsploraArticoliProps): ReactElement {

    const articoli: ArticoloType[] = getArticoliFromCartella(cartellaaperta);
    const [articoloselezionato, setArticoloSelezionato] = useState<ArticoloType | null>(null);

    const nessunarticolo : boolean = (articoli.length == 0);



    // Permette di scrivere un nuovo articolo
    const [showOverlay, setShowOverlay] = useState(false);

    const getPreview = (testo: string, maxLength = 100) => {
        return testo.length > maxLength ? testo.slice(0, maxLength) + "..." : testo;
    };

    return (
        <>
            {articoloselezionato ? (
                <Articolo articolo={articoloselezionato} setArticoloSelezionato={setArticoloSelezionato} />
            ) : (
                <>
                    <div className="header-row mt-5">
                        <button className="btn back-btn" onClick={() => setCartellaSelezionata(null)}>
                            <ArrowLeft size={40} />
                        </button>
                        <h1 className="cartella-title">{cartellaaperta.title}</h1>
                    </div>

                    <div className="articoli-container">
                        <div className="articoli-grid">
                            {articoli.map((articolo) => (
                                <div
                                    key={articolo.id}
                                    className="articolo-card"
                                    onClick={() => setArticoloSelezionato(articolo)}
                                >
                                    <h3 className="articolo-title">{articolo.title}</h3>
                                    <p className="articolo-preveiw">Autore: {articolo.author}</p>
                                    <p className="articolo-preview">{getPreview(articolo.content)}</p>
                                </div>
                            ))}
                        </div>

                        {nessunarticolo ? <h4>Non ci sono articoli da visualizzare. </h4> : <></>}

                        <AddContentButton setShowOverlay={setShowOverlay} utente = {utente} />

                        {showOverlay ? <MyForm tipo={"articolo"} setShowOverlay={setShowOverlay}/> : <></>}
                    </div>
                </>
            )}
        </>
    );
}

export default EsploraArticoli;