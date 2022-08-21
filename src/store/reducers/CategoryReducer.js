import constants from '../../config/constants'

const initialState = {
  data: []
}
const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_CATEGORY_LIST':
      return {
        data: action.value
      }

    default:
      return { ...state }
  }
}
export default CategoryReducer
