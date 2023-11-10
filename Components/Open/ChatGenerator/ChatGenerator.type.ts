import { UseFormRegister } from 'react-hook-form';

export type Inputs = {
	name: string;
	users: string[];
};

export type RegisterFn = {
	register: UseFormRegister<Inputs>;
};
