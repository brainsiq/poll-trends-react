import React, { Component } from 'react';
import Pollsters from './Pollsters';

class App extends Component {
  selectPollster = pollster => {
    localStorage.setItem('selectedPollster', pollster);
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
      </div>
    );
  }
}

export default App;
