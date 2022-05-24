import classes from './App.module.css';
import {PageSelector} from './PageSelector';
import {WebSocketProvider} from './WebSocket/WebSocket';

export const App = () => (
  <div className={classes.app}>
    <WebSocketProvider>
      <PageSelector />
    </WebSocketProvider>
  </div>
);
