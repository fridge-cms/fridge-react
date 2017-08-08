import { Component, Children } from 'react'
import PropTypes from 'prop-types'
import createStore from './createStore'

export default class extends Component {
  static propTypes = {
    fridge: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  static childContextTypes = {
    fridge: PropTypes.object.isRequired,
    store: PropTypes.object
  }

  constructor (props) {
    super(props)

    this.fridge = props.fridge
    this.store = props.store || createStore()
    this.store.resetIds()
  }

  getChildContext () {
    return {
      fridge: this.fridge,
      store: this.store
    }
  }

  render () {
    return Children.only(this.props.children)
  }
}
