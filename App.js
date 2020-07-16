import React from 'react';
import {Provider} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { navigationRef } from './components/rootnavigations';
import ApplicationNavigation from './components/appnavigation'
import Store from './redux/store'


export default function App() {
  return (
    <Provider store={Store}>
        <NavigationContainer ref={navigationRef}></NavigationContainer>
        <ApplicationNavigation />
    </Provider>
  );
}

