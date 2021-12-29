import tngLogo from '../img/joel.svg';
import classes from './Header.module.css';
import { ALT_JOEL_LOGO, JOEL_URL } from '../constants';

export const Header = () => (
  <header class={classes.header}>
    NodeJs&nbsp;React Magic&nbsp;Estimation
    <a href={JOEL_URL} target="_blank" class={classes.logo}>
      <img src={tngLogo} alt={ALT_JOEL_LOGO} class={classes.logoImage} />
    </a>
  </header>
);
