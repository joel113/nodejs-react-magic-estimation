import renderToString from 'preact-render-to-string';
import { App } from './components/App';

export function render() {
  return renderToString(<App />);
}
