import axios from "axios";
import moment from "moment";

export {
  LOGIN_IN_PROGRESS,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  login
} from "./loginActions";
export {
  SIGNUP_IN_PROGRESS,
  SIGN_UP_SUCCESS,
  createUser
} from "./signUpActions";
export {
  REQUEST_IN_PROGRESS,
  PLANT_REQUEST_SUCCESS,
  getPlantList
} from "./listActions";
export { handleUpdate, updatePlant, cancelUpdate } from "./updateActions";
export { deletePlant } from "./deleteActions";
export { getPlant } from "./plantActions";

export const ADD_PLANT_START = "ADD_PLANT_START";
export const ADD_PLANT_SUCCESS = "ADD_PLANT_SUCCESS";
export const ADD_PLANT_FAILURE = "ADD_PLANT_FAILURE";

export const addPlant = newPlant => dispatch => {
  dispatch({ type: ADD_PLANT_START });

  return axios
    .post("https://api-watermyplants.herokuapp.com/api/plants", newPlant)
    .then(res => {
      console.log("HERE!!!", res.data);
      dispatch({
        type: ADD_PLANT_SUCCESS,
        payload: res.data
      });
      const notifications = createNotifications(
        newPlant.startDate,
        newPlant.interval
      );
      console.log(notifications);
      for (let i = 0; i < notifications.length; i++) {
        axios
          .post(
            "https://api-watermyplants.herokuapp.com/api/notifications",
            bulkNotifications
          )
          .then(notification => console.log(notification));
      }
    })
    .catch(err => {
      dispatch({
        type: ADD_PLANT_FAILURE,
        payload: err
      });
    });
};

function createNotifications(startDate, interval) {
  const notifications = [];
  for (let i = 0; i < 10; i++) {
    console.log(i, JSON.stringify(startDate), interval * i);
    notifications.push(
      moment(
        (Number(JSON.stringify(startDate)) + 86400000 * interval * i)
          .toString()
          .substring(0, 12)
      )
    );
  }
  return notifications;
}
