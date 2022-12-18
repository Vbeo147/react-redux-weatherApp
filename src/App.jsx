import { useDispatch, useSelector } from "react-redux";
import { getWeather, getMyWeatehr } from "./modules/weatherReducer";
import { useState, useEffect, useRef } from "react";
import "./index.css";

function App() {
  const [target, setTarget] = useState("");
  const {
    weatherReducer: { weather },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const onChange = (e) => {
    setTarget(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (target !== weather.data?.name) {
      dispatch(getWeather(target));
    }
    setTarget("");
  };

  useEffect(() => {
    const CurrentWeather = weather.data?.weather[0].main;
    const html = document.querySelector("html");
    inputRef.current.focus();
    if (CurrentWeather) {
      html.classList.add(`${CurrentWeather}-background`);
      html.classList.add("fade-in");
    }
    return () => {
      html.classList.remove(...html.classList);
    };
  }, [weather]);

  useEffect(() => {
    if (!weather.data) dispatch(getMyWeatehr());
  }, []);
  return (
    <div id="background-container">
      <div id="main-container">
        <div id="weather-container">
          {weather.loading ? (
            <div>Loading...</div>
          ) : weather.data ? (
            <div id="weather-info-container">
              <div className="weather-title">{`${weather.data.sys.country} ${weather.data.name}`}</div>
              <div className="weather-subtitle">
                <span>
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                    alt="weather icon"
                  ></img>
                </span>
                <span>{weather.data.weather[0].main}</span>
              </div>
            </div>
          ) : (
            <div>{weather.error ? weather.error : ""}</div>
          )}
        </div>

        <div id="form-container">
          <form onSubmit={onSubmit}>
            <input
              onChange={onChange}
              value={target}
              type="text"
              placeholder="Search..."
              required
              ref={inputRef}
            />
            <button type="submit">Enter</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
