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

    this.state = { date: null };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.props.date) {
      this.setState({ date: nextProps.date })
    }
  }

  renderSlider() {
    return (
      <Slider { ...settings }>
        <div>
          <h3>{ this.state.date.toString() }</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    );
  }

  renderBanner() {
    return 'Select a date to see relevant news stories';
  }

  render() {
    return this.state.date ?
      this.renderSlider() :
      this.renderBanner();
  }
}

export default News;
