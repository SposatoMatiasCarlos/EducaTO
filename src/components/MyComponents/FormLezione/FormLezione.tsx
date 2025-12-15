import { type ReactElement, useState } from "react";
import type {CreateLessonRequest, Lesson, Question} from "../../../model/model.ts";
import './FormLezione.css';

interface NuovaLezioneProps {
    onLessonCreated: (lesson: Lesson) => void;
    idPercorso: number;
}

function FormLezione({ idPercorso, onLessonCreated }: NuovaLezioneProps): ReactElement {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState<10 | 20 | 30>(10);
    const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
    const [questions, setQuestions] = useState<Question[]>([]);


    function handleQuestionChange(index: number, field: keyof Question, value: string | number | string[]) {
        setQuestions(prev => {
            const newQ = [...prev];
            newQ[index] = { ...newQ[index], [field]: value } as Question;
            return newQ;
        });
    }
    function addQuestion() {
        // L'id è temporaneo
        setQuestions(prev => [...prev, { id: 0, text: "", options: ["", "", "", ""], correctOptionIndex: 0, explanation:""}]);
    }
    function removeQuestion(index: number) {
        setQuestions(prev => prev.filter((_, i) => i !== index));
    }
    function handleSubmit() {

        // Id e questionIds vengono assegnate dal server
        const lezione: Lesson = {
            id: 0,
            title: title,
            description: description,
            points: points,
            difficulty: difficulty,
            questionIds: [],
            prerequisites: []
        };


        const richiesta: CreateLessonRequest = {
            lezione: lezione,
            domande: questions
        };

        fetch(`http://localhost:6767/percorsi/${idPercorso}/lezioni`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(richiesta)
        })
            .then(res => {
                if (!res.ok) throw new Error("Errore nella creazione della lezione");
                return res.json();
            })
            .then((data: CreateLessonRequest) => {
                onLessonCreated(data.lezione);
                console.log("Nuova Lezione (e domande): ", data);
            })
            .catch(err => console.log(err));
    }


    return (
        <div className="nuova-lezione-card">
            <h2>Crea Nuova Lezione</h2>
            <form onSubmit={handleSubmit} className="nuova-lezione-form">
                <label>
                    Titolo:
                    <input value={title} onChange={e => setTitle(e.target.value)} required />
                </label>
                <label>
                    Descrizione:
                    <textarea value={description} onChange={e => setDescription(e.target.value)} required />
                </label>
                <label>
                    Punti:
                    <select value={points} onChange={e => setPoints(Number(e.target.value) as 10 | 20 | 30)}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                    </select>
                </label>
                <label>
                    Difficoltà:
                    <select value={difficulty} onChange={e => setDifficulty(e.target.value as "easy" | "medium" | "hard")}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </label>

                <h3>Domande</h3>
                {questions.map((q, qIndex) => (
                    <div key={qIndex} className="question-block">
                        <label>
                            Testo domanda:
                            <input
                                value={q.text}
                                onChange={e => handleQuestionChange(qIndex, "text", e.target.value)}
                                required
                            />
                        </label>

                        <p>Opzioni:</p>
                        <div className="options-container">
                            {q.options.map((opt, oIndex) => (
                                <input
                                    key={oIndex}
                                    value={opt}
                                    onChange={e => {
                                        const newOptions = [...q.options];
                                        newOptions[oIndex] = e.target.value;
                                        handleQuestionChange(qIndex, "options", newOptions);
                                    }}
                                    required
                                />
                            ))}
                        </div>

                        <label>
                            Risposta corretta (indice 0-3):
                            <input
                                type="number"
                                min={0}
                                max={3}
                                value={q.correctOptionIndex}
                                onChange={e => handleQuestionChange(qIndex, "correctOptionIndex", Number(e.target.value))}
                                required
                            />
                        </label>

                        <button className="btn btn-danger" onClick={() => removeQuestion(qIndex)} disabled={questions.length === 1}>
                            Rimuovi domanda
                        </button>
                        <hr />
                    </div>
                ))}

                <div className="btn btn-success me-2" onClick={addQuestion}>Aggiungi Domanda</div>
                <div className="btn btn-success" onClick={handleSubmit}>Crea Lezione</div>
            </form>
        </div>
    );
}

export default FormLezione;