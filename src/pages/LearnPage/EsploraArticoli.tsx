import {type ReactElement, useState} from "react";
import type {Cartella} from "../../model/model.ts";
import type {Articolo as ArticoloType} from "../model/model.ts";
import {ArrowLeft} from "lucide-react";
import {getArticoliFromCartella} from "../../data/data.ts";
import './EsploraArticoli.css';
import Articolo from "../../components/MyComponents/Articolo/Articolo.tsx";

interface EsploraArticoliProps {
    setCartellaSelezionata: (cartella: Cartella | null) => void;
    cartellaaperta: Cartella;
}


function EsploraArticoli({setCartellaSelezionata, cartellaaperta}: EsploraArticoliProps): ReactElement {

    const articoli: ArticoloType[] = getArticoliFromCartella(cartellaaperta);
    const [articoloselezionato, setArticoloSelezionato] = useState<ArticoloType | null>(null);

    return (
        <>
            {articoloselezionato ?
                <Articolo articolo={articoloselezionato} setArticoloSelezionato={setArticoloSelezionato}/> :
                <>
                    <div className="esplora-articoli-container">


                        <div className="header mt-3">
                            <button className="back-btn" onClick={() => setCartellaSelezionata(null)}>
                                <ArrowLeft size={40}/>
                            </button>
                            <h1>{cartellaaperta.title}</h1>
                        </div>

                        {/* Lista articoli */}
                        <div className="articoli-grid">
                            {articoli.map((articolo) => (
                                <div key={articolo.id} className="articolo-card">
                                    <h3>{articolo.title}</h3>
                                    <p>{articolo.content.substring(0, 100)}...</p>
                                    <button className="leggi-piu-btn"
                                            onClick={() => setArticoloSelezionato(articolo)}>Leggi di più
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            }

        </>

    );
}

export default EsploraArticoli;