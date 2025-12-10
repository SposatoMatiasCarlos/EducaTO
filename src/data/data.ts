import type {Question, User, Lesson, Percorso, Cartella} from '../model/model.ts';



// ----------------------- Utenti --------------------- //

export function isPercorsoCompletato(utente : User, percorso : Percorso) {
    if (!utente || !utente.completedLessons) return false;

    return percorso.lessons.every(idLezione =>
        utente.completedLessons.includes(idLezione)
    );
}



export function aggiornaLezioniSuperateUtente(utente: User, lessonId: number): void {
    if (!utente.completedLessons.includes(lessonId)) {
        utente.completedLessons.push(lessonId);
    }
}

export function aggiungiPuntiLezioneUtente(utente: User, punti: number): void {
    utente.points += punti;
}

export function impostaNuovoAvatarUtente(utente : User, newindex: number) : void{
    utente.avatarId = newindex;
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





// ---------------- Cartelle e articoli ------------------------ //








