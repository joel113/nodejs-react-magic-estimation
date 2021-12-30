import classes from './MagicPage.module.css'
import infoLogo from '../../img/info.svg';
import upLogo from '../../img/up.svg';
import downLogo from '../../img/down.svg';
import trashLogo from '../../img/trash.svg';
import { ALT_INFO_LOGO, ALT_UP_LOGO, ALT_DOWN_LOGO, ALT_TRASH_LOGO } from '../../constants';

const ProtoMagicPage = () => (
    <div class={classes.magicPage}>
        <div class={classes.magicPageElements}>
            <table class={classes.magicPageElementsTable}>
                <tr>
                    <td class={classes.empty}>
                        <img src={infoLogo} alt={ALT_INFO_LOGO} class={classes.logoImage} />No elements so far
                    </td>
                </tr>
            </table>
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
        </div>
        <div class={classes.magicPageAddElements}>
            <form onSubmit={() => {
                // implement
            }} class={classes.magicPageAddElementsForm}>
                <input id="newElement" type="text" class="sharedClasses.text" />
                <button class="sharedClasses.button" style="margin-left: 1.5rem; padding: 0 1.0rem 0 1.0rem">Add element</button>
            </form>
        </div>
        <div class={classes.magicPageUsers}>
            <table class={classes.magicPageElementsTable}>
                <tr class={classes.magicPageElementsTableRowHeader}>
                    <th class={classes.elementColumn}>User</th>
                    <th>Votes</th>
                </tr>
                <tr>
                    <td>Element 1</td>
                    <td>2</td>
                </tr>
            </table>
        </div>
    </div>
);

export const MagicPage = ProtoMagicPage;