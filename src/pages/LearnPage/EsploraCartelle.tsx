import Folder from "../../components/ThirdPartyComponents/Folder/Folder.tsx";
import {type ReactElement, useState} from "react";
import type {Cartella} from "../../model/model.ts";
import './EsploraCartelle.css';
import AddContentButton from "../../components/MyComponents/AddContentButton/AddContentButton.tsx";
import MyForm from '../../components/MyComponents/MyForm/MyForm.tsx';

interface EsploraCartelleProps{
    cartelle : Cartella[];
    setCartellaSelezionata: (cartella : Cartella) => void;
    setCartelle: (cartelle : Cartella[]) => void;
}


function EsploraCartelle({cartelle, setCartelle, setCartellaSelezionata}: EsploraCartelleProps): ReactElement {

    const [showOverlay, setShowOverlay] = useState(false);

    function creaNuovaCartella(nome : string): void {

        fetch("http://localhost:6767/cartelle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ nome })
        })
            .then(res => {
                if (!res.ok) throw new Error("Errore nella creazione della cartella");
                return res.json();
            })
            .then((data : Cartella) => {
                console.log("Nuova cartella: ", data); // log della nuova cartella creata
                const nuovaLista: Cartella[] = [...cartelle, data];
                setCartelle( nuovaLista);
            })
            .catch(err => console.log(err));
    }

    return (

        <>
            <div className="learn-outer-wrapper">
                <div className="learn-gray-box">

                    {cartelle.map((cartella) => (
                        <div key={cartella.id} className="folder-wrapper"
                             onClick={() => setCartellaSelezionata(cartella)}>

                            <Folder size={1} color="#28a745" className="folder-box"/>

                            <div className="folder-label">{cartella.nome}</div>
                        </div>
                    ))}


                    <AddContentButton onPress={()=> setShowOverlay(true)}/>

                </div>
            </div>


            {showOverlay ?
                <MyForm
                    tipo={"cartella"}
                    onClose={() => setShowOverlay(false)}
                    onConfirm={(titolo: string) => { creaNuovaCartella(titolo); setShowOverlay(false); }}
                />
                : <></>
            }
        </>
    );


}

export default EsploraCartelle;