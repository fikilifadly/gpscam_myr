import memoize from "fast-memoize";

import { Size } from "../../utils";
import type { ButtonTypes } from "./Button.types";

import Constants from "@/constants";

const { scaleSize } = Size;

const {
	BUTTON: { TYPES },
	COLORS,
} = Constants;

/**
 * getTypes
 *
 * @param {string} type - type of button
 * @returns {ButtonTypes}
 */
const getTypes = (type: string): ButtonTypes => {
	const DATA = {
		[TYPES.PRIMARY]: {
			backgroundColor: COLORS.PRIMARY,
		},
		[TYPES.SECONDARY]: {
			backgroundColor: COLORS.PRIMARY,
		},
	};

	return DATA[type];
};

export default {
	containerDisabled: memoize((isDisabled: boolean) => ({
		opacity: isDisabled ? 0.5 : 1,
	})),
	container: memoize((type) => ({
		borderRadius: scaleSize(5),
		borderWidth: scaleSize(1),
		alignItems: "center" as const,
		justifyContent: "center" as const,
		...getTypes(type),
	})),
};
