import language from '../language/language'
import constants from './constants'

export const _lang = (value, lang = 'english') => {
  return language(value, lang)
}

// export const userId = {
//   set: val => {
//     localStorage.setItem('wehear_user', val)
//   },
//   get: () => {
//     return localStorage.getItem('wehear_user')
//   },
//   remove: () => {
//     localStorage.removeItem('wehear_user')
//   }
// }

export const accessToken = {
  set: val => {
    localStorage.setItem('wehear_access_token', val)
  },
  get: () => {
    return localStorage.getItem('wehear_access_token')
  },
  remove: () => {
    localStorage.removeItem('wehear_access_token')
  }
}

export const refreshToken = {
  set: val => {
    localStorage.setItem('wehear_refresh_token', val)
  },
  get: () => {
    return localStorage.getItem('wehear_refresh_token')
  },
  remove: () => {
    localStorage.removeItem('wehear_refresh_token')
  }
}

export const getHeaders = () => {
  return {
    Authorization: `Bearer ${accessToken.get()}`
  }
}
export const logOut = () => {
  refreshToken.remove()
  accessToken.remove()
  
}

export const isEmail = val => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val.trim())
}
export const isValidGST = gstinVal => {
  //   var reggst = new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]1}[1-9A-Z]{1}Z[0-9A-Z]{1}$');
  //   if (!reggst.test(gstinVal) && gstinVal != "") {
  //     return false;
  //   } else {
  //     return true;
  //   }
  return true
}
export const isAllowedPhone = val => {
  return !isNaN(val) && val.length <= 10
}

export function getKeyByValue (object, value) {
  return Object.keys(object).find(
    key => object[key].toString() === value.toString()
  )
}
export const getObjectBykey = (key = '', value = '', arr = []) => {
  for (let row of arr) {
    if (row[key] && row[key] == value) {
      return row
    }
  }
  return ''
}

export const dateToDDMMYYYY = date => {
  const dateObj = new Date(date)

  return (
    addZeroPrefix(dateObj.getDate()) +
    '-' +
    addZeroPrefix(dateObj.getMonth() + 1) +
    '-' +
    addZeroPrefix(dateObj.getFullYear())
  )
}
export const addZeroPrefix = (val, length = 2) => {
  let strVal = val.toString()
  while (strVal.length < length) {
    strVal = '0' + strVal
  }
  return strVal
}

export const getDateFiltersTime = value => {
  let date = new Date()
  let startDate = date.getTime()
  let endDate = date.getTime()

  switch (value) {
    case 'this_week':
      {
        const currentDay = date.getDay()
        startDate = startDate - currentDay * 3600 * 1000 * 24
        const temp = new Date(startDate)
        startDate = new Date(
          temp.getFullYear(),
          temp.getMonth(),
          temp.getDate()
        ).getTime()
      }
      break
    case 'this_month':
      {
        const temp = new Date(startDate)
        startDate = new Date(temp.getFullYear(), temp.getMonth()).getTime()
      }
      break
    case 'this_year':
      {
        const temp = new Date(startDate)
        startDate = new Date(temp.getFullYear()).getTime()
      }
      break

    case 'last_month':
      {
        const temp = new Date(startDate)
        startDate = new Date(temp.getFullYear(), temp.getMonth() - 1).getTime()
        endDate = new Date(temp.getFullYear(), temp.getMonth()).getTime()
      }
      break
    case 'last_year':
      {
        const temp = new Date(startDate)
        startDate = new Date(temp.getFullYear() - 1).getTime()
        endDate = new Date(temp.getFullYear()).getTime()
      }
      break
    case 'last_week':
      {
        const currentDay = date.getDay()
        endDate = endDate - currentDay * 3600 * 1000 * 24
        startDate = endDate - 7 * 3600 * 1000 * 24
        const temp = new Date(endDate)
        const tempStart = new Date(startDate)
        endDate = new Date(
          temp.getFullYear(),
          temp.getMonth(),
          temp.getDate()
        ).getTime()
        startDate = new Date(
          tempStart.getFullYear(),
          tempStart.getMonth(),
          tempStart.getDate()
        ).getTime()
      }
      break
    case 'today':
      {
        startDate = new Date(startDate)

        startDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        ).getTime()
        endDate = startDate + 1000 * 60 * 60 * 24
      }
      break
    case 'yesterday':
      {
        startDate = startDate - 1000 * 60 * 60 * 24
        startDate = new Date(startDate)
        startDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        ).getTime()
        endDate = new Date(endDate)
        endDate = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate()
        ).getTime()
      }
      break
    default: {
      const noOfDays = parseInt(value)

      startDate = startDate - noOfDays * 3600 * 1000 * 24
      const temp = new Date(startDate)
      startDate = new Date(
        temp.getFullYear(),
        temp.getMonth(),
        temp.getDate()
      ).getTime()
    }
  }

  return {
    startDate: startDate,
    endDate: endDate
  }
}

// role will define role of logged-in users
// accessarea are constant define to check which page
//has_not_access is defined because when there is condition like that this roles are not allowed
export const accessControllByRole = (
  role,
  accessarea,
  has_not_access = false
) => {
  let roles = []

  switch (accessarea) {
    case 'USERS_PAGE':
      roles = [
        constants.user_role.ADMIN,
        constants.user_role.SUPER_ADMIN,
        constants.user_role.DESTRIBUTOR_ROLE
      ]
      break
    case 'CHANNEL_STOCK':
      roles = [
       
        constants.user_role.RETELLER_ROLE
      ]
      break
    case 'STORE_AND_DESTRIBUTOR_TRANSFER_BUTTON':
      roles = [
        constants.user_role.ADMIN,
        constants.user_role.SUPER_ADMIN,
        constants.user_role.PRODUCT_MANAGER
      ]
      break
    case 'RETAILLER_TRANSFER_BUTTON':
      roles = [
        constants.user_role.ADMIN,
        constants.user_role.SUPER_ADMIN,
        constants.user_role.PRODUCT_MANAGER,
        constants.user_role.DESTRIBUTOR_ROLE,
        constants.user_role.PRODUCT_MANAGER
      ]
      break
    case 'SELL_BUTTON':
      roles = [
        constants.user_role.ADMIN,
        constants.user_role.SUPER_ADMIN,
        constants.user_role.PRODUCT_MANAGER,
        constants.user_role.RETELLER_ROLE,
        
      ]
      break
      case 'IMPORT_BUTTON':
        roles = [
          constants.user_role.ADMIN,
          constants.user_role.SUPER_ADMIN,
          constants.user_role.PRODUCT_MANAGER,
          
        ]
        break
    case 'RETE_DES_CHANNEL_TOGGLE_BTN':
      roles = [
        constants.user_role.RETELLER_ROLE,
        constants.user_role.DESTRIBUTOR_ROLE
      ]
      break
    case 'MASS_TRANSFER':
      roles = [constants.user_role.RETELLER_ROLE]
      break
    case 'PRODUCT_PAGE':
      roles = [constants.user_role.SUPER_ADMIN, constants.user_role.ADMIN]
      break
    case 'LOCATION_CELL_SHOW':
      roles = [constants.user_role.DESTRIBUTOR_ROLE]
      break
  }

  if (!has_not_access) {
    return roles.includes(parseInt(role))
  }
  return !roles.includes(parseInt(role))
}
