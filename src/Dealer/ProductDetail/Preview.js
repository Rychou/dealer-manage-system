import React, { Component } from 'react';
import { array } from 'prop-types';
import { Carousel } from 'antd';

class Preview extends Component {
  render() {
    const { images } = this.props;
    return (
      <Carousel className="carousel" autoplay>
        {images
          ? images.map((image, index) => {
              return <img src={image} alt="" key={index} />;
            })
          : null}
      </Carousel>
    );
  }
}

Preview.propTypes = {
  images: array,
};

export default Preview;
