import React, { Component } from 'react'
import { arrayOf, string } from 'prop-types'

import Arrow from './Arrow'
class ImageSlider extends Component {
  static propTypes = { images: arrayOf(string) }

  constructor (props) {
    super(props)
    this.scrollWiew = React.createRef()

    this.state = {
      scrollViewPosition: 0,
      firstItem: 0,
      lastItem: 4
    }
  }

  scroll = direction => {
    const scrollView = this.scrollWiew.current
    const scrollViewPosition = scrollView.scrollLeft
    const elementWidth = scrollView.children[0].clientWidth

    switch (direction) {
      case 'right':
        scrollView.scrollLeft += elementWidth * 1
        this.setState({ scrollViewPosition: scrollViewPosition + elementWidth })
        break
      case 'left':
        scrollView.scrollLeft -= elementWidth * 1
        this.setState({ scrollViewPosition: scrollViewPosition - elementWidth })
        break
    }
  }

  render () {
    const { scrollViewPosition } = this.state
    return (
      <div style={{ position: 'relative' }}>
        {scrollViewPosition > 0 && (
          <Arrow
            direction='left'
            clickHandler={() => {
              this.scroll('left')
            }}
            style={{ left: 0, transform: 'translateX(-90%)' }}
          />
        )}

        <Arrow
          direction='right'
          clickHandler={() => {
            this.scroll('right')
          }}
          style={{ right: 0, transform: 'translateX(90%)' }}
        />

        <div
          ref={this.scrollWiew}
          className='columns'
          style={{ overflowX: 'scroll', scrollBehavior: 'smooth' }}
        >
          {this.props.images.map(image => (
            <div key={image} className='column is-one-quarter'>
              <figure className='image is-3by5'>
                <img src={image} />
              </figure>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default ImageSlider