import Folder from "../../components/ThirdPartyComponents/Folder/Folder.tsx";
import {type ReactElement, useState} from "react";
import type {Cartella, User} from "../../model/model.ts";
import './EsploraCartelle.css';

interface EsploraCartelleProps{
    utente : User;
    cartelle : Cartella[];
    setCartellaSelezionata: (cartella : Cartella) => void;
}


function EsploraCartelle({utente, cartelle, setCartellaSelezionata}: EsploraCartelleProps): ReactElement {


    const [showOverlay, setShowOverlay] = useState(false);

    return (

        <>
            <div className="learn-outer-wrapper">
                <div className="learn-gray-box">

                    {cartelle.map((cartella) => (
                        <div key={cartella.id} className="folder-wrapper"
                             onClick={() => setCartellaSelezionata(cartella)}>

                            <Folder size={1} color="#28a745" className="folder-box"/>

                            <div className="folder-label">{cartella.title}</div>
                        </div>
                    ))}


                    {utente.ruolo === "admin" && (
                        <button className="add-folder-btn" onClick={() => setShowOverlay(true)}>
                            +
                        </button>
                    )}

                </div>
            </div>


            {showOverlay && (
                <div className="overlay">
                    <div className="overlay-box">
                        <h2>Crea una nuova Cartella</h2>
                        <p>(Qui ci sarà il form in futuro)</p>

                        <button className="close-btn" onClick={() => setShowOverlay(false)}>
                            Chiudi
                        </button>
                    </div>
                </div>
            )}
        </>
    );


}

export default EsploraCartelle;