import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import PhotoSlider from '../components/PhotoSlider'

export default ({ data: { slider } }) => {
  console.log(slider);

  return (
    <Container>
      <PhotoSlider images={slider.photos} interval={slider.intervalTime} />
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
`

export const query = graphql`
  query PhotoSliderQuery {
    slider: datoCmsPhotoSlider {
      intervalTime
      photos {
        image {
          url
        }
      }
    }
  }
`