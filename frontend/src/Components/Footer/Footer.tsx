import classes from './Footer.module.css';
import joelLogo from '../../img/joel.svg';
import emailLogo from '../../img/email.svg';
import {ALT_JOEL_LOGO, JOEL_URL, ALT_EMAIL_LOGO} from '../../constants';

const FooterComponent = () => (
  <footer className={classes.footer}>
    <div className={classes.applicationInfo}>
      <span className={classes.infoItem}>
        Johannes Ehm
      </span>
      <wbr />
      <a href={JOEL_URL}
        target="_blank"
        className={classes.logo}
        rel="noreferrer">
        <img src={joelLogo}
          alt={ALT_JOEL_LOGO}
          className={classes.logoImage} />
      </a>
      <wbr />
      <span className={classes.infoItem}>
        <a href="mailto:johannes.ehm@gmail.com" className={classes.logo}>
          <img src={emailLogo}
            alt={ALT_EMAIL_LOGO}
            className={classes.footerImage} />
        </a>
      </span>
    </div>
  </footer>
)

export const Footer = FooterComponent;
