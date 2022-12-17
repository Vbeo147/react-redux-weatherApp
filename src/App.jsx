import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "./modules/weatherReducer";
import { useState } from "react";

function App() {
  const [target, setTarget] = useState("");
  const { weatherReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const onChange = (e) => {
    setTarget(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(getWeather(target));
  };
  return (
    <div>
      {weatherReducer.weather.loading ? (
        <div>Loading...</div>
      ) : weatherReducer.weather.data ? (
        <>
          <div>{`[ ${weatherReducer.weather.data.sys.country} : ${weatherReducer.weather.data.name} ]`}</div>
          <div>{weatherReducer.weather.data.weather[0].main}</div>
        </>
      ) : (
        <div>
          {weatherReducer.weather.error ? weatherReducer.weather.error : ""}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <input onChange={onChange} type="text" placeholder="Search..." />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}

export default App;
