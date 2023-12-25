import {createRoot} from 'react-dom/client';

import App from './components/App';
import {GameProvider} from './hooks/useGame';

import './styles/index.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <GameProvider>
    <App />
  </GameProvider>
);
