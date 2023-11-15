'use client';

export default function GlobalError({
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html>
			<div className="w-[668px] h-[1446px] bg-pink-300">
				<div className="w-[524px] h-[365px] bg-white rounded-[67px]">
					<h2>Something went wrong!</h2>
					<a href="/error">다시 시도하기</a>
				</div>
			</div>
		</html>
	);
}
