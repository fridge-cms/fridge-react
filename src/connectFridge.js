import React, { Component, PropTypes } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

export default getProps => ComposedComponent => {
  let id

  class ConnectFridge extends Component {
    static contextTypes = {
      fridge: PropTypes.object.isRequired,
      store: PropTypes.object.isRequired
    }

    state = {props: null}

    constructor (props, context) {
      super(props, context)

      const {store} = context

      id = store.getNextId()
      this.state = {props: store.get(id) || null}
    }

    getFridgeProps = async () => {
      const {fridge, store} = this.context
      const props = await getProps({fridge, props: this.props})
      if (this.unmounted) return false

      store.register(id, props)
      this.resolved = true
      if (this.setState) {
        this.setState({props})
      }

      return true
    }

    componentDidMount () {
      if (!this.resolved) {
        this.getFridgeProps()
      }
    }

    componentWillUnmount () {
      this.unmounted = true
    }

    render () {
      const {fridge} = this.context

      const props = {
        ...this.props,
        ...this.state.props,
        fridge
      }

      return <ComposedComponent {...props} />
    }
  }

  return hoistNonReactStatics(ConnectFridge, ComposedComponent, {})
}
