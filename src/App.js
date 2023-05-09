import { useState, useEffect, lazy, Suspense } from "react";
import useIntersectionObserver from "../src/hooks/useIntersectionObserver";

const TestComp = lazy(() => import("./components/TestComp")); // Lazy-loaded
const blackBackGround = {
  color: "yellow",
  backgroundColor: "black",
  width: "300px",
  height: "100px",
  lineHeight: "100px",
};

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAppeared, setIsAppeared] = useState(false);

  const getData = async () => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/1`)
      .then((response) => response.json())
      .then((res) => {
        setData(res);
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  // SET OBSERVER
  const onIntersect = async ([{ isIntersecting }]) => {
    if (isIntersecting) {
      setIsAppeared(true);
    }
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });
  useEffect(() => {
    if (isAppeared) {
      getData();
    }
  }, [isAppeared]);

  return (
    <div className="App">
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <h1>hello</h1>
      <div ref={setTarget} style={blackBackGround}>
        <Suspense fallback={<h1>loading</h1>}>
          {!isLoading && <TestComp data={data} />}
        </Suspense>
      </div>
    </div>
  );
}

export default App;
