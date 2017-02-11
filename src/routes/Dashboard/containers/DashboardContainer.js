import React from 'react'
import { connect } from 'react-redux'
import {
  dashboardVisitIncrement,
  dashboardAddItem,
  dashboardEditItem,
  dashboardReorderItems
} from '../modules/dashboard'
import Dashboard from 'components/Dashboard'

const mapActionCreators = {
  dashboardVisitIncrement,
  dashboardAddItem: (value) => dashboardAddItem(value),
  dashboardEditItem: (value) => dashboardEditItem(value),
  dashboardReorderItems: (value) => dashboardReorderItems(value)
}

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
  session: state.session
})

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props)

    this.inputOnChange = this.inputOnChange.bind(this)
    this.itemOnEdit = this.itemOnEdit.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleOnDragStart = this.handleOnDragStart.bind(this)
    this.handleOnDrop = this.handleOnDrop.bind(this)
    this.handleOnDragOver = this.handleOnDragOver.bind(this)

    this.state = {
      inputValue: '',
      editedItemIndex: null,
      draggedItemIndex: null
    }
  }

  handleOnDragStart(e) {
    const id = e.target.id
    this.setState({ draggedItemIndex: id });
  }

  handleOnDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move'
  }

  handleOnDrop(e) {
    const droppedItemId = e.currentTarget.id
    let reorderVal = {
      start: parseInt(this.state.draggedItemIndex),
      end: parseInt(droppedItemId)
    }

    const reorderIsCorrect = !isNaN(reorderVal.start) && !isNaN(reorderVal.end) && reorderVal.start !== reorderVal.end
    if(reorderIsCorrect) {
      this.props.dashboardReorderItems(reorderVal)
    }

    this.setState({ draggedItemIndex: null });
  }

  componentDidMount() {
    this.props.dashboardVisitIncrement();
  }

  inputOnChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  itemOnEdit(itemIndex) {
    const editedItem = this.props.dashboard.dashboardItems[itemIndex]
    this.setState({ inputValue: editedItem.label, editedItemIndex: itemIndex });
  }

  onSubmit(e) {
    e.preventDefault();
    const val = this.state.inputValue
    const editedItemIndex = this.state.editedItemIndex
    if(val && editedItemIndex !== null) {
      this.props.dashboardEditItem({ val, editedItemIndex })
      this.setState({ inputValue: '', editedItemIndex: null });
    } else if(val) {
      this.props.dashboardAddItem(val);
      this.setState({inputValue: ''});
    } else {
      alert(`Value can't be empty`)
    }

  }

  render() {
    if(this.props.session.isNotLoggedIn) {
      return <h4>Please login in order to access dashboard</h4>
    }

    return (
        <Dashboard {...this.props}
          editedItemIndex={this.state.editedItemIndex}
          itemOnEdit={this.itemOnEdit}
          inputValue={this.state.inputValue}
          inputOnChange={this.inputOnChange}
          onSubmit={this.onSubmit}
          handleOnDragStart={this.handleOnDragStart}
          handleOnDrop={this.handleOnDrop}
          handleOnDragOver={this.handleOnDragOver}
        />
    )
  }
}

export default connect(mapStateToProps, mapActionCreators)(DashboardContainer)
