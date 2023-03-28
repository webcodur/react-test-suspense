import { useState, useEffect } from "react";
import TestComp from "./components/TestComp";
import { Suspense } from "react";

function App() {
  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState(null);

  const getData = () => {
    const suspender = fetch(`https://jsonplaceholder.typicode.com/todos/1`)
      .then((response) => response.json())
      .then((res) => setData(res));

    return {
      kkk() {
        if (data === null) {
          throw suspender;
        } else {
          return data;
        }
      },
    };
  };

  return (
    <div className="App">
      <Suspense fallback={<h1>fallback element</h1>}>
        <TestComp data={getData()} />
      </Suspense>
    </div>
  );
}

export default App;
