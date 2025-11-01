import type { VoidFunction } from "../../Types/index.types";

export type ButtonTypes = {
	backgroundColor: string;
};

export type Props = {
	text: string;
	onPress: VoidFunction;
	type: string;
	isDisabled?: boolean;
};
