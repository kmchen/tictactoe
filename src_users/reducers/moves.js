// users reducer
export default function moves(state = {status: [Array(3).fill(null), Array(3).fill(null), Array(3).fill(null)]}, action) {
  switch (action.type) {
    case 'MAKE_MOVE':
      let newStatus = state.status;
      newStatus[action.payload.row][action.payload.col] = action.payload.result
      return {...state, status: newStatus};
    case 'INCREASE_GRID':
      newStatus = action.payload.status;
      return {...state, status: newStatus};
    default:
      return state;
  }
}
