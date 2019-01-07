import React from 'react'
import styled from 'styled-components'

import Image from './Image'

class PhotoSlider extends React.Component {
  constructor(props) {
    super(props);

    this.images = this.props.images.map(( photo ) => photo.image.url);

    console.log(this.props.interval);
    console.log(this.images);

    this.state = {
      firstImage: {
        image: this.images[0],
        isNextImage: false
      },
      secondImage: {
        image: this.images[1],
        isNextImage: true
      }
    }
  }

  componentDidMount() {
    this.setPhotoInterval();
  }

  componentWillUnmount() {
    clearInterval(this.photoInterval);
    clearTimeout(this.photoTimeout);
  }

  setPhotoInterval = () => {
    let nextImgIndex = 1;
    this.photoInterval = setInterval(() => {
      if (nextImgIndex + 1 >= this.images.length) {
        nextImgIndex = 0;
      } else {
        nextImgIndex++;
      }
      const firstIsNext = this.state.firstImage.isNextImage;
      // Switch which image is the one coming next
      this.setState({
        firstImage: {
          ...this.state.firstImage,
          isNextImage: !firstIsNext
        },
        secondImage: {
          ...this.state.secondImage,
          isNextImage: firstIsNext
        }
      })
      // Change photo of the image which is coming next (timeout to wait slide animation)
      this.photoTimeout = setTimeout(() => {
        this.setState({
          firstImage: {
            ...this.state.firstImage,
            image: firstIsNext ? this.state.firstImage.image : this.images[nextImgIndex]
          },
          secondImage: {
            ...this.state.secondImage,
            image: firstIsNext ? this.images[nextImgIndex] : this.state.secondImage.image
          }
        })
      }, 500);
    }, (this.props.interval * 1000));
  }

  render() {
    return (
      <Slider>
        <Image image={this.state.firstImage.image} isNextImage={this.state.firstImage.isNextImage} />
        <Image image={this.state.secondImage.image} isNextImage={this.state.secondImage.isNextImage} />
      </Slider>
    )
  }
}

export default PhotoSlider

const Slider = styled.div`
  width: 100%;
  height: 100%;

  overflow: hidden;

  position: relative;
`