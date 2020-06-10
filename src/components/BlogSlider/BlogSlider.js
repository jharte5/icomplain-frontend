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
        totalSlides={10}
        orientation="vertical"
        interval={5000}
        isPlaying={true}
      >
        <Slider>
          <Slide index={0}>Slide 1</Slide>
          <Slide index={1}>Slide 2</Slide>
          <Slide index={2}>Slide 3</Slide>
          <Slide index={3}>Slide 4</Slide>
          <Slide index={4}>Slide 5</Slide>
          <Slide index={5}>Slide 6</Slide>
          <Slide index={6}>Slide 7</Slide>
          <Slide index={7}>Slide 8</Slide>
          <Slide index={8}>Slide 9</Slide>
          <Slide index={9}>Slide 10</Slide>
        </Slider>
      </CarouselProvider>
    );
  }
}