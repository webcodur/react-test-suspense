import { useState, useEffect, lazy } from "react";
import { Suspense } from "react";

const TestComp = lazy(() => import("./components/TestComp")); // Lazy-loaded

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/1`)
      .then((response) => response.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<h1>fallback element</h1>}>
        {!loading && <TestComp data={data} />}
      </Suspense>
    </div>
  );
}

export default App;
