import React, { Component } from 'react';

import {
  Alert,
  Animated,
  AppRegistry,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import diceSets from './lib/diceSets';
import { genBoard } from './lib/glibble';
import ShuffleIcon from './components/shuffleIcon';
import GlibbleTitle from './components/glibbleTitle';
import Board from './components/board';
import Menu from './components/menu';

const diceSetTitles = Object.keys(diceSets);
const diceSetMenuArray = diceSetTitles.map((x,i)=>({
  key: i, label: x 
}));
const {height: windowHeight, width: windowWidth} = Dimensions.get('window');

const boardHeight = Math.min(windowHeight, windowWidth);
const shuffleTimerHeight = boardHeight/2;
const headerHeight = Math.max(windowHeight, windowWidth) - boardHeight - shuffleTimerHeight;

let index = 0;
const timerArray = [
  {key: index++, label: '15S',    seconds: 15},
  {key: index++, label: '30S',    seconds: 30},
  {key: index++, label: '45S',    seconds: 45},
  {key: index++, label: '1M',     seconds: 60},
  {key: index++, label: '1M 15S', seconds: 75},
  {key: index++, label: '1M 30S', seconds: 90},
  {key: index++, label: '1M 45S', seconds: 105},
  {key: index++, label: '2M',     seconds: 120},
  {key: index++, label: '2M 15S', seconds: 135},
  {key: index++, label: '2M 30S', seconds: 150},
  {key: index++, label: '2M 45S', seconds: 165},
  {key: index++, label: '3M',     seconds: 180},
];
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diceSets: diceSets,
      diceSetTitle: diceSetTitles[2],
      board: genBoard(diceSets[diceSetTitles[0]]),
      boardCoverAnim: new Animated.Value(0),
      boardCoverOpen: false,
      hideAfterShuffle: true,
      menuOpen: false,
      menuOpenAnim: new Animated.Value(0),
      timerLength: 90,
    };
    // this._onSelectGameType = this._onSelectGameType.bind(this);
    this._openMenu = this._openMenu.bind(this);
    this._closeMenu = this._closeMenu.bind(this);
    this._toggleMenu = this._toggleMenu.bind(this);
    this._openCovers = this._openCovers.bind(this);
    this._closeCovers = this._closeCovers.bind(this);
    this._shuffle = this._shuffle.bind(this);
    this._toggleHideAfterShuffle = this._toggleHideAfterShuffle.bind(this);
    this._changeDiceSet = this._changeDiceSet.bind(this);
    this._changeTimerLength = this._changeTimerLength.bind(this);

  }
  
  componentDidMount() {

  }
  
  _openCovers() {
    this.setState({boardCoverOpen: true});
    Animated.timing(                  // Animate over time
      this.state.boardCoverAnim,            // The animated value to drive
      {
        toValue: 1, // Animate to opacity: 1 (opaque)
        duration: 300,               // Make it take a while
      }
    ).start(); 
  }

  _closeCovers() {
    this.setState({boardCoverOpen: false});
    Animated.timing(                  // Animate over time
      this.state.boardCoverAnim,            // The animated value to drive
      {
        toValue: 0, // Animate to opacity: 1 (opaque)
        duration: 300,               // Make it take a while
      }
    ).start(); 
  }

  _shuffle() {
    if (this.state.boardCoverOpen) {
      this.setState({boardCoverOpen: false});
      Animated.timing(                  // Animate over time
        this.state.boardCoverAnim,            // The animated value to drive
        {
          toValue: 0, // Animate to opacity: 1 (opaque)
          duration: 300,               // Make it take a while
        }
      ).start(({finished})=>{
        if (finished) {       
          this.setState({board: genBoard(this.state.diceSets[this.state.diceSetTitle])});
          if (!this.state.hideAfterShuffle) this._openCovers();
        }
      }); 
    }
  }

  _toggleMenu() {
    if (!this.state.menuOpen) {
      this._openMenu()
    } else {
      this._closeMenu()
    }
  }

  _openMenu() {
    this.setState({menuOpen: true});
    Animated.timing(
      this.state.menuOpenAnim,
      {
        toValue: 1, 
        duration: 300,    
      }
    ).start(); 
  }

  _closeMenu() {
    this.setState({menuOpen: false});
    Animated.timing(                  
      this.state.menuOpenAnim,            
      {
        toValue: 0,
        duration: 300,
      }
    ).start(); 
  }

  _toggleHideAfterShuffle() {

    if (this.state.hideAfterShuffle && !this.state.boardCoverOpen) {
      this._openCovers();
    }

    this.setState({hideAfterShuffle: !this.state.hideAfterShuffle});

  }

  _changeDiceSet(option) {
    console.log(option);
    if (option.label !== this.state.diceSetTitle) {
      this.setState({diceSetTitle: option.label, board: genBoard(diceSets[option.label])})
    }
  }

  _changeTimerLength(option) {
    console.log(option);
    if (option.seconds !== this.state.timerLength) {
      this.setState({timerLength: option.seconds})
    }
  }

  render() {
    var {boardCoverAnim, menuOpenAnim, hideAfterShuffle} = this.state;

    const boardCoverOffset = boardCoverAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -boardHeight]
    });

    const menuOffset = menuOpenAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [-windowHeight, 0]
    });

    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <View style={styles.header}>
          <GlibbleTitle style={styles.glibTitle} height={headerHeight-50}/>
          <TouchableOpacity onPress={this._toggleMenu}>
            <View style={[styles.menuButton, {width: headerHeight-50, height: headerHeight-50}]}>
              {this.state.menuOpen ?  <View style={[styles.upTriangle, {marginTop:-4}]}/> : <View style={{width:'50%', height:'50%', justifyContent:'space-between'}}> 
                <View style={{width:'100%', backgroundColor:'white', height:'20%', borderRadius:100}}/>
                <View style={{width:'100%', backgroundColor:'white', height:'20%', borderRadius:100}}/>
                <View style={{width:'100%', backgroundColor:'white', height:'20%', borderRadius:100}}/>
              </View>}
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex:1, margin:0, padding: 0, justifyContent:'space-around'}}>
          <View style={styles.board}>
            <Board board={this.state.board}/>
            <Animated.View style={[styles.leftSide, {left: boardCoverOffset}]}/>
            <Animated.View style={[styles.rightSide, {right: boardCoverOffset}]}>
             {this.state.hideAfterShuffle ? <TouchableOpacity style={styles.openCoversButton} onPress={this._openCovers}>
                             <View>
                               <Text style={styles.openCoversText}>Show</Text>
                             </View>
                           </TouchableOpacity> : null}
            </Animated.View>
          </View>
          <View style={styles.shuffleTimer}>
            <TouchableOpacity onPress={this._shuffle}>
              <View style={styles.circleHolder}>
                <ShuffleIcon width={windowWidth/2 - 15} height={windowWidth/2 - 15}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.circleHolder}>
                <Text style={styles.welcome}>{this.state.timerLength}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Animated.View style={{position:'absolute', top:menuOffset, width:'100%', height:'100%'}}>
            <Menu 
              toggleHideAfterShuffle={this._toggleHideAfterShuffle} 
              hideAfterShuffle={hideAfterShuffle} 
              currentDice={this.state.diceSetTitle} 
              diceOptions={diceSetMenuArray} 
              changeDiceSet={this._changeDiceSet}
              timerOptions={timerArray}
              changeTimerLength={this._changeTimerLength}
            />
          </Animated.View>
        </View>
      </View>
    );
  }
}

