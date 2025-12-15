import {type ReactElement, useState} from "react";
import './MyForm.css';

interface MyFormProps{
    tipo : string;
    onConfirm: (titolo : string)=> void;
    onClose: () => void;
}

function MyForm({tipo, onConfirm, onClose} : MyFormProps) : ReactElement {

    const [titolo, setTitolo] = useState("");

    return (
        <div className="overlay">
            <div className="overlay-box">
                <h2>
                    {tipo === "cartella"
                        ? "Crea una nuova cartella"
                        : "Crea un nuovo percorso"}
                </h2>

                <form
                    className="form-group"
                    onSubmit={ () => onConfirm(titolo)}
                >
                    <label>Nome</label>
                    <input
                        id="titolo"
                        type="text"
                        value={titolo}
                        onChange={(e) => setTitolo(e.target.value)}
                        placeholder={
                            tipo === "cartella"
                                ? "Inserisci il nome della cartella..."
                                : "Inserisci il nome del percorso..."
                        }
                        required
                    />

                    <div className="button-row">
                        <div onClick={() => onConfirm(titolo)} className="btn btn-success">Crea</div>
                        <div className="btn btn-danger" onClick={onClose}>Chiudi</div>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default MyForm;