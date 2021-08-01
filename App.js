import React, { Component } from 'react';
import { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Routes from "./src/routes/index"
import SplashScreen from 'react-native-splash-screen';
import { store } from "./src/redux/index"
import { Provider } from 'react-redux'
import { Dpurple, Mpurple } from './src/Constants/index'

class App extends React.Component {
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={store}>
        <StatusBar backgroundColor={Dpurple} />
        <Routes />
      </Provider>
    );
  }
};


export default App;
