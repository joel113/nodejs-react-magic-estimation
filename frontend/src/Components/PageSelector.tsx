import { Footer } from './Footer';
import { Header } from './Header';
import { LoginPage } from './LoginPage/LoginPage';
import { MagicPage } from './MagicPage/MagicPage';
import classes from './PageSelector.module.css';

const ProtoPageSelector = () => {
    //if(!LoginPage) {
    //    <LoginPage />
    //}
    return (
        <div class={classes.PageSelector}>
        <Header />
        <MagicPage />
        <Footer />
        </div>
    )
};

export const PageSelector = ProtoPageSelector;
