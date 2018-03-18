import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

const mapPollsToGraphData = (parties, polls) => {
  const dates = polls.map(poll => new Date(poll.date).toLocaleDateString('en-GB'));
  const lines = polls.reduce((lines, poll) => {
    poll.results.forEach(result => {
      const party = parties.find(party => party.code === result.party);
      const partyLine = lines.find(line => line.label === party.name);

      if (!partyLine) {
        const colour = `#${party.colour}`;

        lines.push({
          label: party.name,
          data: [result.pct],
          borderColor: colour,
          backgroundColor: colour,
          fill: false
        });
      } else {
        partyLine.data.push(result.pct);
      }
    });

    return lines;
  }, []);

  return {
    labels: dates,
    datasets: lines
  };
};

class Graph extends Component {
  constructor(props) {
    super();

    this.state = {
      pollster: props.pollster,
      graphData: {}
    }
  }

  loadPolls(pollster) {
    const today = new Date().toISOString();
    const limit = 20;
    const url = `http://localhost:3000/polls?company=${pollster}&limit=${limit}&until=${today}`;

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(polls => {
        console.log(polls)
        this.setState({
          graphData: mapPollsToGraphData(this.props.parties, polls),
          pollster
        });
      });
  }

  componentDidMount() {
    this.loadPolls(this.state.pollster);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pollster !== this.props.pollster) {
      this.loadPolls(nextProps.pollster);
    }
  }

  render() {
    return <Line
      data={this.state.graphData}
      height={75}
      legend={{
        position: 'bottom'
      }}
    />
  }
}

export default Graph;
