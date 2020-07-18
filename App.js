import React  , {useState}  from 'react';
import {Provider} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import { navigationRef } from './components/rootnavigations';
import ApplicationNavigation from './components/appnavigation'
import Store from './redux/store'


export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  const getFonts = () => {
      Font.loadAsync({
        'RobotoSlab-Regular': require('./assets/fonts/RobotoSlab-Regular.ttf'),
        'Rowdies-Regular': require('./assets/fonts/Rowdies-Regular.ttf'),
        'Yantramanav-Regular': require('./assets/fonts/Yantramanav-Regular.ttf'),
  })};


  if (fontsLoaded) {
    return (
      <Provider store={Store}>
          <NavigationContainer ref={navigationRef}></NavigationContainer>
          <ApplicationNavigation />
      </Provider>
    );
  } else {
    return (
      <AppLoading 
        startAsync={getFonts} 
        onFinish={() => setFontsLoaded(true)} 
      />
    )
  }
}

