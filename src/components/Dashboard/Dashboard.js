import React from 'react'
import classes from './Dashboard.scss'

export const Dashboard = (props) => {
  const listJSX = props.dashboard.dashboardItems.map((item, i) => {
    let itemJSX;
    if(props.editedItemIndex === i) {
      itemJSX = <p><b><u>{item.label}</u></b></p>
    } else {
      itemJSX = <p>{item.label}</p>
    }
    return <h4
             key={i}
             id={i}
             draggable='true'
             onDragStart={props.handleOnDragStart}
             onDrop={props.handleOnDrop}
             onDragOver={props.handleOnDragOver}
             onClick={props.itemOnEdit.bind(undefined, i)}
             style={{cursor: 'pointer'}}
            >
              {item.label}
            </h4>
  });

  return (
    <div>
      <h2 className={classes.counterContainer}>
        Dashboard visits:
        {' '}
        <span className={classes['dashboard--green']}>
          {props.dashboard.visitsCount}
        </span>
      </h2>
      <form onSubmit={props.onSubmit}>
        <input
          value={props.inputValue}
          type='input'
          placeholder='type here a value'
          style={{width: 300}}
          onChange={props.inputOnChange}
        />
        <input
          type="submit"
          value={ props.editedItemIndex === null ?
                  'Add new item to the list' :
                  'Edit Item' }
        />
      </form>
      {listJSX}
    </div>
  )
}

Dashboard.propTypes = {
  dashboard: React.PropTypes.object.isRequired,
}

export default Dashboard
