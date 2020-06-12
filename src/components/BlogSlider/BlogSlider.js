import React, { Component } from 'react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import './BlogSlider.css';
import 'pure-react-carousel/dist/react-carousel.es.css';

export default class extends Component {
  render() {
    return (
      <CarouselProvider
        className="carousel"
        naturalSlideWidth={1}
        naturalSlideHeight={1}
        visibleSlides={1}
        totalSlides={10}
        orientation="vertical"
        interval={5000}
        isPlaying={true}
        step={1}
      >
        <Slider className="slider">
          <Slide className="slide" index={0}>
            Slide 1
          </Slide>
          <Slide className="slide" index={1}>
            Slide 2
          </Slide>
          <Slide className="slide" index={2}>
            Slide 3
          </Slide>
          <Slide className="slide" index={3}>
            Slide 4
          </Slide>
          <Slide className="slide" index={4}>
            Slide 5
          </Slide>
          <Slide className="slide" index={5}>
            Slide 6
          </Slide>
          <Slide className="slide" index={6}>
            Slide 7
          </Slide>
          <Slide className="slide" index={7}>
            Slide 8
          </Slide>
          <Slide className="slide" index={8}>
            Slide 9
          </Slide>
          <Slide className="slide" index={9}>
            Slide 10
          </Slide>
        </Slider>
      </CarouselProvider>
    );
  }
}
