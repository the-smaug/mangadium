import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { shape } from 'prop-types'

import { MangaDetailPropTypes } from '../models/Manga'
import ViewToggler from '../components/ViewToggler'
import ImageSlider from '../components/ImageSlider'
import { displayAuthors, convertSpecialCharsToText } from '../utils/render'

@inject('detail')
@observer
class Detail extends Component {
  static propTypes = { detail: shape(MangaDetailPropTypes) }

  render () {
    const {
      detail,
      detail: { manga }
    } = this.props

    return (
      <ViewToggler isVisible={detail.isOpen} onClose={detail.toggleVisibilityStatus}>
        <div className='container'>
          {manga && (
            <div>
              <div style={{ display: 'flex' }}>
                <h2 className='title is-2'>
                  <a href={manga.url} target='_blank'>
                    {manga.title}
                  </a>
                </h2>
                {/* <div className='title is-4' style={{ marginLeft: 'auto' }}>
                  Classement : {manga.rank}
                </div> */}
              </div>
              <p className='subtitle'>{displayAuthors(manga.authors)}</p>
              <div className='content'>
                {manga.genres.map(genre => (
                  <span key={genre} className='tag is-dark' style={{ marginLeft: '3px' }}>
                    {genre}
                  </span>
                ))}
              </div>
              <div className='content'>
                <p>{convertSpecialCharsToText(manga.synopsis)}</p>
              </div>
              <ImageSlider images={manga.images} />
            </div>
          )}
        </div>
      </ViewToggler>
    )
  }
}

export default Detail
