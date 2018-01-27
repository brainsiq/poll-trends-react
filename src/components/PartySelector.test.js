import React from 'react';
import renderer from 'react-test-renderer';
import PartySelector from './PartySelector.js';

beforeAll(() => {
  const companiesResponse = [{
    id: 'YG',
    name: 'YouGov'
  }, {
    id: 'SRVN',
    name: 'Survation'
  }];

  fetch.mockResponse(JSON.stringify(companiesResponse));
});

it('renders the select list with companies from the API', () => {
  const component = renderer
    .create(<PartySelector />);

  return component.getInstance().loadCompanies()
    .then(() => {
      expect(component.toJSON()).toMatchSnapshot();
    });
});
