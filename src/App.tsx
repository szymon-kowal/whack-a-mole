import { useEffect, useState } from 'react';
import './styles/index.css';
import { v4 as uuidv4 } from 'uuid';

type ActiveArrayProps = {
	id: string;
	bool: boolean;
};

const startArray = Array.from({ length: 9 }, () => ({
	id: uuidv4(),
	bool: false,
}));

const TIMEOUT_VAL = 1000;

function App({ randomNumberGenerator = () => Math.floor(Math.random() * 9) }) {
	const [count, setCount] = useState<number>(0);
	const [activeBtnArr, setActiveBtnArr] =
		useState<ActiveArrayProps[]>(startArray);

	function handleSetActiveBtnArr(): void {
		const randomNum: number = randomNumberGenerator();
		const newActiveBtnArr = activeBtnArr.map((item, idx) => {
			if (idx !== randomNum) {
				return { ...item, bool: false };
			} else {
				return { ...item, bool: true };
			}
		});
		setActiveBtnArr(newActiveBtnArr);
	}

	useEffect(() => {
		const gameTick = setTimeout(() => {
			handleSetActiveBtnArr();
			console.log('tick');
		}, TIMEOUT_VAL);
		return () => clearTimeout(gameTick);
	}, [activeBtnArr]);

	return (
		<div className="min-h-screen bg-gray-800 text-white container mx-auto p-4 flex flex-col">
			<div className="text-xl font-bold text-center mb-4">
				Whack-a-Mole Game
			</div>
			<div className="score mb-4">Score: {count}</div>
			<div className="grid grid-cols-3 gap-4 flex-1">
				{activeBtnArr.map(item => (
					<button
						key={item.id}
						className={`p-4
								${item.bool ? 'bg-green-500' : 'bg-gray-500'}
							 hover:bg-blue-500 transition-colors`}
						onClick={() => {
							if (item.bool) {
								setCount(prev => prev + 1);
								handleSetActiveBtnArr();
							}
						}}
					></button>
				))}
			</div>
			<div className="footer text-center mt-4">Good luck!</div>
		</div>
	);
}

export default App;
