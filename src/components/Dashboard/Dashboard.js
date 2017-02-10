import React from 'react'
import classes from './Dashboard.scss'

export const Dashboard = (props) => (
  <div>
    <h2 className={classes.counterContainer}>
      Dashboard:
      {' '}
      <span className={classes['counter--green']}>
        {props.dashboard}
      </span>
    </h2>
    <button className='btn btn-default' onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.doubleAsync}>
      Double (Async)
    </button>
  </div>
)

Dashboard.propTypes = {
  dashboard: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
}

export default Dashboard
