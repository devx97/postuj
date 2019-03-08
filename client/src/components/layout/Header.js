import React, {Component, Fragment} from 'react'
import {NavLink} from "react-router-dom"
import {connect} from "react-redux"

import {logOut} from "../../actions"

import {Button, Menu} from 'semantic-ui-react'

class Header extends Component {
  render() {
    return (
        <Menu inverted pointing secondary fixed={'top'}>
          <Menu.Item as={NavLink} exact to={'/'} content={'Blog'}/>
          <Menu.Item as={NavLink} to={'/hot'} content={'Hot'}/>
          <Menu.Menu position={'right'}>
            {this.props.isLogged ?
                <Fragment>
                  <Button onClick={this.props.logOut} content={'Logout'}/>
                  <Menu.Item as={NavLink} to={'/profile'} content={'Profile'}/>
                </Fragment>
                : <Fragment>
                  <Menu.Item as={NavLink} to={'/register'} content={'Register'}/>
                  <Menu.Item as={NavLink} to={'/login'} content={'Login'}/>
                </Fragment>
            }
          </Menu.Menu>
        </Menu>
    )
  }
}

const mapStateToProps = state => ({
  isLogged: state.auth.isLogged
})

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header)