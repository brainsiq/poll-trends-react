import React, { Component } from 'react';
import Pollsters from './Pollsters';
import Graph from './Graph';

class App extends Component {
  constructor() {
    super();

    this.state = {
      pollster: this.getDefaultPollster()
    };
  }

  selectPollster = pollster => {
    localStorage.setItem('selectedPollster', pollster);
    this.setState({ pollster });
  }

  getDefaultPollster = () =>
    localStorage.getItem('selectedPollster') || 'YG';

  render() {
    return (
      <div>
        <Pollsters
          selectPollster={this.selectPollster}
          defaultPollster={this.getDefaultPollster()}
        />

        <Graph pollster={this.state.pollster} />
      </div>
    );
  }
}

export default App;
