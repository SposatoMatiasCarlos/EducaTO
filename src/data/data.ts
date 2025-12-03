import type {Question, User} from '../model/model.ts';
import type {Lesson} from '../model/model.ts';
import type {Percorso} from '../model/model.ts';


// ----------------------- Utenti --------------------- //

const users: User[] = [
    { id: 0, username: "mcs", password: "temp", badge: "Barbone di dio", points: 0, completedLessons:[] },
    { id: 1, username: "hudson", password: "temp", badge: "Barbone di dio", points: 0, completedLessons:[]}
];

export function getUserById(id: number): User | undefined{
    return users.find(user => user.id === id);
}



// ----------------------- Percorsi --------------------- //

const percorsi: Percorso[] = [
    { id: 1, title: "Finanza personale", lessons: [1,2,3,4] },
    { id: 2, title: "Contabilità", lessons: [5,6,7,8] },
    { id: 3, title: "Marketing & Business", lessons: [9,10,11,12] },
    { id: 4, title: "Economia aziendale", lessons: [13,14,15,16] }
];

export function getPercorsi(): Percorso[] | undefined{
    return percorsi;
}


export function getLessonsFromPercorso(percorso : Percorso) : Lesson[] {
    return lessons.filter(lesson => percorso.lessons.includes(lesson.id));
}


// ----------------------- Lezioni --------------------- //


const lessons: Lesson[] = [
    { id: 1, title: "Interesse semplice", description: "Concetti base: entrate, uscite, risparmio e investimenti.", difficulty: "easy", questionIds: [101,102,103,104,105], prerequisites: [] },
    { id: 2, title: "Interesse composto", description: "Come creare un budget efficace e risparmiare senza sforzi.", difficulty: "easy", questionIds: [201,202,203,204,205], prerequisites: [1] },
    { id: 3, title: "Investimenti base", description: "Azioni, obbligazioni, ETF e diversificazione.", difficulty: "medium", questionIds: [301,302,303,304,305], prerequisites: [2] },
    { id: 4, title: "Mercati finanziari moderni", description: "Derivati, fintech e nuovi strumenti digitali.", difficulty: "hard", questionIds: [401,402,403,404,405], prerequisites: [3] },

    { id: 5, title: "Fondamenti di contabilità", description: "Attività, passività, patrimonio netto e principi contabili.", difficulty: "easy", questionIds: [], prerequisites: [] },
    { id: 6, title: "Partita doppia", description: "Come funzionano movimenti dare e avere.", difficulty: "easy", questionIds: [], prerequisites: [5] },
    { id: 7, title: "Bilancio d'esercizio", description: "Stato patrimoniale e conto economico.", difficulty: "medium", questionIds: [], prerequisites: [6] },
    { id: 8, title: "Analisi di bilancio", description: "Indici di redditività, liquidità e solidità.", difficulty: "hard", questionIds: [], prerequisites: [7] },

    { id: 9, title: "Introduzione al marketing", description: "4P, valore percepito e concetti base.", difficulty: "easy", questionIds: [], prerequisites: [] },
    { id: 10, title: "Analisi del mercato", description: "Segmentazione, targeting e posizionamento.", difficulty: "medium", questionIds: [], prerequisites: [9] },
    { id: 11, title: "Branding", description: "Come costruire e mantenere un brand forte.", difficulty: "medium", questionIds: [], prerequisites: [10] },
    { id: 12, title: "Growth marketing", description: "Funnel AARRR, acquisizione e ottimizzazione.", difficulty: "hard", questionIds: [], prerequisites: [11] },

    { id: 13, title: "Cos’è un’azienda?", description: "Struttura, funzioni e obiettivi aziendali.", difficulty: "easy", questionIds: [], prerequisites: [] },
    { id: 14, title: "Organizzazione aziendale", description: "Gerarchie, processi e gestione delle risorse.", difficulty: "medium", questionIds: [], prerequisites: [13] },
    { id: 15, title: "Economia della produzione", description: "Costi fissi, variabili, economie di scala.", difficulty: "medium", questionIds: [], prerequisites: [14] },
    { id: 16, title: "Controllo di gestione", description: "Break-even, margini e KPI aziendali.", difficulty: "hard", questionIds: [], prerequisites: [15] }
];


