import { RelayEnvironmentProvider } from 'react-relay';
import { environment } from './relay';
import Home from './Home';
import './style.css';

export function App() {
	return (
		<RelayEnvironmentProvider environment={environment}>
			<Home />
		</RelayEnvironmentProvider>
	);
}
