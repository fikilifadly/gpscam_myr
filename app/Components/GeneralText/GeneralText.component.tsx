import * as React from "react";

import { Text, View } from "react-native";
import config from "./GeneralText.component.config";
import styles from "./GeneralText.component.styles";
import type { Props } from "./GeneralText.types";

const GeneralText = ({ text, textAlign, variant }: Props) => (
	<View>
		<Text style={styles[variant](textAlign)}>{text}</Text>
	</View>
);

GeneralText.displayName = config.displayName;

export default GeneralText;
