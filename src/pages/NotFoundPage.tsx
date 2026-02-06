
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import spacemanImage from '../assets/falling-spaceman.png';
import './NotFoundPage.css';

export const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <div className="not-found-container">
                <div className="not-found-content">
                    <h1 className="not-found-title">404</h1>
                    <h2 className="not-found-subtitle">Lost in Space</h2>
                    <p className="not-found-text">
                        The page you are looking for has drifted into the void.
                        Let's get you back to solid ground.
                    </p>
                    <div className="not-found-actions">
                        <Link to="/" className="not-found-btn primary">
                            <Home size={20} />
                            Return Home
                        </Link>
                        <button onClick={() => window.history.back()} className="not-found-btn secondary">
                            <ArrowLeft size={20} />
                            Go Back
                        </button>
                    </div>
                </div>
                <div className="not-found-image-container">
                    <img
                        src={spacemanImage}
                        alt="Falling Spaceman"
                        className="not-found-image falling-spaceman"
                    />
                    <div className="image-glow"></div>
                </div>
            </div>
            <div className="not-found-bg">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
            </div>
        </div>
    );
};
