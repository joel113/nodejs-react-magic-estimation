import classes from './MagicPage.module.css'
import infoLogo from '../../img/info.svg';
import {ALT_INFO_LOGO} from '../../constants';

export const MagicPageNoElements = () => {
  return (
    <table className={classes.magicPageElementsTable}>
      <tr>
        <td className={classes.empty}>
          <img src={infoLogo}
            alt={ALT_INFO_LOGO}
            className={classes.logoImage} />
          No elements so far
        </td>
      </tr>
    </table>
  )
};
