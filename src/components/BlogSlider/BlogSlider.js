import React, { Component } from 'react';
import {
  CarouselProvider,
  Slider,
  Slide,
} from 'pure-react-carousel';
import './BlogSlider.css';

export default class extends Component {
  render() {
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={500}
        visibleSlides={1}
        totalSlides={3}
        orientation="vertical"
        interval={5000}
        isPlaying={true}
      >
        <Slider>
          <Slide index={0}>Slide 1</Slide>
          <Slide index={1}>Slide 2</Slide>
          <Slide index={2}>Slide 3</Slide>
        </Slider>
      </CarouselProvider>
    );
  }
}
