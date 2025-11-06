import TYPOGRAPHY from '@/constants/TypoGraphy';
import size from '../size';

/**
 * Get typography style for a variant
 * 
 * @param {keyof typeof TYPOGRAPHY.STYLES} variant - Typography variant
 * @param {Object} options - Additional options
 * @param {string} options.align - Text alignment
 * @param {string} options.color - Text color
 * @returns {Object} Typography style object
 */
export const getTypographyStyle = (
  variant: keyof typeof TYPOGRAPHY.STYLES = 'BODY_MEDIUM',
  options: { align?: string; color?: string } = {}
) => {
  const styleConfig = TYPOGRAPHY.STYLES[variant] || TYPOGRAPHY.STYLES.BODY_MEDIUM;
  
  const fontSizeKey = styleConfig.fontSize as keyof typeof TYPOGRAPHY;
  const fontWeightKey = styleConfig.fontWeight as keyof typeof TYPOGRAPHY;
  
  const fontSize = TYPOGRAPHY[fontSizeKey] as number;
  const fontWeight = TYPOGRAPHY[fontWeightKey] as string;

  return {
    fontSize: size.scaleFont(fontSize),
    fontWeight,
    textAlign: options.align || TYPOGRAPHY.TEXT_ALIGN_LEFT,
    ...(options.color && { color: options.color }),
  };
};

/**
 * Memoized typography styles (similar to your previous approach)
 */
export const createTypographyStyles = () => {
  const styles: { [key in keyof typeof TYPOGRAPHY.STYLES]?: any } = {};

  Object.keys(TYPOGRAPHY.STYLES).forEach((variant) => {
    styles[variant as keyof typeof TYPOGRAPHY.STYLES] = 
      (argsAlign: string = TYPOGRAPHY.TEXT_ALIGN_LEFT, color?: string) => 
        getTypographyStyle(variant as keyof typeof TYPOGRAPHY.STYLES, { 
          align: argsAlign, 
          color 
        });
  });

  return styles;
};