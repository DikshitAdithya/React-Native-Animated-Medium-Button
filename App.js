import React, { Component } from 'react';
import { View, Text,StyleSheet} from 'react-native';
import ClapButton from './Components.js/ClapButton';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ClapButton/>
      </View>
    );
  }
}
const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#faa0d1',


  }
})