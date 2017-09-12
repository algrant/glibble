import React, { Component } from 'react';

import Svg,{
  G,
  Text,
} from 'react-native-svg';

import {
  AppRegistry,
} from 'react-native';
// viewBox="0 0 431 431" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"
export default class GlibbleTitle extends Component {
  render() {
    const newHeight = this.props.height;
    const scale = newHeight/26;
    const height = 26*scale;
    const width = 123*scale;
    const fontSize = 40*scale;
    const x = 60*scale;
    const y = -19*scale;

    return (
      <Svg
        height={height}
        width={width}
      >
        <Text
          fill="rgb(56, 182, 255)"
          stroke="white"
          fontSize={fontSize}
          fontWeight="bold"
          fontFamily='Digitalt'
          x={x}
          y={y}
          textAnchor="middle"
        >Glibble</Text>
      </Svg>
    );
  }
}

AppRegistry.registerComponent('GlibbleTitle', () => GlibbleTitle);


