export const selectCurrentUserAction = data => {
  return {
    type: 'SELECT_USER',
    value: data
  }
}
export const removeCurrentUserAction = data => {
  return {
    type: 'REMOVE_USER',
    value: data
  }
}
