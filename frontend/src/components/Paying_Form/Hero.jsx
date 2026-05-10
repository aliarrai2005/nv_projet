import "./Hero.css";

export default function Hero(){
    return (
        <>
        <main style={{width:'100%'}}>
        <div className="paying-form" style={{width:'100%'}} >
            <div className="headline">
                <h3>Informations sur le client</h3>
            </div>
            <div  className="paying-form-first-row"><input type="text" placeholder="*Prénom" /><input type="text" placeholder="*Nom" /></div>
            <div className="paying-form-second-row"><input type="text" placeholder="email" /><input type="text" /></div>
            <h5>
            Vos données personnelles seront utilisées pour le traitement de votre commande, vous accompagner au cours de votre visite du site web, et pour d’autres raisons décrites dans notre privacy policy.
            </h5>
            <br />
            <br />
            <a href="#">
                <div className="confirm-button" style={{height:'70px',alignContent:"center"}}>
                    <h3>
                        Réservez dès maintenant ?
                    </h3>
                </div>
            </a>
        </div>  
        </main>
    </>
    )
}