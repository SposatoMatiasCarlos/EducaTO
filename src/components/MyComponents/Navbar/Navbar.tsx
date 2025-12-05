import TextPressure from "../../ThirdPartyComponents/TextPressure/TextPressure";
import profilo0 from '../../../assets/temp.jpg';
import profilo1 from '../../../assets/profilo1.png';
import profilo2 from '../../../assets/profilo2.png';
import profilo3 from '../../../assets/profilo3.png';

import './Navbar.css'
import BubbleMenu from "../../ThirdPartyComponents/BubbleMenu/BubbleMenu.tsx";
import type {User} from '../../../model/model.ts';
import type {ReactElement} from "react";


interface NavbarProps {
    setPage: (page: string) => void;
    utente: User;
}

const avatarOptions = [profilo0, profilo1, profilo2, profilo3];


function Navbar({setPage, utente}: NavbarProps): ReactElement {

    const items = [
        {
            label: 'Home',
            ariaLabel: 'Home',
            rotation: -8,
            hoverStyles: {bgColor: '#3b82f6', textColor: '#ffffff'},
            onClick: ()=> setPage("Home")
        },
        {
            label: 'Quiz',
            ariaLabel: 'About',
            rotation: 8,
            hoverStyles: {bgColor: '#10b981', textColor: '#ffffff'},
            onClick: ()=> setPage("Quiz")
        },
        {
            label: 'Impara',
            ariaLabel: 'Projects',
            rotation: 8,
            hoverStyles: {bgColor: '#f59e0b', textColor: '#ffffff'},
            onClick: ()=> setPage("Learn")
        },
    ];


    return (
        <div className="navbar navbar-light shadow-sm d-flex sticky-top align-items-center justify-content-between">


                <div onClick={() => setPage("Home")} className="flex w-full p-2 ms-5 ">
                    <div className="relative flex ">
                        <TextPressure
                            text="EducaTO"
                            flex={true}
                            alpha={false}
                            stroke={false}
                            width={true}
                            weight={false}
                            italic={false}
                            textColor="#28a745"
                            minFontSize={70}
                        />
                    </div>
                </div>



            <div className="d-flex align-items-center gap-3 me-3">
                <div className="me-2 user-panel user-overview" onClick={()=>setPage("Profilo")}>
                    {/* Mini pannello overview */}
                    <div>
                        <span className="text-black">{utente.username}</span>
                        <span className="text-danger">{utente.badge}</span>
                        <span>{utente.points}</span>
                    </div>

                    <div>
                        <img
                            src={avatarOptions[utente.avatarId]}
                            alt="Profilo"
                            className="rounded-circle"
                            style={{width: '40px', height: '40px', objectFit: 'cover', border: '2px solid #28a745'}}
                        />
                    </div>
                </div>


                <BubbleMenu
                    logo={<span></span>}
                    items={items}
                    menuAriaLabel="Toggle navigation"
                    menuBg="#ffffff"
                    menuContentColor="#111111"
                    useFixedPosition={false}
                    animationEase="back.out(1.5)"
                    animationDuration={0.5}
                    staggerDelay={0.12}
                />
            </div>

        </div>
    );
}

export default Navbar;