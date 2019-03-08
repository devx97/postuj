import React, {Component, Fragment} from 'react'
import {NavLink} from "react-router-dom"
import {connect} from "react-redux"

import {logOut} from "../../actions"

import {Button, Container, Dropdown, Menu, Image, Icon} from 'semantic-ui-react'

class Header extends Component {
  render() {
    const options = [
      {key: 1, text: 'Choice 1', value: 1},
      {key: 2, text: 'Choice 2', value: 2},
      {key: 3, text: 'Choice 3', value: 3},
    ]

    const trigger = (
        <span>
          {this.props.username} <Image avatar src={'https://media.giphy.com/media/B1IWXbj4Disow/200.gif'}/>
        </span>
    )

    return (
        <Menu inverted secondary fixed={'top'} style={{background: '#2a2a2a'}}>
          <Menu.Item as={NavLink} exact to={'/'} icon={'blogger'} content={'Blog'}/>
          <Menu.Item as={NavLink} exact to={'/hot'} icon={'fire'} content={'Hot!'}/>
          <Menu.Menu position={'right'}>
            {this.props.isLogged ?
                <Dropdown trigger={trigger} icon={null} item>
                  <Dropdown.Menu>
                    <Dropdown.Item text={'Profile'} icon={'user'} as={NavLink} to={'/profile'}  />
                    <Dropdown.Item text={'Logout'} icon={'sign out'} onClick={this.props.logOut}/>
                  </Dropdown.Menu>
                </Dropdown>
                : <Fragment>
                  <Menu.Item as={NavLink} to={'/register'} icon={'add user'} content={'Register'}/>
                  <Menu.Item as={NavLink} to={'/login'} icon={'sign in'} content={'Login'}/>
                </Fragment>
            }
          </Menu.Menu>
        </Menu>
    )
  }
}

const mapStateToProps = state => ({
  isLogged: state.auth.isLogged,
  username: state.auth.user.username,
})

const mapDispatchToProps = dispatch => ({
  logOut: () => dispatch(logOut())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header)