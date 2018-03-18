import React, { Component } from 'react';
import Pollsters from './Pollsters';
import Graph from './Graph';

class App extends Component {
  constructor() {
    super();

    this.state = {
      pollster: this.getDefaultPollster(),
      parties: []
    };
  }

  selectPollster = pollster => {
    localStorage.setItem('selectedPollster', pollster);
    this.setState({ pollster, parties: this.state.parties });
  }

  getDefaultPollster = () =>
    localStorage.getItem('selectedPollster') || 'YG';

  componentDidMount() {
    fetch('http://localhost:3000/parties')
      .then(response => {
        return  response.json();
      })
      .then(parties => {
        const state = { parties, pollster: this.state.pollster }

        this.setState(state);
      })
  }

  render() {
    return (
      <div>
        <Pollsters
          selectPollster={this.selectPollster}
          defaultPollster={this.getDefaultPollster()}
        />

        <Graph pollster={this.state.pollster} parties={this.state.parties} />
      </div>
    );
  }
}

export default App;
