import type {User, Lesson, Percorso} from '../model/model.ts';


// ----------------------- Utenti --------------------- //

export function isPercorsoCompletato(utente : User, percorso : Percorso) {
    if (!utente || !utente.completedLessons) return false;

    return percorso.lessons.every(idLezione =>
        utente.completedLessons.includes(idLezione)
    );
}

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

export function shuffleArray<T>(array: T[]): T[] {
    const copy = [...array]; // non modificare l'array originale
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]]; // swap
    }
    return copy;
}








