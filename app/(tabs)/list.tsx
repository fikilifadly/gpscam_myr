import GeneralText from "@/components/GeneralText/GeneralText.component";
import { SafeAreaView } from "react-native-safe-area-context";

import Constant from "@/constants";

const {
	GENERAL_TEXT: {
		VARIANTS: { SECTION_TITLE },
	},
} = Constant;

export default function HomeScreen() {
	return (
		<SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1 }}>
			<GeneralText text="List data" variant={SECTION_TITLE} />
		</SafeAreaView>
	);
}
