import React, { Component } from 'react';
import Pollsters from './Pollsters';

const defaultPollster = 'YG';

class App extends Component {
  render() {
    return (
      <div>
        <Pollsters selectPollster={val => console.log(val)} defaultPollster={defaultPollster}/>
      </div>
    );
  }
}

export default App;
