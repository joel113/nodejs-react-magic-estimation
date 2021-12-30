import classes from './Footer.module.css';
import { LABEL_SESSION, LABEL_USERNAME } from '../constants';
import joelLogo from '../img/joel.svg';
import { ALT_JOEL_LOGO, JOEL_URL } from '../constants';

const ProtoLoginInfo = () => (
  <footer class={classes.footer}>
    <div class={classes.sessionInfo}>
      <a href={JOEL_URL} target="_blank" class={classes.logo}>
        <img src={joelLogo} alt={ALT_JOEL_LOGO} class={classes.logoImage} />
      </a>
      <wbr />
      <span class={classes.infoItem}>
        Johannes Ehm
      </span>
      <wbr />
      <span class={classes.infoItem}>
        <a href="mailto:johannes.ehm@gmail.com">johannes.ehm@gmail.com</a>
      </span>
    </div>
  </footer>
)

export const Footer = ProtoLoginInfo;
