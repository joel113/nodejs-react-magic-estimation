import classes from './Footer.module.css';
import { LABEL_SESSION, LABEL_USERNAME } from '../constants';

export const ProtoLoginInfo = 
  <footer class={classes.footer}>
    <div class={classes.sessionInfo}>
      <span class={classes.infoItem}>
        Johannes
      </span>
      <wbr />
      <span class={classes.infoItem}>
        Ehm
      </span>
    </div>
  </footer>

export const Footer = ProtoLoginInfo;
