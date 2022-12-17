const GET_WEATHER = "GET_WEATHER";
const GET_WEATHER_SUCCESS = "GET_WEATHER_SUCCESS";
const GET_WEATHER_ERROR = "GET_WEATHER_ERROR";

export const getWeather = (target) => async (dispatch) => {
  dispatch({ type: GET_WEATHER });
  await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${target}&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        throw new Error(data.message);
      } else {
        dispatch({ type: GET_WEATHER_SUCCESS, data });
      }
    })
    .catch((error) =>
      dispatch({ type: GET_WEATHER_ERROR, error: error.message })
    );
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
      return { ...state, weather: { loading: true, data: null, error: null } };
    case GET_WEATHER_SUCCESS:
      return {
        ...state,
        weather: { loading: false, data: action.data, error: null },
      };
    case GET_WEATHER_ERROR:
      return {
        ...state,
        weather: { loading: false, data: null, error: action.error },
      };
    default:
      return state;
  }
}
