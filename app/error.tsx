'use client';

export default function GlobalError({ reset }: { reset: () => void }) {
	return (
		<div className="w-[668px] h-[1446px] bg-pink-300">
			<div className="w-[524px] h-[365px] bg-white rounded-[67px]">
				<h2>Something went wrong!</h2>
				<button onClick={reset}>다시 시도하기</button>
			</div>
		</div>
	);
}
