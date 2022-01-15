import { useEffect, useRef, useState } from 'preact/hooks';
import { ElementVote, WebSocketApi } from '../../types/WebSocket';
import { connectToWebSocket } from '../WebSocket/WebSocket';
import classes from './MagicPage.module.css'
import sharedClasses from '../../styles.module.css'
import { MagicPageElements } from './MagicPageElements';
import { MagicPageNoElements } from './MagicPageNoElements';

/*
* Basic Magic Page
*
* https://stackoverflow.com/questions/21552402/javascript-array-length-returns-undefined
* https://stackoverflow.com/questions/6120931/how-to-count-certain-elements-in-array
*/
const ProtoMagicPage = ({socket}: {socket: WebSocketApi}) => {
    let newElement = '';
    return (
        <div class={classes.magicPage}>
            <div class={classes.magicPageElements}>
                {Object.keys(socket.state.elementVotes).length > 0 
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
                    <input id="submit" type="submit" class={sharedClasses.button} value="Add" style="margin-left: 1.5rem; padding: 0 1.0rem 0 1.0rem" />
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

export const MagicPage = connectToWebSocket(ProtoMagicPage);