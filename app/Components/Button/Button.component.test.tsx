import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import Button from "./Button.component";

jest.mock("../../Components", () => ({
	GeneralText: jest.fn(({ text }) => <>{text}</>),
}));

jest.mock("./Button.component.styles", () => ({
	containerDisabled: jest.fn(() => ({ opacity: 1 })),
	container: jest.fn(() => ({})),
}));

describe("Button Component", () => {
	const props = {
		text: "Test Button",
		onPress: jest.fn(),
		type: "primary",
		isDisabled: false,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("renders correctly with required props", () => {
		const { getByText } = render(<Button {...props} />);

		expect(getByText("Test")).toBeTruthy();
	});

	it("renders correctly with all props", () => {
		const { getByText } = render(<Button {...props} />);
		expect(getByText("Test Button")).toBeTruthy();
	});

	it("calls onPress when pressed", () => {
		const { getByText } = render(<Button {...props} />);
		fireEvent.press(getByText("Test Button"));
		expect(props.onPress).toHaveBeenCalledTimes(1);
	});

	it("renders with disabled styles when isDisabled is true", () => {
		const { getByText } = render(<Button {...props} isDisabled={true} />);
		expect(getByText("Test Button")).toBeTruthy();
	});
});
