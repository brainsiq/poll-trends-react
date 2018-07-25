import React, { Component } from 'react';
import Slider from 'react-slick';
import Parties from './Parties';

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const renderBanner = () => 'Select a date to see relevant news stories';
const renderStory = story =>
  (
    <div key={ story.id }>
      <a href={ story.webUrl } target="guardian">
        <img src={ story.fields.thumbnail} alt={ story.webTitle } width="150" />
        <h3>{ story.webTitle }</h3>
      </a>
    </div>
  );

class News extends Component {
  constructor() {
    super();

    this.state = {
      date: null,
      stories: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.props.date) {
      this.setState({ ...this.state, date: nextProps.date })

      if (nextProps.date) {
        this.loadStories(nextProps.date);
      }
    }
  }

  selectParty = party => {
    this.loadStories(this.state.date, party);
  }

  renderSlider() {
    return (
      <div>
        <Parties parties={ this.props.parties } selectParty={ this.selectParty } />
        <Slider { ...settings }>{ this.state.stories.map(renderStory) }</Slider>
      </div>
    );
  }

  loadStories(date, party) {
    let url = `http://localhost:3000/news?limit=10&pollDate=${date.toISOString()}`;

    if (party) {
      url += `&partyId=${party}`;
    }

    fetch(url)
      .then(response => response.json())
      .then(stories => {
        this.setState({ ...this.state, stories });
      });
  }

  render() {
    return this.state.date ?
      this.renderSlider() :
      renderBanner();
  }
}

export default News;
