import {type ReactElement, useEffect, useState} from "react";
import type {Percorso} from '../../model/model.ts';
import type {Lesson} from '../../model/model.ts';

import {ArrowLeft} from "lucide-react";
import Banner from "../../components/MyComponents/Banner/Banner.tsx";
import Mappa from "../../components/MyComponents/Mappa/Mappa.tsx";
import {Button, Modal} from "react-bootstrap";
import AddContentButton from "../../components/MyComponents/AddContentButton/AddContentButton.tsx";
import MyForm from "../../components/MyComponents/MyForm/MyForm.tsx";




interface LearningPathProps {
    onSelectedPercorso: (percorso: Percorso | null) => void;
    onStartLesson: (lezione : Lesson | null) => void;
    percorso: Percorso;
}

function LearningPath({onSelectedPercorso, percorso, onStartLesson}: LearningPathProps): ReactElement {


    const [lezioni, setLezioni] = useState<Lesson[]>([]);
    const [lezioneSelezionata, setLezioneSelezionata] = useState<Lesson | null>(null);
    const [showOverlay, setShowOverlay] = useState<boolean>(false);


    function fetchLezioni(){

        fetch(`http://localhost:6767/percorsi/${percorso.id}/lezioni`, {credentials :"include"} )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setLezioni(data);
            })
            .catch(err => console.log(err));

    }


    useEffect(fetchLezioni , [percorso.id]);


    if(lezioni.length == 0) {return <h4>Non ci sono lezioni da visualizzare</h4>; }

    return (
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


            <Mappa percorso={percorso} lezioni={lezioni} setLezioneSelezionata={setLezioneSelezionata}/>


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

            <AddContentButton onPress={() => setShowOverlay(true)}/>


            {showOverlay ?
                <MyForm
                    tipo={"lezione"}
                    onConfirm={()=>{}}
                    onClose={()=> setShowOverlay(false)}
                /> : <></>}
        </>
    );
}

export default LearningPath;