
// Utente che utilizza l'applicazione
export interface User {
    id: number;
    username: string;
    password: string;
    avatarId: number;
    ruolo: 'studente' | 'admin' | 'mod'
    points: number;
    badge: "Barbone di dio" | "Investitore medio" | "Esperto Cryptoguru";
    completedLessons: number[];
    completedArticles: number[];
    bonusReceived: number[]; // array di Percorso.id o id tesori già premiati
}

// ------------------------ Model del quiz -------------------- //

// Insieme di lezioni
export interface Percorso {
    id: number;
    title: string;
    lessons: number[]; // array di lessonId nell’ordine del percorso
}


// Insieme di domande
export interface Lesson {
    id: number;
    title: string;
    description: string;
    points: 10 | 20 | 30;
    difficulty: "easy" | "medium" | "hard";
    questionIds: number[];          // id delle domande associate
    prerequisites?: number[];
}


export interface Question {
    id: number;
    text: string;
    options: string[];        // risposte possibili
    explanation?: string;     // spiegazione per la risposta
}

// --------------------------------------------------------- //


// -------------------- Model articoli -------------------- //

// Una cartella che contiene articoli
export interface Cartella {
    id: number;
    nome: string;
    articoli: number[];
}


export interface Articolo {
    id: number;
    title: string;
    author: string;
    content: string;
}