import language from "../language/language";

export const _lang = (value, lang = "english") => {
  return language(value, lang);
};

export const userId = {
  set: val => {
    localStorage.setItem("wehear_user", val);
  },
  get: () => {
    return localStorage.getItem("wehear_user");
  },
  remove: () => {
    localStorage.removeItem("wehear_user");
  }
};

export const accessToken = {
  set: val => {
    localStorage.setItem("wehear_access_token", val);
  },
  get: () => {
    return localStorage.getItem("wehear_access_token");
  },
  remove: () => {
    localStorage.removeItem("wehear_access_token");
  }
};

export const refreshToken = {
  set: val => {
    localStorage.setItem("wehear_refresh_token", val);
  },
  get: () => {
    return localStorage.getItem("wehear_refresh_token");
  },
  remove: () => {
    localStorage.removeItem("wehear_refresh_token");
  }
};

export const getHeaders = () => {
  return {
    Authorization: `Bearer ${accessToken.get()}`
  };
};
export const logOut = () => {
  refreshToken.remove();
  accessToken.remove();
  userId.remove();
};

export const isEmail = val => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val.trim());
};
export const isValidGST = gstinVal => {
  //   var reggst = new RegExp('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]1}[1-9A-Z]{1}Z[0-9A-Z]{1}$');
  //   if (!reggst.test(gstinVal) && gstinVal != "") {
  //     return false;
  //   } else {
  //     return true;
  //   }
  return true;
};
export const isAllowedPhone = val => {
  return !isNaN(val) && val.length <= 10;
};

export function getKeyByValue(object, value) {
  return Object.keys(object).find(
    key => object[key].toString() === value.toString()
  );
}
export const getObjectBykey = (key = "", value = "", arr = []) => {
  for (let row of arr) {
    if (row[key] && row[key] == value) {
      return row;
    }
  }
  return "";
};

export const dateToDDMMYYYY = date => {
  const dateObj = new Date(date);

  return (
    addZeroPrefix(dateObj.getDate()) +
    "-" +
    addZeroPrefix(dateObj.getMonth() + 1) +
    "-" +
    addZeroPrefix(dateObj.getFullYear())
  );
};
export const addZeroPrefix = (val, length = 2) => {
  let strVal = val.toString();
  while (strVal.length < length) {
    strVal = "0" + strVal;
  }
  return strVal;
};

export const getDateFiltersTime = value => {
  let date = new Date();
  let startDate = date.getTime();
  let endDate = date.getTime();

  switch (value) {
    case "this_week":
      {
        const currentDay = date.getDay();
        startDate = startDate - currentDay * 3600 * 1000 * 24;
        const temp = new Date(startDate);
        startDate = new Date(
          temp.getFullYear(),
          temp.getMonth(),
          temp.getDate()
        ).getTime();
      }
      break;
    case "this_month":
      {
        const temp = new Date(startDate);
        startDate = new Date(temp.getFullYear(), temp.getMonth()).getTime();
      }
      break;
    case "this_year":
      {
        const temp = new Date(startDate);
        startDate = new Date(temp.getFullYear()).getTime();
      }
      break;

    case "last_month":
      {
        const temp = new Date(startDate);
        startDate = new Date(temp.getFullYear(), temp.getMonth() - 1).getTime();
        endDate = new Date(temp.getFullYear(), temp.getMonth()).getTime();
      }
      break;
    case "last_year":
      {
        const temp = new Date(startDate);
        startDate = new Date(temp.getFullYear() - 1).getTime();
        endDate = new Date(temp.getFullYear()).getTime();
      }
      break;
    case "last_week":
      {
        const currentDay = date.getDay();
        endDate = endDate - currentDay * 3600 * 1000 * 24;
        startDate = endDate - 7 * 3600 * 1000 * 24;
        const temp = new Date(endDate);
        const tempStart = new Date(startDate);
        endDate = new Date(
          temp.getFullYear(),
          temp.getMonth(),
          temp.getDate()
        ).getTime();
        startDate = new Date(
          tempStart.getFullYear(),
          tempStart.getMonth(),
          tempStart.getDate()
        ).getTime();
      }
      break;
    case "today":
      {
        startDate = new Date(startDate);
        startDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        ).getTime();
      }
      break;
    case "yesterday":
      {
        
        startDate = startDate - (1000 * 60 * 60 * 24);
        startDate = new Date(startDate);
        startDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth(),
          startDate.getDate()
        ).getTime();
        endDate = new Date(endDate);
        endDate = new Date(
          endDate.getFullYear(),
          endDate.getMonth(),
          endDate.getDate()
        ).getTime();
      }
      break;
    default: {
      const noOfDays = parseInt(value);

      startDate = startDate - noOfDays * 3600 * 1000 * 24;
      const temp = new Date(startDate);
      startDate = new Date(
        temp.getFullYear(),
        temp.getMonth(),
        temp.getDate()
      ).getTime();
    }
  }

  return {
    startDate: startDate,
    endDate: endDate
  };
};
