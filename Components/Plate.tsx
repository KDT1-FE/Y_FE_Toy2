import React from 'react';

const Plate = ({ children }: { children: React.ReactNode }) => {
	return (
		<section className="w-2/3 h-screen flex flex-col mx-auto bg-orange-300">
			{children}
		</section>
	);
};

export default Plate;
