import type {ReactElement} from "react";
import type {Articolo as ArticoloType} from '../../../model/model';

interface ArticoloProps{
    articolo : ArticoloType;
    setArticoloSelezionato : (articolo : ArticoloType | null) => null;
}
function Articolo({articolo, setArticoloSelezionato} : ArticoloProps): ReactElement {

    return (
        <>
            <h1>Pagina Articolo</h1>
        </>
    );
}

export default Articolo;
