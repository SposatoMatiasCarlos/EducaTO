import {type ReactElement, useState} from "react";
import InfiniteMenu from '../../components/ThirdPartyComponents/InfiniteMenu/InfiniteMenu.tsx';
import type {Lesson, Percorso} from '../../model/model.ts';
import {getPercorsi} from '../../data/data.ts';
import LearningPath from './LearningPath.tsx';
import './QuizHome.css';
import type {User} from '../../model/model.ts';
import QuizViewer from './QuizViewer.tsx';
import AddContentButton from "../../components/MyComponents/AddContentButton/AddContentButton.tsx";
import MyForm from "../../components/MyComponents/MyForm/MyForm.tsx";

interface QuizHomeProps {
    utente: User;
    setPoints: (punti : number)=>void;
}


function QuizHome({utente, setPoints} : QuizHomeProps) : ReactElement {

    // Array di tutti i percorsi disponibili
    const percorsi : Percorso[] | undefined = getPercorsi();

    // Rappresenta il percorso ce
    const [PercorsoSelezionato, setPercorso] = useState<Percorso | null>(null);

    // Rappresenta la lezione che l'utente vuole completare
    const [LezioneAvviata, setLezioneAvviata] = useState<Lesson | null>(null);

    const [showOverlay, setShowOverlay] = useState<boolean>(false);


    // Crea gli item da visualizzare nel menu
    const items = percorsi.map((percorso) => ({
        image: 'https://picsum.photos/300/300?grayscale',
        link: `Quiz`,
        title: percorso.title,
        description: percorso.description || "Un percorso da completare!",
        onClick: () => setPercorso(percorso)
    }));


    return (
        <>
            {LezioneAvviata ? (
                <QuizViewer
                    lezione={LezioneAvviata}
                    onClose={() => setLezioneAvviata(null)} // torna alla mappa
                    utente={utente}
                    setPoints={setPoints}
                />
            ) : PercorsoSelezionato ? (
                <LearningPath
                    setPercorso={setPercorso}
                    percorso={PercorsoSelezionato}
                    utente={utente}
                    setLezioneAvviata={setLezioneAvviata}
                    setPoints={setPoints}
                />
            ) : (
                <div className="infinite-menu-wrapper" style={{
                    height: 'calc(100vh - 100px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <InfiniteMenu items={items} />


                    <AddContentButton setShowOverlay={setShowOverlay} utente={utente}/>
                    {showOverlay ? <MyForm tipo={"percorso"} setShowOverlay={setShowOverlay} /> : <></>}

                </div>
            )}

        </>
    );
}

export default QuizHome;