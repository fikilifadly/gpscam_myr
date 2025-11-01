import React from "react";

import Constant from "@/Constant";
import { TouchableOpacity, View } from "react-native";
import { GeneralText } from "../../Components";
import config from "./Button.component.config";
import styles from "./Button.component.styles";
import type { Props } from "./Button.types";

const {
	GENERAL_TEXT: {
		VARIANTS: { BUTTON },
		ALIGN,
	},
} = Constant;

const Button = (props: Props) => (
	<View style={styles.containerDisabled((props.isDisabled = false))}>
		<TouchableOpacity onPress={props.onPress} style={styles.container(props.type)}>
			<GeneralText text={props.text} variant={BUTTON} textAlign={ALIGN.CENTER} type={props.type} />
		</TouchableOpacity>
	</View>
);

Button.displayName = config.displayName;

export default Button;
