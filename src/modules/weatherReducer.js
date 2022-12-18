import { reducerUtils } from "../lib/asyncUtils";
import axios from "axios";

const GET_WEATHER = "GET_WEATHER";
const GET_WEATHER_SUCCESS = "GET_WEATHER_SUCCESS";
const GET_WEATHER_ERROR = "GET_WEATHER_ERROR";

const ActionDispatch = (type, param) => {
  if (param) {
    return { type, param };
  } else {
    return { type };
  }
};

export const getWeather = (target) => async (dispatch) => {
  dispatch(ActionDispatch(GET_WEATHER));
  await axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${target}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }`
    )
    .then((weather) => {
      dispatch(ActionDispatch(GET_WEATHER_SUCCESS, weather.data));
    })
    .catch((error) =>
      dispatch(ActionDispatch(GET_WEATHER_ERROR, error.response.data.message))
    );
};

export const getMyWeatehr = () => (dispatch) => {
  dispatch(ActionDispatch(GET_WEATHER));
  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }`
      )
      .then((weather) =>
        dispatch(ActionDispatch(GET_WEATHER_SUCCESS, weather.data))
      )
      .catch((error) =>
        dispatch(ActionDispatch(GET_WEATHER_ERROR, error.response.data.message))
      );
  });
};

const initialState = {
  weather: {
    loading: false,
    data: null,
    error: null,
  },
};

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WEATHER:
      return { ...state, weather: reducerUtils.loading() };
    case GET_WEATHER_SUCCESS:
      return {
        ...state,
        weather: reducerUtils.success(action.param),
      };
    case GET_WEATHER_ERROR:
      return {
        ...state,
        weather: reducerUtils.error(action.param),
      };
    default:
      return state;
  }
}
