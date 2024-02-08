import autoImg from './ImageAuto.gif';
import './Header.css';

export default function Home() {
    return (
        <div>
            <p className="header-p">
                This website is to add your vehicle details.
            </p>
           <img className="header-img" src={autoImg} alt="auto description" />
        </div>
    )
}
