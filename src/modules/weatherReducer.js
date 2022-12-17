const GET_WEATHER = "GET_WEATHER";
const GET_WEATHER_SUCCESS = "GET_WEATHER_SUCCESS";
const GET_WEATHER_ERROR = "GET_WEATHER_ERROR";

export const getWeather = () => async (dispatch) => {
  dispatch({ type: GET_WEATHER });
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
      return { ...state, weather: { loading: false, data: null, error: null } };
    case GET_WEATHER_ERROR:
      return { ...state, weather: { loading: false, data: null, error: null } };
    default:
      return state;
  }
}
