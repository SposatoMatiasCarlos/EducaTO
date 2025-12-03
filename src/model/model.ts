
// Utente che utilizza l'applicazione
export interface User {
    id: number;
    username: string;
    password: string;
    points: number;            // punti accumulati
    badge: "Barbone di dio" | "Investitore medio" | "Esperto Cryptoguru";
    completedLessons: number[]; // array di lessonId completate
}


// Insieme di lezioni
export interface Percorso {
    id: number;
    title: string;
    description?: string;
    lessons: number[]; // array di lessonId nell’ordine del percorso
}


// Insieme di domande
export interface Lesson {
    id: number;
    title: string;
    description: string;
    difficulty: "easy" | "medium" | "hard";
    questionIds: number[];          // id delle domande associate
    prerequisites?: number[];
}


export interface Question {
    id: number;
    text: string;
    options: string[];        // risposte possibili
    correctOptionIndex: number; // indice della risposta corretta
    explanation?: string;     // spiegazione per la risposta
}