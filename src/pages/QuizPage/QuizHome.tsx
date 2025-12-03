import {type ReactElement, useState} from "react";
import InfiniteMenu from '../../components/ThirdPartyComponents/InfiniteMenu/InfiniteMenu.tsx';
import type {Lesson, Percorso} from '../../model/model.ts';
import {getPercorsi} from '../../data/data.ts';
import LearningPath from './LearningPath.tsx';
import './QuizHome.css';
import type {User} from '../../model/model.ts';
import QuizViewer from '../../components/MyComponents/QuizViewer/QuizViewer.tsx';

interface QuizHomeProps {
    utente: User;
}


function QuizHome({utente} : QuizHomeProps) : ReactElement {

    // Array di tutti i percorsi disponibili
    const percorsi : Percorso[] | undefined = getPercorsi();

    // Rappresenta il percorso ce
    const [PercorsoSelezionato, setPercorso] = useState<Percorso | null>(null);

    // Rappresenta la lezione che l'utente vuole completare
    const [LezioneAvviata, setLezioneAvviata] = useState<Lesson | null>(null);


    // Crea gli item da visualizzare nel menu
    const items = percorsi.map((percorso) => ({
        image: 'https://picsum.photos/300/300?grayscale',
        link: `#`,
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
                />
            ) : PercorsoSelezionato ? (
                <LearningPath
                    setPercorso={setPercorso}
                    percorso={PercorsoSelezionato}
                    utente={utente}
                    setLezioneAvviata={setLezioneAvviata}
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
                </div>
            )}
        </>
    );
}

export default QuizHome;