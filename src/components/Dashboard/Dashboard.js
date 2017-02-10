import React from 'react'
import classes from './Dashboard.scss'

export const Dashboard = (props) => (
  <div>
    <h2 className={classes.counterContainer}>
      Dashboard visits:
      {' '}
      <span className={classes['counter--green']}>
        {props.dashboard}
      </span>
    </h2>
  </div>
)

Dashboard.propTypes = {
  dashboard: React.PropTypes.number.isRequired,
}

export default Dashboard
