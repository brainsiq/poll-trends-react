import React, { Component } from 'react';

class Pollsters extends Component {
  constructor(props) {
    super();

    this.state = {
      companies: [],
      selectedPollster: props.defaultPollster
    };
  }

  selectPollster = event => {
    const selectedPollster = event.target.value;

    this.setState({
      companies: this.state.companies,
      selectedPollster
    });

    this.props.selectPollster(selectedPollster);
  }

  componentDidMount() {
    fetch('http://localhost:3000/companies')
      .then(response => {
        return  response.json();
      })
      .then(companies => {
        const state = { companies, selectedPollster: this.state.selectedPollster }

        this.setState(state);
      })
  }

  render() {
    return (
      <div>
        <label htmlFor="pollCompanies">Pollster</label>

        <select
          name="pollCompanies"
          value={this.state.selectedPollster}
          onChange={this.selectPollster}
        >
          {
            this.state.companies
              .map(company => <option value={company.id} key={company.id}>{company.name}</option>)
          }
        </select>
      </div>
    )
  }
}

export default Pollsters;
