import {type ReactElement, useEffect, useState} from "react";
import type {Cartella} from "../../model/model";
import "./Learn.css";
import EsploraCartelle from "./EsploraCartelle.tsx";
import EsploraArticoli from "./EsploraArticoli.tsx";



function Learn(): ReactElement {

    const [cartelle, setCartelle] = useState<Cartella[]>([]);
    const [cartellaselezionata, setCartellaSelezionata] = useState<Cartella | null>(null);


    function fetchCartelle() {
        let valid = true;


        fetch("http://localhost:6767/cartelle", {credentials: "include"})
            .then(res => {
                if(res.status === 200) return res.json();
                else throw Error("Errore Fetch Cartelle")

            })
            .then(data => valid ? setCartelle(data) : "")
            .catch(err => console.log(err));

        console.log(cartelle);

        // funzione di cleanup, evita di fare setCartelle quando il componente è unmounted
        return () => {
            valid = false;
        };

    }
    useEffect(fetchCartelle, []);

    return (
        <>
            {cartellaselezionata ? (
                <EsploraArticoli
                    setCartellaSelezionata={setCartellaSelezionata}
                    cartellaaperta={cartellaselezionata}
                />
            ) : (
                <EsploraCartelle
                    cartelle={cartelle}
                    setCartelle={setCartelle}
                    setCartellaSelezionata={setCartellaSelezionata}
                />
            )}
        </>
    );
}

export default Learn;