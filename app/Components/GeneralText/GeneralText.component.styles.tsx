import Constant from "@/app/Constant";
import memoize from "fast-memoize";
import { TextStyle } from "react-native";
import { Size } from "../../Utils";

const { scaleFont } = Size;

const {
	GENERAL_TEXT: {
		VARIANTS: { SECTION_TITLE, SECTION_SUBTITLE, SECTION_DESCRIPTION },
	},
	COLORS: { GRAY },
} = Constant;

export default {
	[SECTION_TITLE]: memoize((textAlign: string) => ({
		fontSize: scaleFont(16),
		textAlign: textAlign as TextStyle["textAlign"],
	})),
	[SECTION_SUBTITLE]: memoize((textAlign: string) => ({
		fontSize: scaleFont(15),
		textAlign: textAlign as TextStyle["textAlign"],
	})),
	[SECTION_DESCRIPTION]: memoize((textAlign: string) => ({
		fontSize: scaleFont(15),
		color: GRAY,
		textAlign: textAlign as TextStyle["textAlign"],
	})),
};
