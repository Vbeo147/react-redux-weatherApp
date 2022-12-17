import { useDispatch, useSelector } from "react-redux";
import { increaseAsync, decreaseAsync } from "./modules/counterReducer";
import { getWeather } from "./modules/weatherReducer";

function App() {
  const { counterReducer, weatherReducer } = useSelector((state) => state);
  const dispatch = useDispatch();
  const onIncrease = () => {
    dispatch(increaseAsync());
    dispatch(getWeather());
  };
  const onDecrease = () => {
    dispatch(decreaseAsync());
  };
  return (
    <div>
      <div>{!weatherReducer.weather.loading && counterReducer.value}</div>
      <div>
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
      <br />
      <form>
        <input type="text" placeholder="Search..." />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
}

export default App;
