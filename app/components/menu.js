import React, { Component } from 'react';

import {
  AppRegistry,
  Picker,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import ModalSelector from 'react-native-modal-selector'

let index = 0;
const data = [
    { key: index++, section: true, label: 'Fruits' },
    { key: index++, label: 'Red Apples' },
    { key: index++, label: 'Cherries' },
    { key: index++, label: 'Cranberries' },
    // etc...
    // Can also add additional custom keys which are passed to the onChange callback
    { key: index++, label: 'Vegetable', customKey: 'Not a fruit' }
];

export default class Menu extends Component {
  render() {
    return (
      <View style={styles.menuContainer}>
        <View>
          <Text style={styles.labelText}>Board Type</Text>
            <ModalSelector
              data={this.props.diceOptions}
              initValue="Classic 4x4"
              onChange={this.props.changeDiceSet} 
              selectStyle={styles.selectorStyle}
              selectTextStyle={styles.selectorText}
            />

        </View>
        <View>
          <Text style={styles.labelText}>Timer</Text>
          <ModalSelector
              data={this.props.timerOptions}
              initValue="1M 30S"
              onChange={this.props.changeTimerLength} 
              selectStyle={styles.selectorStyle}
              selectTextStyle={styles.selectorText}
            />
        </View>
        <View>
          <Text style={styles.labelText}>Hide After Shuffle</Text>
          <TouchableOpacity onPress={this.props.toggleHideAfterShuffle}>
            <View style={styles.selectorStyle}>
              <Text style={styles.selectorText}>{this.props.hideAfterShuffle ? 'Yes' : 'No'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.bragText}>Designed & Coded by Al Grant</Text>
        </View>
      </View>
    );
  }
}
          // <Picker style={styles.selectorStyle}>
          //   <Text style={styles.selectorText}>Classic 4x4</Text>
          //   <View style={styles.downTriangle} />
          // </Picker> 
// <View>
//   <Text style={styles.labelText}>Exit</Text>
//   <View style={styles.selectorStyle}>
//     <Text style={styles.selectorText}>Close Game</Text>
//   </View>
// </View>

const styles = StyleSheet.create({
  menuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(178, 191, 204)',
    padding:10,
    justifyContent: 'space-between',
  },
  labelText: {
    paddingHorizontal: 15,
    fontFamily:'Digitalt',
    fontSize: 30,
    fontWeight: 'bold',
    color:'rgb(11, 42, 77)',
    // backgroundColor: 'rgb(11, 42, 77)'
  },
  selectorStyle: {
    marginTop: 5,
    backgroundColor: 'rgb(36, 83, 140)',
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 2,
    paddingBottom:0,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectorText: {
    fontFamily:'Digitalt',
    fontSize: 35,
    fontWeight: 'bold',
    color:'rgb(255, 255, 255)',
  },
  bragText: {
    paddingHorizontal: 15,
    fontFamily:'Digitalt',
    fontSize: 20,
    fontWeight: 'bold',
    color:'rgb(255, 255, 255)',
    // alignSelf: 'center',
  },
  downTriangle: {
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 0,
    borderLeftWidth: 10,
    borderTopColor: '#fff',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent', 
  }
});

AppRegistry.registerComponent('Menu', () => Menu);
