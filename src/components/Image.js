import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

const SlidingImage = ({ isNextImage, image }) => {
  const theme = isNextImage ? currentImage : nextImage;

  return (
    <ThemeProvider theme={theme}>
      <Image image={image} />
    </ThemeProvider>
  )
}

export default SlidingImage

const currentImage = {
  left: '0',
  transition: 'left 0.5s ease-out',
  zIndex: '2'
}

const nextImage = {
  left: '100%',
  transition: 'left 0s 0.5s',
  zIndex: '1'
}

const Image = styled.div`
  background-size: 100% 100%;

  position: absolute;
  transition: ${({ theme }) => theme.transition };
  transition-delay: ${({ theme }) => theme.transitionDelay};
  background-image: url(${({ image }) => image});
  left: ${({ theme }) => theme.left};
  z-index: ${({ theme }) => theme.zIndex};

  width: 100%;
  height: 100%;
`