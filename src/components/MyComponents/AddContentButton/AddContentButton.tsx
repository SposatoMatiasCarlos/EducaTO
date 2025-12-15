import {type ReactElement, useContext} from "react";
import './AddContentButton.css';
import {UserContext} from '../../../UserContext.ts';

interface ContentButtonProps{
    onPress : () => void;
}

function AddContentButton({onPress} : ContentButtonProps) : ReactElement{

    const {user} = useContext(UserContext);
    if (!user) return <></>;

    return(
        <>
            { (user.ruolo === "admin" || user.ruolo === "mod") && (
                <button className="add-folder-btn" onClick={onPress}>
                    +
                </button>
            )}
        </>
    );
}

export default AddContentButton;
