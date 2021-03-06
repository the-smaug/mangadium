import React, { Component } from 'react'
import { inject, observer, PropTypes } from 'mobx-react'

import ErrorBox from '../components/ErrorBox'
// import { AppPropTypes } from '../models/App'
import styles from '../utils/styles'

@inject('app')
@observer
class Error extends Component {
  static propTypes = {
    app: PropTypes.observableObject
  }

  render () {
    return (
      <div style={{ position: 'fixed', left: '10px', width: '300px', zIndex: styles.zIndexMajor }}>
        <ErrorBox errors={this.props.app.errors} />
      </div>
    )
  }
}

export default Error
