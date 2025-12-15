import {type ReactElement, useEffect, useState} from "react";
import type {Percorso} from '../../model/model.ts';
import type {Lesson} from '../../model/model.ts';

import {ArrowLeft} from "lucide-react";
import Banner from "../../components/MyComponents/Banner/Banner.tsx";
import Mappa from "../../components/MyComponents/Mappa/Mappa.tsx";
import {Button, Modal} from "react-bootstrap";
import AddContentButton from "../../components/MyComponents/AddContentButton/AddContentButton.tsx";
import FormLezione from "../../components/MyComponents/FormLezione/FormLezione.tsx";


interface LearningPathProps {
    onSelectedPercorso: (percorso: Percorso | null) => void;
    onStartLesson: (lezione: Lesson | null) => void;
    percorso: Percorso;
}

function LearningPath({onSelectedPercorso, percorso, onStartLesson}: LearningPathProps): ReactElement {


    const [lezioni, setLezioni] = useState<Lesson[]>([]);
    const [lezioneSelezionata, setLezioneSelezionata] = useState<Lesson | null>(null);
    const [creaLezione, setCreaLezione] = useState<boolean>(false);

    function fetchLezioni() {

        fetch(`http://localhost:6767/percorsi/${percorso.id}/lezioni`, {credentials: "include"})
            .then(res => {
                if(res.status === 200) return res.json();
                else throw Error("Errore fetch lezioni");
            })
            .then(data => {
                console.log("Lezioni: ", data);
                setLezioni(data);
            })
            .catch(err => console.log(err));
    }
    useEffect(fetchLezioni, [percorso.id]);

    return (
        <>
            {creaLezione ? (
                <FormLezione
                    onLessonCreated={(lesson) => {
                        setLezioni(prev => [...prev, lesson]);
                        setCreaLezione(false);
                    }}
                    idPercorso={percorso.id}
                />
            ) : (
                <>
                    <div className="row">
                        <div className="col-4">
                            <button className="btn m-5" onClick={() => onSelectedPercorso(null)}>
                                <ArrowLeft size={50}/>
                            </button>
                        </div>

                        <div className="col-4 justify-content-center">
                            <Banner percorso={percorso} lezioni={lezioni}/>
                        </div>
                    </div>

                    {lezioni.length > 0 && (
                        <Mappa
                            percorso={percorso}
                            lezioni={lezioni}
                            setLezioneSelezionata={setLezioneSelezionata}
                        />
                    )}
                </>
            )}



            <Modal
                show={lezioneSelezionata !== null}
                onHide={() => setLezioneSelezionata(null)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{lezioneSelezionata?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{lezioneSelezionata?.description}</p>
                    <p><strong>Difficoltà:</strong> {lezioneSelezionata?.difficulty}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => onStartLesson(lezioneSelezionata)}>
                        Avvia Lezione
                    </Button>
                    <Button variant="secondary" onClick={() => setLezioneSelezionata(null)}>
                        Chiudi
                    </Button>
                </Modal.Footer>
            </Modal>

            <AddContentButton onPress={() => setCreaLezione(true)}/>
        </>
    );

}

export default LearningPath;