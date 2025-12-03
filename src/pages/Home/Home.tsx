import './Home.css';
import illustrazione1 from '../../assets/illustrazione1.mp4';
import illustrazione2 from '../../assets/illustrazione2.mp4';


function Home() {
    return (
        <>


            <div className="home-header align-items-center justify-content-center text-center">


                <div className="row align-items-center justify-content-center w-100">

                    {/* Colonna titolo */}
                    <div className="col-auto">
                        <h1 className="display-2 titolo">Benvenuto in EducaTO!</h1>
                    </div>


                    {/* Colonna video */}
                    <div className="col-auto">
                        <video
                            src={illustrazione1}
                            autoPlay
                            loop
                            muted
                            style={{
                                width: '500px',
                                maxWidth: '80vw',
                                height: 'auto',
                                borderRadius: '8px'
                            }}
                        >
                            Il tuo browser non supporta il tag video.
                        </video>
                    </div>
                </div>
            </div>


            <div className="row sezione" style={{marginTop: '150px'}}>


                <div className="col-4">

                    <video
                        src={illustrazione2}
                        autoPlay
                        loop
                        muted
                        style={{
                            width: '400px',
                            maxWidth: '100%',
                            height: 'auto',
                            borderRadius: '8px'
                        }}
                    />
                </div>


                <div className="col-5">

                    <h2 className="titolo-sezione">Analfabetizzazione finanziaria in Italia</h2>
                    <p className="lh-lg" style={{textAlign: 'justify'}}>
                        L’Italia, come emerge da diverse indagini condotte sul tema, è un Paese con un basso
                        livello di
                        alfabetizzazione finanziaria, non adeguato alla complessità delle scelte da effettuare
                        nel
                        quotidiano e durante tutto l’arco della vita. Gli enormi cambiamenti che stanno
                        avvenendo in
                        tutti i paesi e, in particolare nei paesi sviluppati, non hanno una natura temporanea,
                        sono
                        strutturali e duraturi e hanno profonde ripercussioni sull’economia e sulle piccole e
                        grandi
                        decisioni che ciascun cittadino è chiamato a compiere nel corso della vita, rendono
                        indispensabile che gli individui, giovani e adulti, abbiano un insieme di conoscenze e
                        competenze finanziarie diverse rispetto al passato.
                    </p>
                </div>


            </div>


        </>
    )
        ;
}

export default Home;