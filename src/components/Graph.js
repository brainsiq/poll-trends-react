import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

// Don't render "Don't know" and "Other" results
const ignoredParties = ['DK', 'OTH'];

const mapPollsToGraphData = polls => {
  const dates = polls.map(poll => new Date(poll.date).toLocaleDateString('en-GB'));
  const lines = polls.reduce((lines, poll) => {
    Object.values(poll.headline).forEach(headline => {
      if (ignoredParties.includes(headline.party.code)) {
        return;
      }

      const partyLine = lines.find(line => line.label === headline.party.name);

      if (!partyLine) {
        const colour = `#${headline.party.colour}`;

        lines.push({
          label: headline.party.name,
          data: [headline.pct],
          borderColor: colour,
          backgroundColor: colour,
          fill: false
        });
      } else {
        partyLine.data.push(headline.pct);
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
          graphData: mapPollsToGraphData(polls),
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
      legend={{
        position: 'bottom'
      }}
    />
  }
}

export default Graph;
