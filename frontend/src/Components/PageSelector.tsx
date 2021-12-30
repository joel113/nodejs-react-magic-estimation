import { WebSocketApi } from '../types/WebSocket';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { LoginPage } from './LoginPage/LoginPage';
import { MagicPage } from './MagicPage/MagicPage';
import { connectToWebSocket } from './WebSocket/WebSocket';
import classes from './PageSelector.module.css';

const ProtoPageSelector = ({socket} : { socket: WebSocketApi}) => {
    if(!socket.loginData.user || !socket.loggedIn) {
        <LoginPage />
    }
    return (
        <div class={classes.PageSelector}>
            <Header />
            <MagicPage />
            <Footer />
        </div>
    )
};

export const PageSelector = ProtoPageSelector;
