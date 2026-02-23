import type {ReactElement} from "react";
import TextType from "../../ThirdPartyComponents/TextType/TextType.tsx";
import vittoria from "../../../assets/vittoria.mp4";
import sconfitta from "../../../assets/sconfitta.mp4";

interface FineQuizProps{
    superata : boolean;
    onClose: () => void;

}

function FineQuiz({superata, onClose} : FineQuizProps): ReactElement {

    return (
        <>
            <div className="quiz-finale text-center mt-5" style={{position: "relative", zIndex: 10}}>
                <TextType
                    text={superata ? "Lezione Superata" : "Riprova"}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    // aggiungiamo stile inline per colore e dimensione
                    style={{
                        color: superata ? "green" : "red",
                        fontSize: "3rem",  // testo più grande
                        fontWeight: "bold",
                        marginBottom: "2rem", // spazio tra testo e bottone
                        display: "block"
                    }}
                />

                <div style={{textAlign: "center"}}>
                    <button className={`btn ${superata ? 'btn-success' : 'btn-danger'}`} onClick={onClose}>
                        Torna Indietro
                    </button>
                </div>

                <video
                    src={superata ? vittoria : sconfitta}
                    autoPlay
                    loop
                    muted
                    style={{
                        width: '400px',
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: '8px'
                    }}
                />
            </div>
        </>
    );
}

export default FineQuiz;