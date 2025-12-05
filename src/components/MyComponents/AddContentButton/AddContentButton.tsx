import type {ReactElement} from "react";
import type {User} from "../../../model/model.ts";
import './AddContentButton.css';

interface ContentButtonProps{
    setShowOverlay : (show : boolean) => void;
    utente : User;
}

function AddContentButton({setShowOverlay, utente} : ContentButtonProps) : ReactElement{

    return(
        <>
            { (utente.ruolo === "admin" || utente.ruolo === "writer") && (
                <button className="add-folder-btn" onClick={() => setShowOverlay(true)}>
                    +
                </button>
            )}
        </>
    );
}

export default AddContentButton;