const colors = {
  header: {
    backgroundColor: 'rgb(0, 117, 181)'
  },
  title: {
    fill: 'rgb(56, 182, 255)',
    outline: 'rgb(255, 255, 255)'
  },
  board: {
    backgroundColor: 'rgb(71, 88, 108)',
  },
  buttonColor: 'rgb(36, 83, 140)'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: colors.board.backgroundColor,
    // height: '100%',
  },
  header: {
    // paddingTop: 3,
    // paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    backgroundColor: colors.header.backgroundColor,
    height: headerHeight,
    zIndex:5,
  },
  leftSide: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    backgroundColor: 'rgba(193,225,240,1)',
    left: 0,
    borderRightWidth: 1,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderColor: '#fff',
  },
  rightSide: {
    position: 'absolute',
    right: 0,
    width: '50%',
    height: '100%',
    backgroundColor: 'rgba(193,225,240,1)',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderLeftWidth: 1,
    borderColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'space-around',
  },
  openCoversButton: {
    position: 'absolute',
    left: -40,
    height: 40,
    width: 80,
    top: '44%',
    backgroundColor: colors.buttonColor,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 50,
  },
  openCoversText: {
    fontFamily: 'Digitalt',
    fontSize: 20,
    textAlign: 'center',
    // padding: 20,
    color: 'white',
  },
  title: {
    fontFamily: 'Digitalt',
    fontSize: 40,
    lineHeight: 40,
    height: 40,
    color: colors.title.fill,
    textShadowColor: colors.title.outline,
    textShadowRadius: 0,
    textShadowOffset: { width : 0, height: 1, }
  },
  glibTitle: {
  },
  menuButton: {
    backgroundColor: colors.buttonColor,
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  board: {
    margin: 5,
    width: windowWidth-10,
    height: windowWidth-10,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  welcome: {
    fontFamily: 'Digitalt',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  shuffleTimer: {
    // flex: 1,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: colors.header.backgroundColor,
  },
  circleHolder: {
    width: windowWidth/2 - 15,
    height: windowWidth/2 - 15,
    backgroundColor: colors.buttonColor,
    borderRadius: windowWidth,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  instructions: {
    fontFamily: 'Digitalt',
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  upTriangle: {
    width: 0,
    height: 0,
    borderTopWidth: 0,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff',
    borderLeftColor: 'transparent', 
  },
});

AppRegistry.registerComponent('App', () => App);
