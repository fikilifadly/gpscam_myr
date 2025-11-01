import Constant from "@/Constant";
import { render } from "@testing-library/react-native";
import React from "react";
import GeneralText from "./GeneralText.component";
const {
	GENERAL_TEXT: {
		VARIANTS: { SECTION_TITLE },
		ALIGN: { CENTER },
	},
	BUTTON: {
		TYPES: { PRIMARY },
	},
} = Constant;

describe("GeneralText Component", () => {
	const props = {
		text: "Hello World",
		variant: SECTION_TITLE,
	};

	afterEach(() => {
		jest.clearAllMocks();
	});

	it("renders text correctly with default props", () => {
		const { getByText } = render(<GeneralText {...props} />);

		expect(getByText("Hello World")).toBeTruthy();
	});

	it("renders text correctly with complete props", () => {
		const newProps = {
			...props,
			type: PRIMARY,
		};

		const { getByText } = render(<GeneralText {...newProps} />);

		expect(getByText("Hello World")).toBeTruthy();
	});
});
