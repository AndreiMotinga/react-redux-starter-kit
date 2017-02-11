import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

let loginObj = {
  user: '',
  password: ''
}

const usernameOnChange = (e) => {
  loginObj.user = e.target.value
}

const passwordOnChange = (e) => {
  loginObj.password = e.target.value
}

const prepareLoginJSX = (props) => {
  return (
    <form onSubmit={props.handleLogin.bind(undefined, loginObj)}>
      <input
        type='input'
        placeholder='username'
        style={{width: 100}}
        name='username'
        onChange={usernameOnChange}
      />
      <input
        type='input'
        placeholder='password'
        style={{width: 100}}
        name='password'
        onChange={passwordOnChange}
      />
      <input
        type='submit'
        value={ 'Login Now' }
      />
    </form>
  )
}

export const Header = (props) => {
  let loginFormJSX
  let loginMessageJSX = null

  console.log("ATTENTION", props.session.isNotLoggedIn, props.session.token)
  if(props.session.isNotLoggedIn) {
    if(props.session.loginToken === 'invalid') {
      loginMessageJSX = <p>Invalid login details</p>
    }
    loginFormJSX = prepareLoginJSX(props)
  } else {
    loginFormJSX = null
  }

  return (
    <div>
      <h1>React Redux Starter Kit</h1>
      <IndexLink to='/' activeClassName={classes.activeRoute}>
        Home
      </IndexLink>
      {' · '}
      <Link to='/counter' activeClassName={classes.activeRoute}>
        Counter
      </Link>
      {' · '}
      <Link to='/dashboard' activeClassName={classes.activeRoute}>
        Dashboard
      </Link>
      {loginFormJSX}
      {loginMessageJSX}
    </div>
  )
}

export default Header
