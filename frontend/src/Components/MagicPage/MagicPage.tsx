import { ElementVote, WebSocketApi } from '../../types/WebSocket';
import { connectToWebSocket } from '../WebSocket/WebSocket';
import classes from './MagicPage.module.css'
import sharedClasses from '../../styles.module.css'
import { MagicPageElements } from './MagicPageElements';
import { MagicPageNoElements } from './MagicPageNoElements';


const ProtoMagicPage = ({socket}: {socket: WebSocketApi}) => {
    let newElement = '';

    return (
        <div class={classes.magicPage}>
            <div class={classes.magicPageElements}>
                {getNumberOfElements(socket.state.elementVotes) > 0 
                    ? <MagicPageElements />
                    : <MagicPageNoElements />
                }
            </div>
            <div class={classes.magicPageAddElements}>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    socket.addElement(newElement);
                }} class={classes.magicPageAddElementsForm}>
                    <input id="newElement" type="text" class={sharedClasses.text} value={newElement} onInput={(event) => newElement = ((event.target as HTMLInputElement).value)} />
                    <button class={sharedClasses.button} style="margin-left: 1.5rem; padding: 0 1.0rem 0 1.0rem">Add element</button>
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
    )
};

const getNumberOfElements = (elementVotes: Array<ElementVote>): number =>
    Object.values(elementVotes).reduce((count, elementVotes) => count + 1, 0);

export const MagicPage = connectToWebSocket(ProtoMagicPage);