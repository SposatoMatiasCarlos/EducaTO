import {type ReactElement, useState} from "react";
import type {Percorso} from '../../model/model.ts';
import type {Lesson} from '../../model/model.ts';
import type {User} from '../../model/model.ts';
import {getLessonsFromPercorso} from '../../data/data.ts';
import {ArrowLeft} from "lucide-react";
import Banner from "../../components/MyComponents/Banner/Banner.tsx";
import Mappa from "../../components/MyComponents/Mappa/Mappa.tsx";
import {Button, Modal} from "react-bootstrap";




interface LearningPathProps {
    setPercorso: (percorso: Percorso | null) => void;
    setLezioneAvviata: (lezione : Lesson | null) => void;
    percorso: Percorso;
    utente: User;
    setPoints : (punti : number) => void;
}

function LearningPath({setPercorso, percorso, utente, setLezioneAvviata, setPoints}: LearningPathProps): ReactElement {

    const lezioni: Lesson[] = getLessonsFromPercorso(percorso);

    const [LezioneSelezionata, setLezioneSelezionata] = useState<Lesson | null>(null);


    return (
        <>

            <div className="row">
                <div className="col-4">
                    <button className="btn m-5" onClick={() => setPercorso(null)}>
                        <ArrowLeft size={50}/>
                    </button>
                </div>


                <div className="col-4 justify-content-center">
                    <Banner percorso={percorso} utente={utente} lezioni={lezioni}/>
                </div>
            </div>


            <Mappa percorso={percorso} lezioni={lezioni} utente={utente} setLezioneSelezionata={setLezioneSelezionata} setPoints={setPoints}/>

            <Modal
                show={LezioneSelezionata !== null}
                onHide={() => setLezioneSelezionata(null)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>{LezioneSelezionata?.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{LezioneSelezionata?.description}</p>
                    <p><strong>Difficoltà:</strong> {LezioneSelezionata?.difficulty}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => setLezioneAvviata(LezioneSelezionata)}>
                        Avvia Lezione
                    </Button>
                    <Button variant="secondary" onClick={() => setLezioneSelezionata(null)}>
                        Chiudi
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default LearningPath;