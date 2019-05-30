// Import the screens
import Home from './components/Home';
import Chat from './components/Chat';
import React, { Component } from 'react';
// Import React Navigation
import { createStackNavigator,createAppContainer } from 'react-navigation'

// Create the navigator
const AppStackNavigator = createStackNavigator({
  Home: Home ,
  Chat:Chat ,
});

//disable yelllow box
console.disableYellowBox = true;

class Navigator extends React.Component {
  render() {
    return (
     
     <AppStackNavigator/>
    );
  }
}

const AppContainer = createAppContainer(AppStackNavigator)
export default AppContainer;