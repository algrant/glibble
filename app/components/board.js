import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

// viewBox="0 0 431 431" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"
export default class Board extends Component {

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props.board) !== JSON.stringify(nextProps.board);
  }

  render() {
    let board = this.props.board;
    if (!board) {
      board = [[' ',' ',' ',' ',' '],['G', 'L', 'I', ' ', ' '],[' ',' ','B',' ',' '],[' ',' ','B','L','E'],[' ',' ',' ',' ',' ']]
    }
    return (
      <View style={styles.midSquare}>
        {board.map((row, ir) => (
          <View key={row.join('')+ir} style={[styles.row, {height: `${100/row.length-1}%`}]}>
            {row.map((c, i) => (<View style={[styles.tile, {width: `${100/row.length-1}%`, borderRadius: 100/row.length, transform: [{rotate:`${Math.floor(Math.random()*4)*90}deg`}]}]} key={c+i}>
                        <View colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.innerTile}>
                          <Text style={[styles.tileText, {fontSize: 200/row.length, textDecorationLine: ['Z', 'N', 'M', 'W'].indexOf(c) !== -1 ? 'underline' : 'none'}]}>{c}</Text>
                        </View>
                      </View>))}
          </View>
          ))}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  midSquare: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // margin: 5,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tile: {
    height: '100%',
    backgroundColor: 'beige',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerTile: {
    backgroundColor: 'white',
    borderRadius: 100000,
    width: '95%',
    height: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileText: {
    fontSize: 40,
    fontWeight: 'bold',
    color:'#3396E6',
    backgroundColor: 'rgba(52, 52, 52, 0.0)'
  }
});

AppRegistry.registerComponent('Board', () => Board);
