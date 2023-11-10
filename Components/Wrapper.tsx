import React from 'react';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className="w-full sm:w-[425px] md:w-[645px] px-5 h-screen flex flex-col mx-auto bg-orange-300">
			{children}
		</section>
	);
};

export default Wrapper;
