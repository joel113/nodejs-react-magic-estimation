import classes from './MagicPage.module.css'
import infoLogo from '../../img/info.svg';
import upLogo from '../../img/up.svg';
import downLogo from '../../img/down.svg';
import trashLogo from '../../img/trash.svg';
import { ALT_INFO_LOGO, ALT_UP_LOGO, ALT_DOWN_LOGO, ALT_TRASH_LOGO } from '../../constants';

export const MagicPageElements = () => (
    <table class={classes.magicPageElementsTable}>
        <tr class={classes.magicPageElementsTableRowHeader}>
            <th class={classes.elementColumn}>Element</th>
            <th>Votes</th>
            <th>Upvote</th>
            <th>Downvote</th>
            <th>Remove</th>
        </tr>
        <tr>
            <td>Element 1</td>
            <td>2</td>
            <td><a href=""><img src={upLogo} alt={ALT_UP_LOGO} class={classes.logoImage} /></a></td>
            <td><a href=""><img src={downLogo} alt={ALT_DOWN_LOGO} class={classes.logoImage} /></a></td>
            <td><a href=""><img src={trashLogo} alt={ALT_TRASH_LOGO} class={classes.logoImage} /></a></td>
        </tr>
    </table>
);