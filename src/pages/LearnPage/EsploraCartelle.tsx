import Folder from "../../components/ThirdPartyComponents/Folder/Folder.tsx";
import {type ReactElement, useState} from "react";
import type {Cartella, User} from "../../model/model.ts";
import './EsploraCartelle.css';
import AddContentButton from "../../components/MyComponents/AddContentButton/AddContentButton.tsx";
import MyForm from '../../components/MyComponents/MyForm/MyForm.tsx';

interface EsploraCartelleProps{
    utente : User;
    cartelle : Cartella[];
    setCartellaSelezionata: (cartella : Cartella) => void;
    setCartelle: (cartelle : Cartella[]) => void;
}


function EsploraCartelle({utente, cartelle, setCartelle, setCartellaSelezionata}: EsploraCartelleProps): ReactElement {


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


                    <AddContentButton setShowOverlay={setShowOverlay} utente = {utente} />

                </div>
            </div>


            {showOverlay ? <MyForm tipo={"cartella"} setShowOverlay={setShowOverlay} cartelle={cartelle} setCartelle={setCartelle}/> : <></>}
        </>
    );


}

export default EsploraCartelle;