import {type ReactElement, useState} from "react";
import './MyForm.css';
import type {Cartella} from "../../../model/model.ts";
import {creaNuovaCartella} from '../../../data/data.ts';


interface MyFormProps{
    tipo : string;
    cartelle? : Cartella[];
    setCartelle?: (cartelle : Cartella[]) => void;
    setShowOverlay: (val : boolean) => void;
}


function MyForm({tipo, cartelle, setCartelle, setShowOverlay} : MyFormProps) : ReactElement {

    const [titolo, setTitolo] = useState("");


    function creaCartella() {

        if (titolo.trim() === "") return;

        const nuovaCartella: Cartella = {id: Date.now(), title: titolo, articoli: []};

        // TODO: Manda al server la nuova cartella
        //creaNuovaCartella(utente, nuovaCartella);

        // aggiorna lista cartelle
        setCartelle([...cartelle, nuovaCartella]);


        // reset
        setTitolo("");
        setShowOverlay(false);
    }



    if (tipo === "cartella") {
        return (
            <div className="overlay">
                <div className="overlay-box">
                    <h2>Crea una nuova Cartella</h2>

                    <div className="form-group">
                        <label>Nome</label>
                        <input
                            id="titolo"
                            type="text"
                            value={titolo}
                            onChange={(e) => setTitolo(e.target.value)}
                            placeholder="Inserisci il nome della cartella..."
                        />
                    </div>

                    <div className="button-row">
                        <button className="btn btn-success" onClick={creaCartella}>Crea</button>
                        <button
                            className="btn btn-danger"
                            style={{ marginLeft: '20px' }}
                            onClick={() => setShowOverlay(false)}
                        >
                            Chiudi
                        </button>
                    </div>
                </div>
            </div>
        );
    }


    // TODO: implementare percorso, lezioni articoli
    if(tipo === "percorso"){
        return (
            <div className="overlay">
                <div className="overlay-box">
                    <h2>Crea un nuovo percorso</h2>

                    <div className="form-group">
                        <label>Titolo</label>
                        <input
                            id="titolo"
                            type="text"
                            value={titolo}
                            onChange={(e) => setTitolo(e.target.value)}
                            placeholder="Inserisci il nome del percorso..."
                        />
                    </div>

                    <div className="button-row">
                        <button className="btn btn-success" onClick={()=>{}}>Crea</button>
                        <button
                            className="btn btn-danger"
                            style={{ marginLeft: '20px' }}
                            onClick={() => setShowOverlay(false)}
                        >
                            Chiudi
                        </button>
                    </div>
                </div>
            </div>
        );
    }


    if(tipo === "articolo"){
        return (
            <div className="overlay">
                <div className="overlay-box">
                    <h2>Crea un nuovo articolo</h2>

                    <div className="form-group">
                        <label>Titolo</label>
                        <input
                            id="titolo"
                            type="text"
                            value={titolo}
                            onChange={(e) => setTitolo(e.target.value)}
                            placeholder="Inserisci il titolo dell'articolo..."
                        />
                    </div>

                    <div className="button-row">
                        <button className="btn btn-success" onClick={()=>{}}>Crea</button>
                        <button
                            className="btn btn-danger"
                            style={{ marginLeft: '20px' }}
                            onClick={() => setShowOverlay(false)}
                        >
                            Chiudi
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if(tipo === "lezione"){
        return (
            <div className="overlay">
                <div className="overlay-box">
                    <h2>Crea una nuova lezione</h2>

                    <div className="form-group">
                        <label>Titolo</label>
                        <input
                            id="titolo"
                            type="text"
                            value={titolo}
                            onChange={(e) => setTitolo(e.target.value)}
                            placeholder="Inserisci il nome della lezione..."
                        />
                    </div>

                    <div className="button-row">
                        <button className="btn btn-success" onClick={()=>{}}>Crea</button>
                        <button
                            className="btn btn-danger"
                            style={{ marginLeft: '20px' }}
                            onClick={() => setShowOverlay(false)}
                        >
                            Chiudi
                        </button>
                    </div>
                </div>
            </div>
        );
    }


    // nessun tipo valido
    return <></>;
}

export default MyForm;