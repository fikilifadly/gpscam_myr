import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

/**
 * get ratio device
 *
 * @returns {number} number of aspect ratio
 */
const getRatio = (): number => {
	let ratio = height / width;

	if (width > height) ratio = width / height;

	return ratio;
};

const isTablet = () => getRatio() <= 1.6;

const baseDevice = {
	width: 375,
	height: 670,
	pixelRation: 2,
	fontScale: 2,
};

const screenSize = {
	base: Math.sqrt(baseDevice.height * baseDevice.height + baseDevice.width * baseDevice.width),
	current: Math.sqrt(height * height + width * width),
};

/**
 * scaleSize
 *
 * @param {number} size - size
 * @returns {number} number of scaleSize
 */
export const scaleSize = (size: number): number => (size / screenSize.base) * screenSize.current;

/**
 * scaleWidth
 *
 * @param {number} width - width
 * @returns {number} number of scaleWidth
 */
export const scaleWidth = (width: number): number => (width / baseDevice.width) * width;

/**
 * scaleHeight
 *
 * @param {number} height - height
 * @returns {number} number of scaleHeight
 */
export const scaleHeight = (height: number): number => (height / baseDevice.height) * height;

/**
 * scaleFont
 *
 * @param {number} fontSize - fontSize
 * @returns {number} number of scaleSize
 */
export const scaleFont = (fontSize: number): number => (isTablet() ? fontSize : (fontSize / baseDevice.width) * width);

export default {
	scaleSize,
	scaleWidth,
	scaleHeight,
	scaleFont,
};
