import classes from './MagicPage.module.css'
import infoLogo from '../../img/info.svg';
import { ALT_INFO_LOGO } from '../../constants';

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
                    <th>Element</th>
                    <th>Votes</th>
                    <th>Upvote</th>
                    <th>Downvote</th>
                    <th>Remove</th>
                </tr>
                <tr>
                    <td>Element 1</td>
                    <td>2</td>
                    <td>Upvote</td>
                    <td>Downvote</td>
                    <td>Remove</td>
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
    </div>
);

export const MagicPage = ProtoMagicPage;