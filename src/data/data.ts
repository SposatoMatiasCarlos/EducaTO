import type {Question, User, Lesson, Percorso, Cartella, Articolo} from '../model/model.ts';



// ----------------------- Utenti --------------------- //

const users: User[] = [
    { id: 0, username: "mcs", password: "temp", ruolo: 'studente', badge: "Barbone di dio", points: 0, completedLessons:[], completedArticles:[], bonusReceived:[]},
    { id: 1, username: "hudson", password: "temp", ruolo: 'admin', badge: "Barbone di dio", points: 0, completedLessons:[], completedArticles:[], bonusReceived:[]}
];

export function getUserById(id: number): User | undefined{
    return users.find(user => user.id === id);
}

export function aggiornaLezioniSuperateUtente(utente: User, lessonId: number): void {
    if (!utente.completedLessons.includes(lessonId)) {
        utente.completedLessons.push(lessonId);
    }
}

export function aggiungiPuntiLezioneUtente(utente: User, punti: number): void {
    utente.points += punti;
}



// ----------------------- Percorsi --------------------- //

const percorsi: Percorso[] = [
    { id: 1, title: "Finanza personale", lessons: [1,2,3,4,17,18,19,20] },
    { id: 2, title: "Contabilità", lessons: [5,6,7,8]},
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
    // ---------------- FINANZA (1–8) ---------------- //
    { id: 1, title: "Interesse semplice", description: "Concetti base: entrate, uscite, risparmio e investimenti.", points: 10, difficulty: "easy", questionIds: [101,102,103,104,105], prerequisites: [] },
    { id: 2, title: "Interesse composto", description: "Come creare un budget efficace e risparmiare senza sforzi.", points: 10, difficulty: "easy", questionIds: [201,202,203,204,205], prerequisites: [1] },
    { id: 3, title: "Investimenti base", description: "Azioni, obbligazioni, ETF e diversificazione.", points: 20, difficulty: "medium", questionIds: [301,302,303,304,305], prerequisites: [2] },
    { id: 4, title: "Mercati finanziari moderni", description: "Derivati, fintech e nuovi strumenti digitali.", points: 30, difficulty: "hard", questionIds: [401,402,403,404,405], prerequisites: [3] },
    { id: 17, title: "Risparmio e budgeting", description: "Creare un piano di risparmio efficace.", points: 10, difficulty: "easy", questionIds: [501,502,503,504,505], prerequisites: [4] },
    { id: 18, title: "Debito e credito", description: "Gestire prestiti e carte di credito.", points: 20, difficulty: "medium", questionIds: [506,507,508,509,510], prerequisites: [17] },
    { id: 19, title: "ETF avanzati", description: "Tipi di ETF e strategie di investimento.", points: 30, difficulty: "hard", questionIds: [511,512,513,514,515], prerequisites: [18] },
    { id: 20, title: "Criptovalute e blockchain", description: "Investimenti digitali e sicurezza.", points: 30, difficulty: "hard", questionIds: [516,517,518,519,520], prerequisites: [19] },

    // ---------------- CONTABILITÀ BASE (5–8) ---------------- //
    { id: 5, title: "Fondamenti di contabilità", description: "Attività, passività, patrimonio netto e principi contabili.", points: 10, difficulty: "easy", questionIds: [101], prerequisites: [] },
    { id: 6, title: "Partita doppia", description: "Come funzionano movimenti dare e avere.", points: 10, difficulty: "easy", questionIds: [101], prerequisites: [5] },

    // ---------------- MARKETING & BUSINESS (9–12) ---------------- //
    { id: 9, title: "Introduzione al marketing", description: "4P, valore percepito e concetti base.", points: 10, difficulty: "easy", questionIds: [], prerequisites: [] },
    { id: 10, title: "Analisi del mercato", description: "Segmentazione, targeting e posizionamento.", points: 20, difficulty: "medium", questionIds: [], prerequisites: [9] },
    { id: 11, title: "Branding", description: "Come costruire e mantenere un brand forte.", points: 20, difficulty: "medium", questionIds: [], prerequisites: [10] },
    { id: 12, title: "Growth marketing", description: "Funnel AARRR, acquisizione e ottimizzazione.", points: 30, difficulty: "hard", questionIds: [], prerequisites: [11] },

    // ---------------- ECONOMIA AZIENDALE (13–16) ---------------- //
    { id: 13, title: "Cos’è un’azienda?", description: "Struttura, funzioni e obiettivi aziendali.", points: 10, difficulty: "easy", questionIds: [], prerequisites: [] },
    { id: 14, title: "Organizzazione aziendale", description: "Gerarchie, processi e gestione delle risorse.", points: 20, difficulty: "medium", questionIds: [], prerequisites: [13] },
    { id: 15, title: "Economia della produzione", description: "Costi fissi, variabili, economie di scala.", points: 20, difficulty: "medium", questionIds: [], prerequisites: [14] },
    { id: 16, title: "Controllo di gestione", description: "Break-even, margini e KPI aziendali.", points: 30, difficulty: "hard", questionIds: [], prerequisites: [15] }
];

