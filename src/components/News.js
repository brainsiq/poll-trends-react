import React, { Component } from 'react';
import Slider from 'react-slick';

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

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

      this.loadStories(nextProps.date);
    }
  }

  renderStory(story) {
    return (
      <div key={ story.id }>
        <a href={ story.webUrl } target="guardian">
          <img src={ story.fields.thumbnail} alt={ story.webTitle } width="150" />
          <h3>{ story.webTitle }</h3>
        </a>
      </div>
    );
  }

  renderSlider() {
    return (
      <Slider { ...settings }>{ this.state.stories.map(this.renderStory) }</Slider>
    );
  }

  renderBanner() {
    return 'Select a date to see relevant news stories';
  }

  loadStories(date) {
    fetch(`http://localhost:3000/news?limit=10&pollDate=${date.toISOString()}`)
      .then(response => response.json())
      .then(stories => {
        this.setState({ ...this.state, stories });
      });
  }

  render() {
    return this.state.date ?
      this.renderSlider() :
      this.renderBanner();
  }
}

export default News;
