import classes from './MagicPage.module.css'
import infoLogo from '../../img/info.svg';
import { ALT_INFO_LOGO } from '../../constants';

export const MagicPageNoVotes = () => {
    return (
        <table class={classes.magicPageElementsTable}>
            <tr>
                <td class={classes.empty}>
                    <img src={infoLogo} alt={ALT_INFO_LOGO} class={classes.logoImage} />No elements so far
                </td>
            </tr>
        </table>
    )
};