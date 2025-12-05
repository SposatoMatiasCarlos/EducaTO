import {type ReactElement, useState} from "react";
import type {Cartella, User} from "../../model/model";
import {getCartelle} from "../../data/data";
import "./Learn.css";
import EsploraCartelle from "./EsploraCartelle.tsx";
import EsploraArticoli from "./EsploraArticoli.tsx";

interface LearnProps {
    utente: User;
}

function Learn({utente}: LearnProps): ReactElement {

    const [cartelle, setCartelle] = useState<Cartella[]>(getCartelle());
    const [cartellaselezionata, setCartellaSelezionata] = useState<Cartella | null>(null);


    return (
        <>
            {cartellaselezionata ?
                <EsploraArticoli utente={utente} setCartellaSelezionata={setCartellaSelezionata} cartellaaperta = {cartellaselezionata}/> :
                <EsploraCartelle utente={utente} cartelle = {cartelle} setCartelle={setCartelle} setCartellaSelezionata={setCartellaSelezionata}/>}
        </>
    );
}

export default Learn;