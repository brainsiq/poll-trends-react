import React, { Component } from 'react';


class Parties extends Component {
  selectParty = event => {
    const selectedParty = event.target.value;

    this.props.selectParty(selectedParty);
  }

  render() {
    return (
      <div>
        <label htmlFor="parties">Parties</label>
        <select
          name="parties"
          onChange={ this.selectParty }
        >
          <option key='all'>all</option>
          { this.props.parties.map(party => <option key={ party.code } value={ party.code }>{ party.name }</option>) }
        </select>
      </div>
    );
  }
}

export default Parties;
