import React from 'react';
import { devtools } from 'valtio/utils';

import Pages from './Pages';
import { state } from './store';
import './index.css';

devtools(state, 'app state');
const App: React.FC = () => <Pages />;

export default App;
