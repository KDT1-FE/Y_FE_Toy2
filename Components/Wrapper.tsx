import React from 'react';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className="w-full sm:w-[425px] md:w-[645px] px-5 h-screen flex flex-col mx-auto bg-orange-300">
			<header className="flex h-10 justify-between items-center bg-blue-700">
				헤더
			</header>
			{children}
		</section>
	);
};

export default Wrapper;
