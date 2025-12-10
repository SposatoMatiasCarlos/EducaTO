import {type ReactElement, useContext, useEffect, useState} from "react";
import InfiniteMenu from '../../components/ThirdPartyComponents/InfiniteMenu/InfiniteMenu.tsx';
import type {Lesson, Percorso} from '../../model/model.ts';
import LearningPath from './LearningPath.tsx';
import './QuizHome.css';
import QuizViewer from './QuizViewer.tsx';
import AddContentButton from "../../components/MyComponents/AddContentButton/AddContentButton.tsx";
import MyForm from "../../components/MyComponents/MyForm/MyForm.tsx";
import {isPercorsoCompletato} from "../../data/data.ts";
import {UserContext} from '../../UserContext.ts';



function QuizHome(): ReactElement {

    const [percorsi, setPercorsi] = useState<Percorso[]>([]);
    const [percorsoSelezionato, setPercorsoSelezionato] = useState<Percorso | null>(null);
    const [LezioneAvviata, setLezioneAvviata] = useState<Lesson | null>(null);
    const [showOverlay, setShowOverlay] = useState<boolean>(false);

    useEffect(fetchPercorsi, []);

    const {user} = useContext(UserContext);
    if(user == null) return <h3>Devi prima autenticarti</h3>;


    let items = undefined;
    if(percorsi.length != 0) {
        items = percorsi.map((percorso) => {
            const isCompleted = isPercorsoCompletato(user, percorso);

            return {
                image: isCompleted
                    ? '/img/gray.jpg'
                    : '/img/verde.png',
                link: `Quiz`,
                title: percorso.title,
                description: "",
                onClick: () => setPercorsoSelezionato(percorso)
            };
        });
    }
    else return(
        <>
            <h3>Nessun percorso da visualizzare</h3>;
            <AddContentButton onPress={()=> setShowOverlay(true)}/>
            {showOverlay &&
                <MyForm
                    tipo={"percorso"}
                    onClose={()=>setShowOverlay(false)}
                    onConfirm={(title : string) => { addNewPercorso(title)}}
                />
            }

        </>
    );


    function fetchPercorsi(){

        fetch("http://localhost:6767/percorsi", {credentials: "include"})
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setPercorsi(data);
            })
            .catch(err => console.log(err));

    }
    function addNewPercorso(title : string){

        fetch("http://localhost:6767/percorsi", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ title })
        })
            .then(res => {
                if(res.status === 200) return res.json();

                throw new Error("Errore durante il caricamento del nuovo percorso");
            })
            .then(data => {
                console.log("Nuovo percorso: ", data); // log del nuovo percorso
                const nuovaLista: Percorso[] = [...percorsi, data];
                setPercorsi(nuovaLista);
            })

        setShowOverlay(false);
    }


    return (
        <>

            { LezioneAvviata && (
                <QuizViewer
                    lezione={LezioneAvviata}
                    percorso={percorsoSelezionato!} // sicuro, perché c’è LezioneAvviata
                    onClose={() => setLezioneAvviata(null)}
                />
            )}


            {!LezioneAvviata && percorsoSelezionato && (
                <LearningPath
                    onSelectedPercorso={(p: Percorso | null) => setPercorsoSelezionato(p)}
                    percorso={percorsoSelezionato}
                    onStartLesson={(lezione: Lesson | null) => setLezioneAvviata(lezione)}
                />
            )}


            {!LezioneAvviata && !percorsoSelezionato && (
                <div className="infinite-menu-wrapper">
                    <InfiniteMenu items={items} />

                    <AddContentButton onPress={() => setShowOverlay(true)} />

                    {showOverlay && (
                        <MyForm
                            tipo={"percorso"}
                            onClose={() => setShowOverlay(false)}
                            onConfirm={(title: string) => addNewPercorso(title)}
                        />
                    )}
                </div>
            )}


        </>
    );
}

export default QuizHome;