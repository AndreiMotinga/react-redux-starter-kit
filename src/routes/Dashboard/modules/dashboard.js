// ------------------------------------
// Constants
// ------------------------------------
export const DASHBOARD_VISITS_COUNT = "DASHBOARD_VISITS_COUNT"
export const DASHBOARD_ADD_ITEM = "DASHBOARD_ADD_ITEM"
export const DASHBOARD_EDIT_ITEM = "DASHBOARD_EDIT_ITEM"
export const DASHBOARD_REORDER_ITEM = "DASHBOARD_REORDER_ITEM"

// ------------------------------------
// Actions
// ------------------------------------
export function dashboardVisitIncrement(value = 1){
  return {
    type: DASHBOARD_VISITS_COUNT,
    payload: value
  }
}

export function dashboardAddItem(value){
  return {
    type: DASHBOARD_ADD_ITEM,
    payload: value
  }
}

export function dashboardEditItem(value){
  return {
    type: DASHBOARD_EDIT_ITEM,
    payload: value,
  }
}

export function dashboardReorderItems(value){
  return {
    type: DASHBOARD_REORDER_ITEM,
    payload: value,
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [DASHBOARD_VISITS_COUNT]: (state, action) => {
    return Object.assign({}, state, {
      visitsCount: state.visitsCount + action.payload
    })
  },
  [DASHBOARD_ADD_ITEM]: (state, action) => {
    const mockedId = Math.floor(Date.now() / 1000)
    const newItem = {
      label: action.payload,
      key: mockedId
    }
    state.dashboardItems.push(newItem)
    return Object.assign({}, state)
  },
  [DASHBOARD_EDIT_ITEM]: (state, action) => {
    const newLabel = action.payload.val
    const index = action.payload.editedItemIndex
    state.dashboardItems[index].label = newLabel
    return Object.assign({}, state)
  },
  [DASHBOARD_REORDER_ITEM]: (state, action) => {
    const reorder = action.payload
    const reorderItem = state.dashboardItems[reorder.start]
    let newDashboardItems = []
    state.dashboardItems.map((item, i) => {
      if(i === reorder.start) return

      if(reorder.end < reorder.start) {
        if(i === reorder.end) {
          newDashboardItems.push(reorderItem)
        }
        newDashboardItems.push(item)
      } else {
        newDashboardItems.push(item)
        if(i === reorder.end) {
          newDashboardItems.push(reorderItem)
        }
      }
    });
    state.dashboardItems = newDashboardItems
    return Object.assign({}, state)
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  visitsCount: 0,
  dashboardItems: [
  {key: 0, label: 'Angular'},
  {key: 1, label: 'jQuery'},
  {key: 2, label: 'Polyment'},
  {key: 3, label: 'ReactJS'},
  ]
}

export default function dashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
