import {renderToString} from 'preact-render-to-string';
import {App} from './components/App';

/**
 * Server side rendering of the application
 * @return {string} server side rendering
 */
export function render() {
  return renderToString(<App />);
}
