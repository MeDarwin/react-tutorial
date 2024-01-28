import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { decrement, incByAmount, increment, reset } from "../reducer/counterSlice";

const Index = () => {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <div className="container m-auto row">
      <div className="display-1 w-100 col-12">{count}</div>
      <div className="col d-flex gap-3">
        <button className="btn btn-success" onClick={() => dispatch(increment())}>
          +
        </button>
        <button className="btn btn-danger" onClick={() => dispatch(decrement())}>
          -
        </button>
        <button className="btn btn-primary" onClick={() => dispatch(incByAmount(count))}>
          Increment by {count}
        </button>
        <button className="btn btn-warning" onClick={() => dispatch(reset())}>
          Reset
        </button>
        <Link to={"/pokemon"} className="btn btn-dark ms-auto">See Pokemon Demo</Link>
        <Link to={"/jsonplaceholder"} className="btn btn-dark ms-auto">See JSONPlaceholder Demo</Link>
      </div>
    </div>
  );
};

export default Index;
