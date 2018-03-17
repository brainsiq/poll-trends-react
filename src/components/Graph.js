import React, { Component } from 'react';

class Graph extends Component {
  constructor(props) {
    super();

    this.state = {
      pollster: props.pollster,
      polls: []
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
        this.setState({ polls, pollster });
      });
  }

  componentDidMount() {
    this.loadPolls(this.state.pollster);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pollster != this.props.pollster) {
      this.loadPolls(nextProps.pollster);
    }
  }

  render() {
    return JSON.stringify(this.state.polls);
  }
}

export default Graph;
