/**
 * Typography constants for consistent text styling across the app
 * Based on design system principles
 */

const TYPOGRAPHY = {
  FONT_SIZE_XXXS: 10,
  FONT_SIZE_XXS: 12,
  FONT_SIZE_XS: 14,
  FONT_SIZE_SM: 16,
  FONT_SIZE_MD: 18,
  FONT_SIZE_LG: 20,
  FONT_SIZE_XL: 24,
  FONT_SIZE_XXL: 28,
  FONT_SIZE_XXXL: 32,
  FONT_SIZE_DISPLAY: 40,
  FONT_WEIGHT_LIGHT: '300',
  FONT_WEIGHT_REGULAR: '400',
  FONT_WEIGHT_MEDIUM: '500',
  FONT_WEIGHT_SEMIBOLD: '600',
  FONT_WEIGHT_BOLD: '700',
  FONT_WEIGHT_EXTRABOLD: '800',
  LINE_HEIGHT_TIGHT: 1.2,
  LINE_HEIGHT_NORMAL: 1.4,
  LINE_HEIGHT_COMFORTABLE: 1.6,
  LINE_HEIGHT_LOOSE: 1.8,
  LETTER_SPACING_TIGHT: -0.5,
  LETTER_SPACING_NORMAL: 0,
  LETTER_SPACING_WIDE: 0.5,
  LETTER_SPACING_WIDER: 1,
  TEXT_TRANSFORM_NONE: 'none',
  TEXT_TRANSFORM_UPPERCASE: 'uppercase',
  TEXT_TRANSFORM_LOWERCASE: 'lowercase',
  TEXT_TRANSFORM_CAPITALIZE: 'capitalize',
  TEXT_DECORATION_NONE: 'none',
  TEXT_DECORATION_UNDERLINE: 'underline',
  TEXT_DECORATION_LINETHROUGH: 'line-through',
  TEXT_ALIGN_LEFT: 'left',
  TEXT_ALIGN_CENTER: 'center',
  TEXT_ALIGN_RIGHT: 'right',
  TEXT_ALIGN_JUSTIFY: 'justify',
  FONT_FAMILY_PRIMARY: 'System',
  FONT_FAMILY_SECONDARY: 'System',
  FONT_FAMILY_MONOSPACE: 'System',
  TEXT_STYLES: {
    HEADER_LARGE: {
      fontSize: 'FONT_SIZE_XXXL',
      fontWeight: 'FONT_WEIGHT_BOLD',
      lineHeight: 'LINE_HEIGHT_TIGHT',
    },
    HEADER_MEDIUM: {
      fontSize: 'FONT_SIZE_XL',
      fontWeight: 'FONT_WEIGHT_SEMIBOLD',
      lineHeight: 'LINE_HEIGHT_TIGHT',
    },
    HEADER_SMALL: {
      fontSize: 'FONT_SIZE_LG',
      fontWeight: 'FONT_WEIGHT_SEMIBOLD',
      lineHeight: 'LINE_HEIGHT_NORMAL',
    },
    BODY_LARGE: {
      fontSize: 'FONT_SIZE_MD',
      fontWeight: 'FONT_WEIGHT_REGULAR',
      lineHeight: 'LINE_HEIGHT_COMFORTABLE',
    },
    BODY_MEDIUM: {
      fontSize: 'FONT_SIZE_SM',
      fontWeight: 'FONT_WEIGHT_REGULAR',
      lineHeight: 'LINE_HEIGHT_COMFORTABLE',
    },
    BODY_SMALL: {
      fontSize: 'FONT_SIZE_XS',
      fontWeight: 'FONT_WEIGHT_REGULAR',
      lineHeight: 'LINE_HEIGHT_COMFORTABLE',
    },
    BODY_XSMALL: {
      fontSize: 'FONT_SIZE_XXS',
      fontWeight: 'FONT_WEIGHT_REGULAR',
      lineHeight: 'LINE_HEIGHT_NORMAL',
    },
    LABEL_LARGE: {
      fontSize: 'FONT_SIZE_SM',
      fontWeight: 'FONT_WEIGHT_MEDIUM',
      lineHeight: 'LINE_HEIGHT_NORMAL',
    },
    LABEL_MEDIUM: {
      fontSize: 'FONT_SIZE_XS',
      fontWeight: 'FONT_WEIGHT_MEDIUM',
      lineHeight: 'LINE_HEIGHT_NORMAL',
    },
    LABEL_SMALL: {
      fontSize: 'FONT_SIZE_XXS',
      fontWeight: 'FONT_WEIGHT_MEDIUM',
      lineHeight: 'LINE_HEIGHT_NORMAL',
    },
    BUTTON_LARGE: {
      fontSize: 'FONT_SIZE_LG',
      fontWeight: 'FONT_WEIGHT_SEMIBOLD',
      lineHeight: 'LINE_HEIGHT_NORMAL',
      textTransform: 'TEXT_TRANSFORM_NONE',
    },
    BUTTON_MEDIUM: {
      fontSize: 'FONT_SIZE_MD',
      fontWeight: 'FONT_WEIGHT_SEMIBOLD',
      lineHeight: 'LINE_HEIGHT_NORMAL',
      textTransform: 'TEXT_TRANSFORM_NONE',
    },
    BUTTON_SMALL: {
      fontSize: 'FONT_SIZE_SM',
      fontWeight: 'FONT_WEIGHT_MEDIUM',
      lineHeight: 'LINE_HEIGHT_NORMAL',
      textTransform: 'TEXT_TRANSFORM_NONE',
    },
    CAPTION_LARGE: {
      fontSize: 'FONT_SIZE_XS',
      fontWeight: 'FONT_WEIGHT_REGULAR',
      lineHeight: 'LINE_HEIGHT_NORMAL',
    },
    CAPTION_SMALL: {
      fontSize: 'FONT_SIZE_XXS',
      fontWeight: 'FONT_WEIGHT_REGULAR',
      lineHeight: 'LINE_HEIGHT_NORMAL',
    },
    OVERLINE: {
      fontSize: 'FONT_SIZE_XXXS',
      fontWeight: 'FONT_WEIGHT_MEDIUM',
      lineHeight: 'LINE_HEIGHT_NORMAL',
      textTransform: 'TEXT_TRANSFORM_UPPERCASE',
      letterSpacing: 'LETTER_SPACING_WIDE',
    },
  },
} as const;

export type Typography = typeof TYPOGRAPHY;
export type FontSize = keyof typeof TYPOGRAPHY extends `FONT_SIZE_${infer Size}` ? Size : never;
export type FontWeight = keyof typeof TYPOGRAPHY extends `FONT_WEIGHT_${infer Weight}` ? Weight : never;
export type TextStyle = keyof typeof TYPOGRAPHY.TEXT_STYLES;

export default TYPOGRAPHY;