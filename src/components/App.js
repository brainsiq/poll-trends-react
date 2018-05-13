import React, { Component } from 'react';
import Pollsters from './Pollsters';
import Graph from './Graph';
import News from './News';

class App extends Component {
  constructor() {
    super();

    this.state = {
      date: null,
      pollster: this.getDefaultPollster(),
      parties: []
    };
  }

  selectPollster = pollster => {
    localStorage.setItem('selectedPollster', pollster);
    this.setState({ ...this.state, pollster });
  }

  selectDate = date => {
    this.setState({ ...this.state, date });
  }

  getDefaultPollster = () =>
    localStorage.getItem('selectedPollster') || 'YG';

  componentDidMount() {
    fetch('http://localhost:3000/parties')
      .then(response => {
        return  response.json();
      })
      .then(parties => {
        const state = { ...this.state, parties }

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

        <Graph pollster={this.state.pollster} parties={this.state.parties} selectDate={this.selectDate} />

        <News date={this.state.date} parties={this.state.parties} />
      </div>
    );
  }
}

export default App;
