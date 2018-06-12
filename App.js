import React, { Component } from 'react';
import { AppRegistry, TextInput, View, Text, StyleSheet } from 'react-native';
import Report from './components/Report';
import List from './components/list';
import Nav from './components/nav';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'report'
    };
    this.changeView = this.changeView.bind(this);
  }

  changeView(view) {
    this.setState({ view: view });
  }
  render() {
    let view = null;
    if (this.state.view === 'report') {
      view = <Report redirect={this.changeView}/>
    }
    else if (this.state.view === 'list') {
      view = <List />
    }

    return (
      <View>
        <Nav navHandle={this.changeView} />
        <View>
          {view}
        </View>
      </View>

    );
  }
}
