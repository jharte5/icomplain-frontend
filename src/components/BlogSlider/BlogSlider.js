import React, { Component } from "react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import Axios from "axios";
import "./BlogSlider.css";
import "pure-react-carousel/dist/react-carousel.es.css";

export default class extends Component {
  state = {
    blogs: [],
  };

  componentDidMount() {
    Axios.get("http://localhost:3001/api/blogs/all-blogs").then((response) => {
      console.log("blogData", response.data);
      this.setState({ blogs: response.data });
    });

    // result.data;
  }

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
          {this.state.blogs.map((b, i) => {
            return (
              <Slide className="slide" index={i} key={i}>
                {b.title}
              </Slide>
            );
          })}
        </Slider>
      </CarouselProvider>
    );
  }
}
