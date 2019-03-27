import React, {Component, Fragment} from 'react'
import {Link, NavLink} from "react-router-dom"
import {connect} from "react-redux"

import {logOut} from "../../actions"

import {Dropdown, Menu, Image, Container} from 'semantic-ui-react'

class Header extends Component {
  render() {
    const trigger = (
        <span>
          {this.props.username} <Image avatar
                                       src={'https://media.giphy.com/media/B1IWXbj4Disow/200.gif'}/>
        </span>
    )

    return (
        <Menu color={'blue'} fixed={'top'} pointing secondary inverted
              style={{background: '#2a2a2a'}}>
          <Container>
            <Menu.Item icon={'blogger'} content={'Blog'}
                       as={NavLink}
                       to={'/'}
                       exact/>
            <Menu.Item icon={'fire'} content={'Hot!'}
                       as={NavLink}
                       to={'/hot'}/>
            <Menu.Menu position={'right'}>
              {this.props.isLogged ?
                  <Dropdown style={{padding: '4px 0'}} trigger={trigger} icon={null} item>
                    <Dropdown.Menu>
                      <Dropdown.Item icon={'user'} text={'Profile'}
                                     as={Link}
                                     to={'/profile'}/>
                      <Dropdown.Item icon={'sign out'} text={'Logout'}
                                     onClick={this.props.logOut}/>
                    </Dropdown.Menu>
                  </Dropdown>
                  : <Fragment>
                    <Menu.Item icon={'add user'} content={'Register'}
                               as={NavLink} to={'/register'}/>
                    <Menu.Item icon={'sign in'} content={'Login'}
                               as={NavLink} to={'/login'}/>
                  </Fragment>
              }
            </Menu.Menu>
          </Container>
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