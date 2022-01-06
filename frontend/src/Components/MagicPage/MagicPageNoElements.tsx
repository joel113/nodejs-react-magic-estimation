import classes from './MagicPage.module.css'
import infoLogo from '../../img/info.svg';
import upLogo from '../../img/up.svg';
import downLogo from '../../img/down.svg';
import trashLogo from '../../img/trash.svg';
import { ALT_INFO_LOGO, ALT_UP_LOGO, ALT_DOWN_LOGO, ALT_TRASH_LOGO } from '../../constants';

export const MagicPageNoElements = () => (
    <table class={classes.magicPageElementsTable}>
        <tr>
            <td class={classes.empty}>
                <img src={infoLogo} alt={ALT_INFO_LOGO} class={classes.logoImage} />No elements so far
            </td>
        </tr>
    </table>
);