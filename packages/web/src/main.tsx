import { App } from './App';
import ReactDOM from 'react-dom';

const rootElement = document.getElementById('root');

if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(<App />);
} else {
	throw new Error('Root element not found. Unable to render the App.');
}
