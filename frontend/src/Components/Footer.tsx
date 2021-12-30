import classes from './Footer.module.css';
import { LABEL_SESSION, LABEL_USERNAME } from '../constants';
import joelLogo from '../img/joel.svg';
import emailLogo from '../img/email.svg';
import { ALT_JOEL_LOGO, JOEL_URL, ALT_EMAIL_LOGO } from '../constants';

const ProtoLoginInfo = () => (
  <footer class={classes.footer}>
    <div class={classes.sessionInfo}>
      <span class={classes.infoItem}>
        Johannes Ehm
      </span>
      <wbr />
      <a href={JOEL_URL} target="_blank" class={classes.logo}>
        <img src={joelLogo} alt={ALT_JOEL_LOGO} class={classes.logoImage} />
      </a>
      <wbr />
      <span class={classes.infoItem}>
        <a href="mailto:johannes.ehm@gmail.com" class={classes.logo}>
          <img src={emailLogo} alt={ALT_EMAIL_LOGO} class={classes.footerImage} />
        </a>
      </span>
    </div>
  </footer>
)

export const Footer = ProtoLoginInfo;
