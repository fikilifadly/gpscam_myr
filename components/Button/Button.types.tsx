import type { VoidFunction } from "../../types/index.";

export type ButtonTypes = {
	backgroundColor: string;
};

export type Props = {
	text: string;
	onPress: VoidFunction;
	type: string;
	isDisabled?: boolean;
};
