import { useState, useEffect, lazy, Suspense } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const LazyTargetComp = lazy(() => import('./LazyTargetComp')); // Lazy-loaded
const blackBackGround = {
	color: 'yellow',
	backgroundColor: 'black',
	width: '300px',
	height: '100px',
	lineHeight: '100px',
};

function LazyTestComp() {
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

	const style = {
		width: '550px',
		margin: '0 auto',
	};

	return (
		<div className="App" style={style}>
			<h1>LAZY & SUSPENSE 테스트 PROJECT</h1>
			<p>(LAZY + OBSERVER 처리)</p>
			<p>개발자도구 네트워크 설정 : SLOW 3G 지정 + 새로고침</p>
			<p> =>변화상태를 쉽게 확인할 수 있습니다</p>
			<div ref={setTarget} style={blackBackGround}>
				<Suspense fallback={<h1>loading</h1>}>
					{!isLoading && <LazyTargetComp data={data} />}
				</Suspense>
			</div>
		</div>
	);
}

export default LazyTestComp;
