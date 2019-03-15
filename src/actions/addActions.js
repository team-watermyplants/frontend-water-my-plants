import axios from "axios";
import moment from "moment";

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
      const bulkNotifications = notifications.map(notification => ({
        userId: Number(newPlant.userId),
        plantId: Number(res.data[0].id),
        smsDelivered: false,
        notificationTime: moment(Number(notification)).format(
          "YYYY-MM-DD hh:mm a"
        )
      }));

      axios
        .post(
          "https://api-watermyplants.herokuapp.com/api/notifications",
          bulkNotifications
        )
        .then(notification => console.log(notification));
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
    notifications.push(
      (Number(JSON.stringify(startDate)) + 86400000 * interval * i).toString()
    );
  }
  return notifications;
}