export function isUnlocked(lezione: Lesson, utente: User): boolean {
    if (!lezione.prerequisites || lezione.prerequisites.length === 0) return true;
    return lezione.prerequisites.every(prereqId => utente.completedLessons.includes(prereqId));
}

export function hasCompletedLessons(percorsoId: number, lezioni: Lesson[], utente: User): number {
    const tutteCompletate = lezioni.every(lezione => utente.completedLessons.includes(lezione.id));
    const bonusNonAssegnato = !utente.bonusReceived?.includes(percorsoId);

    if(tutteCompletate && bonusNonAssegnato) return 1;
    else if(tutteCompletate == false) return -1;
    else return 0;
}

// ----------------------- Domande --------------------- //
const domande: Question[] = [
    // ---------------- FINANZA ----------------
    // Lezione 1–4 già definite
    { id: 101, text: "Quanto guadagni con 100€ al 5% annuo semplice per 1 anno?", options: ["5€","100€","105€","110€"], correctOptionIndex: 2, explanation: "100*0.05=5€" },
    { id: 102, text: "L'interesse semplice si calcola su:", options: ["Il capitale iniziale","Gli interessi accumulati","Entrambi","Nessuno"], correctOptionIndex: 0 },
    { id: 103, text: "Se investi 200€ al 3% per 2 anni, quanto guadagni?", options: ["6€","12€","18€","24€"], correctOptionIndex: 1 },
    { id: 104, text: "Qual è la formula dell'interesse semplice?", options: ["I = C*r*t","I = C*(1+r)^t","I = C*r","I = C/t"], correctOptionIndex: 0 },
    { id: 105, text: "Interesse semplice e composto sono uguali?", options: ["Sempre","Mai","Solo 1 anno","Dipende"], correctOptionIndex: 2 },
    { id: 201, text: "Investendo 100€ al 5% annuo composto per 2 anni, quanto avrai?", options: ["105€","110.25€","115€","120€"], correctOptionIndex: 1 },
    { id: 202, text: "Differenza principale tra interesse semplice e composto?", options: ["Nessuna","Semplice sul capitale, composto sugli interessi","Composto inferiore","Semplice solo banche"], correctOptionIndex: 1 },
    { id: 203, text: "Formula interesse composto?", options: ["C*(1+r)^t","C*r*t","C+r*t","C/t"], correctOptionIndex: 0 },
    { id: 204, text: "Interesse composto significa:", options: ["Interesse calcolato solo sul capitale","Interesse calcolato anche sugli interessi","Non esiste","Solo banche"], correctOptionIndex: 1 },
    { id: 205, text: "Se il tasso è 0%, il composto è uguale al semplice?", options: ["Sì","No","Solo per 1 anno","Dipende"], correctOptionIndex: 0 },
    { id: 301, text: "Cosa sono azioni?", options: ["Quote di una società","Debiti","Obbligazioni","ETF"], correctOptionIndex: 0 },
    { id: 302, text: "Cosa sono obbligazioni?", options: ["Titoli di debito","Quote societarie","Fondi comuni","Derivati"], correctOptionIndex: 0 },
    { id: 303, text: "ETF è:", options: ["Fondo indicizzato","Titolo azionario","Obbligazione","Criptovaluta"], correctOptionIndex: 0 },
    { id: 304, text: "Diversificazione significa:", options: ["Distribuire investimenti su più asset","Concentrarsi su uno solo","Vendere tutto","Comprare oro"], correctOptionIndex: 0 },
    { id: 305, text: "Rischio e rendimento:", options: ["Più rischio più rendimento","Più rischio meno rendimento","Sempre uguali","Dipende solo dal capitale"], correctOptionIndex: 0 },
    { id: 401, text: "Cosa sono derivati finanziari?", options: ["Strumenti basati su asset sottostanti","Azioni","Obbligazioni","ETF"], correctOptionIndex: 0 },
    { id: 402, text: "Fintech indica:", options: ["Tecnologia finanziaria","Contabilità","Marketing","Produzione"], correctOptionIndex: 0 },
    { id: 403, text: "Mercati moderni includono:", options: ["Criptovalute","Solo azioni","Solo obbligazioni","Solo ETF"], correctOptionIndex: 0 },
    { id: 404, text: "ETF moderni:", options: ["Fondi negoziati in borsa","Titoli bancari","Obbligazioni","Criptovalute"], correctOptionIndex: 0 },
    { id: 405, text: "Derivati servono per:", options: ["Copertura o speculazione","Risparmio","Marketing","Produzione"], correctOptionIndex: 0 },

    // Lezione 17 - Budgeting personale
    { id: 501, text: "Cos'è il budgeting?", options: ["Pianificazione spese e entrate","Investimento obbligazioni","Solo risparmio","Tassazione"], correctOptionIndex: 0 },
    { id: 502, text: "Qual è lo scopo principale di un budget?", options: ["Gestire entrate e uscite","Aumentare debiti","Pagare meno tasse","Acquistare azioni"], correctOptionIndex: 0 },
    { id: 503, text: "Differenza tra spese fisse e variabili?", options: ["Fisse non cambiano, variabili cambiano","Fisse cambiano, variabili fisse","Entrambe uguali","Nessuna differenza"], correctOptionIndex: 0 },
    { id: 504, text: "Percentuale raccomandata per il risparmio mensile?", options: ["10–20%","50%","0%","30–40%"], correctOptionIndex: 0 },
    { id: 505, text: "Cosa si intende per fondo emergenze?", options: ["Coprire spese impreviste","Investire in azioni","Pagare tasse","Acquistare casa"], correctOptionIndex: 0 },

// Lezione 18 - Debito e credito
    { id: 511, text: "Cos'è il debito?", options: ["Somma dovuta a terzi","Somma posseduta","Investimento","Risparmio"], correctOptionIndex: 0 },
    { id: 512, text: "Cos'è il credito?", options: ["Somma che altri ti devono","Debito","Spesa","Capitale investito"], correctOptionIndex: 0 },
    { id: 513, text: "Qual è il tasso d'interesse?", options: ["Costo del denaro preso in prestito","Importo totale del debito","Somma risparmiata","Patrimonio netto"], correctOptionIndex: 0 },
    { id: 514, text: "Che cos'è un prestito personale?", options: ["Debito per esigenze private","Investimento azionario","Fondo emergenze","Patrimonio netto"], correctOptionIndex: 0 },
    { id: 515, text: "Il debito può essere buono o cattivo?", options: ["Sì, a seconda dell'uso","No, è sempre negativo","Solo cattivo","Solo buono"], correctOptionIndex: 0 },

// Lezione 19 - ETF avanzati
    { id: 521, text: "Cos'è un ETF?", options: ["Fondo negoziato in borsa","Titolo azionario singolo","Obbligazione","Criptovaluta"], correctOptionIndex: 0 },
    { id: 522, text: "Vantaggio principale di un ETF?", options: ["Diversificazione rapida","Rendimento garantito","Rischio zero","Alta liquidità"], correctOptionIndex: 0 },
    { id: 523, text: "ETF settoriali investono in?", options: ["Un settore specifico","Tutte le azioni del mondo","Solo obbligazioni","Criptovalute"], correctOptionIndex: 0 },
    { id: 524, text: "ETF a gestione passiva?", options: ["Seguono un indice di mercato","Gestione attiva del portafoglio","Investimenti in immobili","Solo obbligazioni"], correctOptionIndex: 0 },
    { id: 525, text: "ETF a gestione attiva?", options: ["Gestione manageriale per battere l'indice","Seguono un indice","Solo obbligazioni","Criptovalute"], correctOptionIndex: 0 },

// Lezione 20 - Criptovalute e nuovi strumenti
    { id: 531, text: "Cos'è una criptovaluta?", options: ["Valuta digitale decentralizzata","Moneta fisica","Titolo azionario","Obbligazione"], correctOptionIndex: 0 },
    { id: 532, text: "Bitcoin è un esempio di?", options: ["Criptovaluta","ETF","Azioni","Obbligazioni"], correctOptionIndex: 0 },
    { id: 533, text: "Blockchain serve per?", options: ["Registrare transazioni in modo sicuro","Investire in borsa","Calcolare interessi","Creare contabilità"], correctOptionIndex: 0 },
    { id: 534, text: "Wallet di criptovalute?", options: ["Portafoglio digitale","Conto bancario","Obbligazione","ETF"], correctOptionIndex: 0 },
    { id: 535, text: "ICO significa?", options: ["Initial Coin Offering","Investment Certificate Option","Indice di Credito Obbligazionario","Altro"], correctOptionIndex: 0 },
];


