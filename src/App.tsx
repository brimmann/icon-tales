import { useCounterStore } from "./store";

function App() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="card bg-white w-96 shadow-sm">
        <div className="card-body mx-auto">
          <h2 className="card-title text-black">{count}</h2>
          <div className="card-actions justify-between">
            <button className="btn btn-primary" onClick={increment}>
              Increase
            </button>
            <button className="btn btn-primary" onClick={decrement}>
              Decrease
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
