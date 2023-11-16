import { UseFormRegister } from 'react-hook-form';

export type Inputs = {
	name: string;
	users: string[];
	isPrivate?: boolean;
};

export type RegisterFn = {
	register: UseFormRegister<Inputs>;
};