export function isUnlocked(lezione: Lesson, utente: User): boolean {
    if (!lezione.prerequisites || lezione.prerequisites.length === 0) return true;
    return lezione.prerequisites.every(prereqId => utente.completedLessons.includes(prereqId));
}



// ----------------------- Domande --------------------- //

const domande: Question[] = [
    // Lezione 1 - Interesse semplice
    { id: 101, text: "Quanto guadagni con 100€ al 5% annuo semplice per 1 anno?", options: ["5€","100€","105€","110€"], correctOptionIndex: 2, explanation: "100*0.05=5€" },
    { id: 102, text: "L'interesse semplice si calcola su:", options: ["Il capitale iniziale","Gli interessi accumulati","Entrambi","Nessuno"], correctOptionIndex: 0 },
    { id: 103, text: "Se investi 200€ al 3% per 2 anni, quanto guadagni?", options: ["6€","12€","18€","24€"], correctOptionIndex: 1 },
    { id: 104, text: "Qual è la formula dell'interesse semplice?", options: ["I = C*r*t","I = C*(1+r)^t","I = C*r","I = C/t"], correctOptionIndex: 0 },
    { id: 105, text: "Interesse semplice e composto sono uguali?", options: ["Sempre","Mai","Solo 1 anno","Dipende"], correctOptionIndex: 2 },

    // Lezione 2 - Interesse composto
    { id: 201, text: "Investendo 100€ al 5% annuo composto per 2 anni, quanto avrai?", options: ["105€","110.25€","115€","120€"], correctOptionIndex: 1 },
    { id: 202, text: "Differenza principale tra interesse semplice e composto?", options: ["Nessuna","Semplice sul capitale, composto sugli interessi","Composto inferiore","Semplice solo banche"], correctOptionIndex: 1 },
    { id: 203, text: "Formula interesse composto?", options: ["C*(1+r)^t","C*r*t","C+r*t","C/t"], correctOptionIndex: 0 },
    { id: 204, text: "Interesse composto significa:", options: ["Interesse calcolato solo sul capitale","Interesse calcolato anche sugli interessi","Non esiste","Solo banche"], correctOptionIndex: 1 },
    { id: 205, text: "Se il tasso è 0%, il composto è uguale al semplice?", options: ["Sì","No","Solo per 1 anno","Dipende"], correctOptionIndex: 0 },

    // Lezione 3 - Investimenti base
    { id: 301, text: "Cosa sono azioni?", options: ["Quote di una società","Debiti","Obbligazioni","ETF"], correctOptionIndex: 0 },
    { id: 302, text: "Cosa sono obbligazioni?", options: ["Titoli di debito","Quote societarie","Fondi comuni","Derivati"], correctOptionIndex: 0 },
    { id: 303, text: "ETF è:", options: ["Fondo indicizzato","Titolo azionario","Obbligazione","Criptovaluta"], correctOptionIndex: 0 },
    { id: 304, text: "Diversificazione significa:", options: ["Distribuire investimenti su più asset","Concentrarsi su uno solo","Vendere tutto","Comprare oro"], correctOptionIndex: 0 },
    { id: 305, text: "Rischio e rendimento:", options: ["Più rischio più rendimento","Più rischio meno rendimento","Sempre uguali","Dipende solo dal capitale"], correctOptionIndex: 0 },

    // Lezione 4 - Mercati finanziari moderni
    { id: 401, text: "Cosa sono derivati finanziari?", options: ["Strumenti basati su asset sottostanti","Azioni","Obbligazioni","ETF"], correctOptionIndex: 0 },
    { id: 402, text: "Fintech indica:", options: ["Tecnologia finanziaria","Contabilità","Marketing","Produzione"], correctOptionIndex: 0 },
    { id: 403, text: "Mercati moderni includono:", options: ["Criptovalute","Solo azioni","Solo obbligazioni","Solo ETF"], correctOptionIndex: 0 },
    { id: 404, text: "ETF moderni:", options: ["Fondi negoziati in borsa","Titoli bancari","Obbligazioni","Criptovalute"], correctOptionIndex: 0 },
    { id: 405, text: "Derivati servono per:", options: ["Copertura o speculazione","Risparmio","Marketing","Produzione"], correctOptionIndex: 0 },
];


export function getQuestionsFromLesson(lesson: Lesson): Question[] {
    return domande.filter(q => lesson.questionIds.includes(q.id));
}