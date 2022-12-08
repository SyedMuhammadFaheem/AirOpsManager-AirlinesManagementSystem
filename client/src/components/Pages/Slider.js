import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import classes from './styles/slider.module.css'
function Slider() {
  return (
    <Carousel>
      <Carousel.Item interval={1000} className={classes.item}>
        <img
          className={classes.image}
          src={require('../../images/slide3.jpg')}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 ><strong style={{fontSize: '40px'}}>Fly to Qatar with FAST Airways</strong></h3>
          <p>Be there at the Wordlcup 2022 with FAST Airways and cheer your team to victory.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500} className={classes.item}>
        <img
          className={classes.image}
          src={require('../../images/slider1.jpg')}
          alt="Second slide"
        />
        <Carousel.Caption>
        <h3 ><strong style={{fontSize: '40px'}}>Discover the wonders of the world</strong></h3>
          <p>Journey with us on a unique adventure to discover the world</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500} className={classes.item}>
        <img
          className={classes.image}
          src={require('../../images/slider2.jpg')}
          alt="Third slide"
        />
        <Carousel.Caption>
        <h3 ><strong style={{fontSize: '40px'}}>Extra legroom, extra space, extra easy</strong></h3>
          <p>
          Pick from a choice of extras to make flying with us even more comfortable and convenient.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;