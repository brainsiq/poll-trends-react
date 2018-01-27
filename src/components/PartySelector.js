import React, { Component } from 'react';

class PartySelector extends Component {
  constructor() {
    super();

    this.state = { companies: [] };
  }

  loadCompanies() {
    return fetch('http://localhost:3001/companies')
      .then(response => response.json())
      .then(response => {
        const companies = response.map(company => Object.assign({
          selected: company.id === 'YG'
        }, company))
        this.setState({ companies });
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    this.loadCompanies();
  }

  render() {
    return (
      <div>
        <label htmlFor="pollCompanies">Pollster</label>

        <select name="pollCompanies">
          {
            this.state.companies.map(company => <option value={company.id} key={company.id} selected={company.selected}>{company.name}</option>)
          }
        </select>
      </div>
    )
  }
}

export default PartySelector;