export function getQuestionsFromLesson(lesson: Lesson): Question[] {
    return domande.filter(q => lesson.questionIds.includes(q.id));
}




// ---------------- Cartelle e articoli ------------------------ //


const articoli: Articolo[] = [
    { id: 1, title: 'Domanda e Offerta', content: 'La legge della domanda e dell’offerta descrive come i prezzi si determinano nei mercati.' },
    { id: 2, title: 'Inflazione e Deflazione', content: 'L’inflazione indica un aumento generale dei prezzi, la deflazione una loro diminuzione.' },
    { id: 3, title: 'PIL e Indicatori Economici', content: 'Il PIL misura la ricchezza prodotta in un paese. Altri indicatori includono disoccupazione e tassi di interesse.' },

    { id: 4, title: 'Bilancio Familiare', content: 'Il bilancio familiare permette di pianificare entrate e uscite e risparmiare efficacemente.' },
    { id: 5, title: 'Investimenti Base', content: 'Azioni, obbligazioni e fondi comuni sono strumenti per investire denaro.' },
    { id: 6, title: 'Piani di Risparmio e Pensione', content: 'Risparmiare regolarmente e pianificare la pensione aiuta a garantire sicurezza finanziaria a lungo termine.' },

    { id: 7, title: 'Borsa e Titoli', content: 'La borsa è un mercato regolamentato dove si comprano e vendono azioni, obbligazioni e altri strumenti finanziari.' },
    { id: 8, title: 'Forex e Valute', content: 'Il mercato Forex è dove si scambiano valute straniere, influenzando commercio e investimenti.' },
    { id: 9, title: 'Criptovalute', content: 'Le criptovalute sono valute digitali decentralizzate, come Bitcoin ed Ethereum.' },

    { id: 10, title: 'Teoria dei Giochi', content: 'La teoria dei giochi studia le strategie ottimali in contesti competitivi e collaborativi.' },
    { id: 11, title: 'Politica Monetaria', content: 'La politica monetaria gestisce l’offerta di moneta e i tassi di interesse per stabilizzare l’economia.' },
    { id: 12, title: 'Analisi Fondamentale e Tecnica', content: 'L’analisi fondamentale valuta i dati economici, l’analisi tecnica studia i grafici dei prezzi.' }
];

const cartelle: Cartella[] = [
    { id: 1, title: 'Fondamenti di Economia', description: 'Concetti base di economia.', articoli: [1, 2, 3] },
    { id: 2, title: 'Finanza Personale', description: 'Gestione del denaro e investimenti.', articoli: [4, 5, 6] },
    { id: 3, title: 'Mercati Finanziari', description: 'Comprendere i mercati e strumenti finanziari.', articoli: [7, 8, 9] },
    { id: 4, title: 'Economia Avanzata', description: 'Argomenti avanzati di economia e finanza.', articoli: [10, 11, 12] }
];


export function getCartelle() : Cartella[] {
    return cartelle;
}


export function getArticoliFromCartella(cartella: Cartella): Articolo[] {
    return cartella.articoli
        .map(id => articoli.find(a => a.id === id))
        .filter((a): a is Articolo => a !== undefined); // filtra eventuali undefined
}
