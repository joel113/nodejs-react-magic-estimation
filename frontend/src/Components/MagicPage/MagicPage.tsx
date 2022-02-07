import { useEffect, useRef, useState } from 'preact/hooks';
import { ElementVote, WebSocketApi } from '../../types/WebSocket';
import { connectToWebSocket } from '../WebSocket/WebSocket';
import classes from './MagicPage.module.css'
import sharedClasses from '../../styles.module.css'
import { MagicPageSomeElements } from './MagicPageSomeElements';
import { MagicPageNoElements } from './MagicPageNoElements';
import { MagicPageSomeVotes } from './MagicPageSomeVotes';
import { MagicPageNoVotes } from './MagicPageNoVotes';
import { MagicPageRounds } from './MagicPageRounds';

/*
* Basic Magic Page
*
* https://stackoverflow.com/questions/21552402/javascript-array-length-returns-undefined
* https://stackoverflow.com/questions/6120931/how-to-count-certain-elements-in-array
*/
const ProtoMagicPage = ({ socket }: { socket: WebSocketApi }) => {
    let newElement = '';
    return (
        <div class={classes.magicPage}>
            <div class={classes.magicPageElements}>
                {Object.keys(socket.state.elementVotes).length > 0
                    ? <MagicPageSomeElements />
                    : <MagicPageNoElements />
                }
            </div>
            <div class={classes.magicPageAddElements}>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    socket.addElement(newElement);
                }} class={classes.magicPageAddElementsForm}>
                    <input id="newElement" type="text" class={sharedClasses.text} value={newElement}
                        autocomplete="off"
                        onInput={(event) => newElement = ((event.target as HTMLInputElement).value)} />
                    <input id="submit" type="submit" class={sharedClasses.button} value="Add"
                        style="margin-left: 1.5rem; padding: 0 1.0rem 0 1.0rem" />
                </form>
            </div>
            <div class={classes.magicPageRounds}>
                <MagicPageRounds />
            </div>
            <div class={classes.magicPageUsers}>
                {Object.keys(socket.state.userVotes).length > 0
                    ? <MagicPageSomeVotes />
                    : <MagicPageNoVotes />
                }
            </div>
            <div class={classes.magicPageAddElements}>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    socket.clearVotes();
                }} class={classes.magicPageAddElementsForm}>
                    <input id="submit" type="submit" class={sharedClasses.button} value="Reset"
                        style="margin-left: 1.5rem; padding: 0 1.0rem 0 1.0rem" />
                </form>
            </div>
        </div>
    )
};

export const MagicPage = connectToWebSocket(ProtoMagicPage);