/* eslint-disable */
import axios from 'axios';

let API_BASE_URL
// API_BASE_URL = 'http://zapio-admin.com:8080/api';
API_BASE_URL = 'http://192.168.0.104:1234/api';

export let companyId1 = localStorage.getItem("company");
let companyId = localStorage.getItem("company");
export const isLoggedIn = () => localStorage.getItem("token");
export const userType = () => localStorage.getItem("usertype");

// For Authorization
function handlerError(error, callback) {
  console.log("eeeeeeeeeeee", error.message, error.status, error)
  if (error.message == "Network Error") {
    location.href = "/server";
  }
  if (error.response == undefined) {
    console.log(error)
  }
  else if (error.response.status == 500) {
    location.href = "/server";
  }
  else if (error.response.status == 401) {

    localStorage.removeItem("token");
    localStorage.removeItem("company");
    localStorage.removeItem("usertype");
    localStorage.removeItem("companyName");
    localStorage.removeItem("logo");
    localStorage.removeItem("__theme_color")
    location.href = "/";
  } else {
    callback && callback({
      status: 'error',
      response: error,
    });
  }
}
export const loginAPI = (username, password, callback) => {
  let url = `${API_BASE_URL}/admin/login/`;
  axios.post(url, {
    username: username, password: password
  }).then(response => {
    if (response.data["success"] == true) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("company", response.data.user_id);
      // localStorage.setItem("usertype", response.data.user_type);
      localStorage.setItem("companyName", response.data.name);
      localStorage.setItem("logo", response.data.logo);

    }
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const logoutAPI = (callback) => {
  let url = `${API_BASE_URL}/admin/logout/`;
  axios.post(url, {}, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    localStorage.removeItem("token");
    localStorage.removeItem("company");
    localStorage.removeItem("companyName");
    // localStorage.removeItem("usertype");
    localStorage.removeItem("logo");
    localStorage.removeItem("__theme_color")

    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changepasswordAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/brand_outlet/ChangePassword/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

// For Configuration

export const listDevicesAPI = (callback) => {
  let url = `${API_BASE_URL}/admin/list/device/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addDeviceAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/admin/qrcodegenerate/`;
  axios.post(url, payload, {
    headers: {
      Authorization: "Token " + localStorage.getItem("token"),
    }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addMaintenanceAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/admin/RegisterEmp/`;
  axios.post(url, payload, {
    headers: {
      Authorization: "Token " + localStorage.getItem("token"),
    }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listMaintenanceAPI = (callback) => {
  let url = `${API_BASE_URL}/admin/list/emp/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listCountryAPI = (callback) => {
  let url = `${API_BASE_URL}/admin/Configcountry/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listStateAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/admin/Configstate/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listCityAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/admin/Configcity/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const addLocationAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/admin/buildingCreateUpdate/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listLocationAPI = (callback) => {
  let url = `${API_BASE_URL}/admin/list/buildinglocation/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}
export const retrieveLocationAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/admin/buildingRetrieval/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changeLocationStatusAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/admin/action/buildinglocation/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getmantananceAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/admin/EmployeeRetrieval/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changeMantananceStatusAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/admin/action/EmployeeProfile/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listAccountHistoryAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/admin/history/account/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getDashboardMapDeviceAPI = (callback) => {
  let url = `${API_BASE_URL}/admin/dashboard/mapDevice/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}


export const changeDeviceStatusAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/admin/action/Device/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}
export const dashboardMapDeviceAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/admin/map/Device/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getEmployeeLocationAPI = (callback) => {
  let url = `${API_BASE_URL}/admin/EmployeeLocation/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listBuildingsAPI = (callback) => {
  let url = `${API_BASE_URL}/admin/activelist/building/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listAllotedPersonAPI = (callback) => {
  let url = `${API_BASE_URL}/admin/activelist/Mappedemp/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}
export const addTaskAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/admin/task/CreateUpdate/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listTasksAPI = (callback) => {
  let url = `${API_BASE_URL}/admin/list/task/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const changeTaskStatusAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/admin/action/Task/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getTaskAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/admin/taskRetrieval/`;
  axios.post(url, payload, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const listCardStaticsAPI = (callback) => {
  let url = `${API_BASE_URL}/admin/dashboard/card/`;
  axios.get(url, {
    headers: { Authorization: "Token " + localStorage.getItem("token") }
  }).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}

export const getEmployeeTodayLocationAPI = (payload, callback) => {
  let url = `${API_BASE_URL}/employee/TrackMap/`;
  axios.post(url, payload).then(response => {
    callback({
      status: 'success',
      response: response,
    });
  }).catch(error => {
    handlerError(error, callback);
  });
}