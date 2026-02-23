import TextPressure from "../../ThirdPartyComponents/TextPressure/TextPressure";
import profilo0 from '../../../assets/temp.jpg';
import profilo1 from '../../../assets/profilo1.png';
import profilo2 from '../../../assets/profilo2.png';
import profilo3 from '../../../assets/profilo3.png';

import './Navbar.css'
import BubbleMenu from "../../ThirdPartyComponents/BubbleMenu/BubbleMenu.tsx";
import {UserContext} from '../../../UserContext.ts';
import {type ReactElement, useContext} from "react";


interface NavbarProps {
    setPage: (page: string) => void;
    onLogout: () => void;
}

const avatarOptions = [profilo0, profilo1, profilo2, profilo3];


function Navbar({setPage, onLogout}: NavbarProps): ReactElement {

    const {user} = useContext(UserContext);

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
            ariaLabel: 'Quiz',
            rotation: 0,
            hoverStyles: {bgColor: '#10b981', textColor: '#ffffff'},
            onClick: ()=> setPage("Quiz")
        },
        {
            label: 'Impara',
            ariaLabel: 'Impara',
            rotation: 8,
            hoverStyles: {bgColor: '#f59e0b', textColor: '#ffffff'},
            onClick: ()=> setPage("Learn")
        },
        {
            label: 'Classifica',
            ariaLabel: 'Classifica',
            rotation: 0,
            hoverStyles: {bgColor: '#c607c6', textColor: '#ffffff'},
            onClick: ()=> setPage("Classifica")
        }
    ];


    if (user != null && user.ruolo === "admin") {
        items.push({
            label: 'Admin',
            ariaLabel: 'Admin',
            rotation: 0,
            hoverStyles: { bgColor: '#de0101', textColor: '#ffffff' },
            onClick: () => setPage("Admin")
        });
    }


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
                {user ? (
                    <div className="d-flex align-items-center gap-2">

                        <button
                            className="btn-logout"
                            title="Logout"
                            onClick={onLogout}
                        >
                            Logout
                        </button>



                        <div className="me-2 user-panel user-overview" onClick={() => setPage("Profilo")}>
                            <div>
                                <span className="fw-bold text-black">{user.username}</span>
                                <span className="text-danger fw-bold">{user.badge}</span>
                                <span className="fw-bold">{user.points}</span>
                            </div>

                            <div>
                                <img
                                    src={avatarOptions[user.avatarId]}
                                    alt="Profilo"
                                    className="rounded-circle user-avatar"
                                />
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        className="btn btn-success"
                        onClick={() => setPage("Login")}
                    >
                        Accedi
                    </button>
                )}


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