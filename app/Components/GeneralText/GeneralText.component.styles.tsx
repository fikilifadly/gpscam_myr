import Constant from "@/Constant";
import memoize from "fast-memoize";
import { Size } from "../../Utils";

const { scaleFont } = Size;

const {
	GENERAL_TEXT: {
		VARIANTS: { SECTION_TITLE, SECTION_SUBTITLE, SECTION_DESCRIPTION, BUTTON },
		ALIGN,
	},
	BUTTON: {
		TYPES: { PRIMARY },
	},
	COLORS,
} = Constant;

export default {
	[SECTION_TITLE]: memoize((argsAlign = ALIGN.LEFT) => ({
		fontSize: scaleFont(16),
		textAlign: argsAlign,
	})),
	[SECTION_SUBTITLE]: memoize((argsAlign = ALIGN.LEFT) => ({
		fontSize: scaleFont(15),
		textAlign: argsAlign,
	})),
	[SECTION_DESCRIPTION]: memoize((argsAlign = ALIGN.LEFT) => ({
		fontSize: scaleFont(15),
		color: COLORS.GRAY,
		textAlign: argsAlign,
	})),
	[BUTTON]: memoize((argsAlign, type: string) => ({
		fontSize: scaleFont(13),
		color: type === PRIMARY ? COLORS.WHITE : COLORS.BLACK,
		textAlign: ALIGN.CENTER,
	})),
};
