import * as React from "react";

import Constant from "@/Constant";
import { Text, View } from "react-native";
import config from "./GeneralText.component.config";
import styles from "./GeneralText.component.styles";
import type { Props } from "./GeneralText.types";

const {
	GENERAL_TEXT: {},
	BUTTON: {
		TYPES: { PRIMARY },
	},
} = Constant;

/**
 * GeneralText
 *
 * @returns {React.ReactElement } GeneralText Component
 */
const GeneralText = ({ text, textAlign, variant, type = PRIMARY }: Props): React.ReactElement => (
	<View>
		<Text style={styles[variant](textAlign, type)}>{text}</Text>
	</View>
);

GeneralText.displayName = config.displayName;

export default GeneralText;
