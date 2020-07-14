import React from 'react';
import {Provider} from 'react-redux';

import ApplicationNavigation from './components/appnavigation'
import Store from './redux/store'

export default function App() {
  return (
    <Provider store={Store}>
        <ApplicationNavigation />
    </Provider>
  );
}

