import {type ReactElement, useEffect, useRef, useState} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "./EditorArticolo.css";
import {ArrowLeft} from "lucide-react";


interface EditorArticoloProps {
    onPublish: (titolo: string, contenthtml: string) => void;
    onClose: ()=> void;
}


export default function EditorArticolo({onPublish, onClose}: EditorArticoloProps): ReactElement {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const quillRef = useRef<Quill | null>(null);

    const [title, setTitle] = useState("");
    const [contentHtml, setContentHtml] = useState("");

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: "snow",
                modules: {
                    toolbar: [
                        [{header: [1, 2, 3, false]}],
                        ["bold", "italic", "underline", "strike"],
                        [{list: "ordered"}, {list: "bullet"}],
                        ["link", "image"],
                        ["clean"],
                    ],
                },
            });

            quillRef.current.on("text-change", () => {
                setContentHtml(quillRef.current!.root.innerHTML);
            });
        }
    }, []);


    return (
        <>
            <div className="header-row mt-5">
                <button className="btn back-btn" onClick={onClose}>
                    <ArrowLeft size={40}/>
                </button>
            </div>

            <div className="editor-container">
                <h2 className="editor-title">Crea nuovo articolo</h2>

                <input
                    type="text"
                    className="editor-input-title"
                    placeholder="Titolo dell'articolo"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <div
                    ref={editorRef}
                    className="editor-quill"
                />

                <button className="btn btn-success" onClick={() => onPublish(title, contentHtml)}>
                    Pubblica articolo
                </button>
            </div>
        </>
    );
}