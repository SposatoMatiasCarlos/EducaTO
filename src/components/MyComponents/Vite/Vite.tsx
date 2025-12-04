import { type ReactElement } from "react";
import './Vite.css';
import vita1 from '../../../assets/vita1.png';
import vita2 from '../../../assets/vita2.png';

interface ViteProps {
    vite: number;      // numero corrente di vite
    maxVite?: number;   // numero massimo di vite (default 3)
}

function Vite({ vite, maxVite = 3 }: ViteProps): ReactElement {


    return (
        <div className="vite-container">
            {Array.from({ length: maxVite }, (_, i) => (
                <img
                    key={i}
                    src={i < vite ? vita1 : vita2}
                    className="vita-icon"
                    alt="vita"
                />
            ))}
        </div>
    );
}

export default Vite;