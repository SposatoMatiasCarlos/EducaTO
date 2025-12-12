

export interface User {
    id: number;
    username: string;
    password: string;
    avatarId: number;
    ruolo: 'studente' | 'admin' | 'mod'
    points: number;
    badge: "Barbone di dio" | "Emerald stuck" | "Challenger";
    completedLessons: number[];
    bonusReceived: number[];
}


export interface UserResponse{
    users: User[];
    totalCount: number;
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
    options: string[];
}

export interface StartResponse {
    domande: Question[];
    vite: number;
    errori: number;
    message: string;
}

export interface AnswerRequest{
    domandaId: number;
    rispostaIndex: number;
}

export interface AnswerResponse{
    corretta: boolean
    viteRimanenti: number;
    errori: number;
    spiegazione : string;
}

export interface CompleteResponse{
    superata: boolean;
    puntiAggiunti: number;
    message: string;
    utente: User;
}




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