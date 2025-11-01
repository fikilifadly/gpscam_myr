export type TextAlign = "left" | "center" | "right" | "justify" | "auto" | (string & {});

export type Props = {
	text: string;
	textAlign?: TextAlign;
	variant: string;
	type?: string;
};
