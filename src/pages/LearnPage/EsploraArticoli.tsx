import {type ReactElement, useContext, useEffect, useState} from "react";
import type {Cartella} from "../../model/model.ts";
import type {Articolo as ArticoloType} from "../../model/model.ts";
import {ArrowLeft} from "lucide-react";
import './EsploraArticoli.css';
import Articolo from "../../components/MyComponents/Articolo/Articolo.tsx";
import AddContentButton from "../../components/MyComponents/AddContentButton/AddContentButton.tsx";
import EditorArticolo from '../../components/ThirdPartyComponents/EditorArticolo/EditorArticolo.tsx';
import {UserContext} from '../../UserContext.ts';


interface EsploraArticoliProps {
    setCartellaSelezionata: (cartella: Cartella | null) => void;
    cartellaaperta: Cartella;
}



function EsploraArticoli({setCartellaSelezionata, cartellaaperta}: EsploraArticoliProps): ReactElement {

    const [articoli, setArticoli] = useState<ArticoloType[]>([]);
    const [articoloselezionato, setArticoloSelezionato] = useState<ArticoloType | null>(null);
    const [autoreFilter, setAutoreFilter] = useState<string>("");
    const [scriviArticolo, setScriviArticolo] = useState(false);

    useEffect(fetchArticoli,[cartellaaperta.id]);

    const {user} = useContext(UserContext); // serve a sapere l'autore durante la pubblicazione di un articolo

    function fetchArticoli(){

        let valid = true;

        fetch(`http://localhost:6767/cartelle/${cartellaaperta.id}/articoli`, {credentials: "include"})
            .then(res => {
                if (!res.ok) {
                    throw new Error("Errore fetch articoli");
                }
                return res.json();
            })
            .then(data => {
                if(valid){
                    setArticoli(data);
                    console.log("Articoli: ", data);
                }
            })
            .catch(err => {
                console.error(err);
            });

        return () => { valid = false; };
    }
    function handlePublish(titolo : string, content : string) : void{

        if(user == null || user.ruolo == "studente") return;

        fetch(`http://localhost:6767/cartelle/${cartellaaperta.id}/articoli`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ title : titolo, author: user.username ,content: content})
        })
            .then(res =>
            {
                if(res.status === 200) return res.json();

                throw new Error("Errore durante il caricamento dell'articolo");
            })
            .then(data => {
                console.log("NuovoArticolo: ", data);
                const nuovaLista: ArticoloType[] = [...articoli, data];
                setArticoli(nuovaLista);
            })
            .catch(err => console.log(err));

        setScriviArticolo(false);
    }



    // Lista di autori unica dai dati
    const autoriUnici = Array.from(new Set(articoli.map(a => a.author)));

    // Filtra articoli in base all'autore selezionato
    const articoliFiltrati = autoreFilter
        ? articoli.filter(a => a.author === autoreFilter)
        : articoli;


    return (
        <>
            {scriviArticolo ? (
                <EditorArticolo
                    onClose={()=>setScriviArticolo(false)}
                    onPublish={(titolo : string, contenthtml: string)=>handlePublish(titolo, contenthtml)}
                />
            ) : articoloselezionato ? (
                <Articolo
                    articolo={articoloselezionato}
                    onClose={()=>setArticoloSelezionato(null)}
                />
            ) : (
                <>
                    <div className="header-row mt-5">
                        <button className="btn back-btn" onClick={() => setCartellaSelezionata(null)}>
                            <ArrowLeft size={40} />
                        </button>
                        <h1 className="cartella-title">{cartellaaperta.nome}</h1>
                    </div>





                    <div className="articoli-container">


                        <div className="filtro-autore justify-content-center">
                            <label>Filtra per autore: </label>
                            <select
                                value={autoreFilter}
                                onChange={(e) => setAutoreFilter(e.target.value)}
                            >
                                <option value="">Tutti</option>
                                {autoriUnici.map((autore) => (
                                    <option key={autore} value={autore}>{autore}</option>
                                ))}
                            </select>
                        </div>


                        <div className="articoli-grid">
                            {articoliFiltrati.map((articolo) => (
                                <div
                                    key={articolo.id}
                                    className="articolo-card"
                                    onClick={() => setArticoloSelezionato(articolo)}
                                >
                                    <h3 className="articolo-title">{articolo.title}</h3>
                                    <p className="articolo-preveiw">Autore: {articolo.author}</p>
                                </div>
                            ))}
                        </div>

                        {articoliFiltrati.length === 0 && <h4>Non ci sono articoli da visualizzare.</h4>}

                        <AddContentButton onPress={() => setScriviArticolo(true)} />
                    </div>
                </>
            )}
        </>
    );
}

export default EsploraArticoli;