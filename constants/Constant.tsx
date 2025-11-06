const Constant = {
  // ===== YOUR EXISTING CONSTANTS =====
  GENERAL_TEXT: {
    ALIGN: {
      CENTER: "center",
      LEFT: "left",
      RIGHT: "right",
    },
    VARIANTS: {
      SECTION_TITLE: "sectionTitle",
      SECTION_SUBTITLE: "sectionSubTitle",
      SECTION_DESCRIPTION: "sectionDescription",
      BODY_COPY: "bodyCopy",
      BUTTON: "button",
    },
  },
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32,
    XXL: 40,
    XXXL: 48,
    
    // Additional spacing for components
    BUTTON_PADDING_HORIZONTAL: 20,
    BUTTON_PADDING_VERTICAL: 12,
    INPUT_PADDING_HORIZONTAL: 16,
    INPUT_PADDING_VERTICAL: 12,
    CARD_PADDING: 16,
    SECTION_MARGIN: 24,
    SCREEN_PADDING: 16,
    CONTAINER_PADDING: 20,
    ELEMENT_MARGIN: 8,
    GROUP_MARGIN: 16,
  },
  BUTTON: {
    TYPES: {
      PRIMARY: "primary",
      SECONDARY: "secondary",
      DISABLED: "disabled",
    },
  },
  COLORS: {
    // Your existing colors
    WHITE: "white",
    BLACK: "black",
    PRIMARY: "#8d2b89",
    SECONDARY: "#8c8c8c",
    GRAY: "gray",
    
    // Additional colors for better theming
    PRIMARY_DARK: "#6d1a69",
    PRIMARY_LIGHT: "#a83ca4",
    GRAY_LIGHT: "#F2F2F7",
    GRAY_MEDIUM: "#C7C7CC",
    GRAY_DARK: "#8E8E93",
    SUCCESS: "#34C759",
    WARNING: "#FF9500",
    ERROR: "#FF3B30",
    INFO: "#5AC8FA",
    BACKGROUND_PRIMARY: "#FFFFFF",
    BACKGROUND_SECONDARY: "#F2F2F7",
    BACKGROUND_TERTIARY: "#E5E5EA",
    TEXT_PRIMARY: "#000000",
    TEXT_SECONDARY: "#8E8E93",
    TEXT_TERTIARY: "#C7C7CC",
    TEXT_INVERTED: "#FFFFFF",
  },
  PERMISSION: {
    GRANTED: "granted",
  },
  CAMERA: {
    QUALITY: 0.8,
    RATIO: "16:9" as const,
    TYPE: {
      BACK: "back" as const,
      FRONT: "front" as const,
    },
  },
  IMAGE: {
    MAX_WIDTH: 1080,
    THUMBNAIL_WIDTH: 200,
    COMPRESSION: 0.7,
    FORMAT: {
      JPEG: "jpeg" as const,
      PNG: "png" as const,
    },
  },
  LOCATION: {
    ACCURACY: "high" as const,
    UPDATE_INTERVAL: 1000,
    DISTANCE_INTERVAL: 1,
    TIMEOUT: 15000,
  },
  FIRESTORE: {
    COLLECTIONS: {
      PHOTOS: "photos",
      USERS: "users",
      USER_PHOTOS: "user_photos",
      ANALYTICS: "analytics",
    },
    BATCH_LIMIT: 500,
  },
  WEATHER: {
    API_KEY: process.env.EXPO_PUBLIC_WEATHER_API_KEY || "",
    BASE_URL: "https://api.openweathermap.org/data/2.5",
    // Open-Meteo configuration (free alternative)
    OPEN_METEO: {
      BASE_URL: "https://api.open-meteo.com/v1",
      ENDPOINTS: {
        CURRENT_WEATHER: "/forecast",
      },
    },
  },
  MOCK_LOCATION_APPS: [
    "com.lexa.fakegps", 
    "com.evenwell.fakegps", 
    "com.incorporateapps.fakegps.fre", 
    "io.monospace.android.fakegps", 
    "com.doctorgps.fakegps"
  ],

  // ===== NEW TYPOGRAPHY CONSTANTS =====
  TYPOGRAPHY: {
    // Font sizes
    FONT_SIZE_XXXS: 10,
    FONT_SIZE_XXS: 12,
    FONT_SIZE_XS: 14,
    FONT_SIZE_SM: 15,
    FONT_SIZE_MD: 16,
    FONT_SIZE_LG: 18,
    FONT_SIZE_XL: 20,
    FONT_SIZE_XXL: 24,
    FONT_SIZE_XXXL: 32,
    FONT_SIZE_DISPLAY: 40,

    // Font weights
    FONT_WEIGHT_LIGHT: "300",
    FONT_WEIGHT_REGULAR: "400",
    FONT_WEIGHT_MEDIUM: "500",
    FONT_WEIGHT_SEMIBOLD: "600",
    FONT_WEIGHT_BOLD: "700",
    FONT_WEIGHT_EXTRABOLD: "800",

    // Line heights
    LINE_HEIGHT_TIGHT: 1.2,
    LINE_HEIGHT_NORMAL: 1.4,
    LINE_HEIGHT_COMFORTABLE: 1.6,
    LINE_HEIGHT_LOOSE: 1.8,

    // Letter spacing
    LETTER_SPACING_TIGHT: -0.5,
    LETTER_SPACING_NORMAL: 0,
    LETTER_SPACING_WIDE: 0.5,
    LETTER_SPACING_WIDER: 1,

    // Text transforms
    TEXT_TRANSFORM_NONE: "none",
    TEXT_TRANSFORM_UPPERCASE: "uppercase",
    TEXT_TRANSFORM_LOWERCASE: "lowercase",
    TEXT_TRANSFORM_CAPITALIZE: "capitalize",

    // Text decoration
    TEXT_DECORATION_NONE: "none",
    TEXT_DECORATION_UNDERLINE: "underline",
    TEXT_DECORATION_LINETHROUGH: "line-through",

    // Text align (aligned with your existing GENERAL_TEXT.ALIGN)
    TEXT_ALIGN_LEFT: "left",
    TEXT_ALIGN_CENTER: "center",
    TEXT_ALIGN_RIGHT: "right",
    TEXT_ALIGN_JUSTIFY: "justify",

    // Font families
    FONT_FAMILY_PRIMARY: "System",
    FONT_FAMILY_SECONDARY: "System",
    FONT_FAMILY_MONOSPACE: "System",

    // Predefined text styles for common use cases
    TEXT_STYLES: {
      // Header styles
      HEADER_LARGE: {
        fontSize: "FONT_SIZE_XXXL",
        fontWeight: "FONT_WEIGHT_BOLD",
        lineHeight: "LINE_HEIGHT_TIGHT",
      },
      HEADER_MEDIUM: {
        fontSize: "FONT_SIZE_XL",
        fontWeight: "FONT_WEIGHT_SEMIBOLD",
        lineHeight: "LINE_HEIGHT_TIGHT",
      },
      HEADER_SMALL: {
        fontSize: "FONT_SIZE_LG",
        fontWeight: "FONT_WEIGHT_SEMIBOLD",
        lineHeight: "LINE_HEIGHT_NORMAL",
      },

      // Body styles
      BODY_LARGE: {
        fontSize: "FONT_SIZE_MD",
        fontWeight: "FONT_WEIGHT_REGULAR",
        lineHeight: "LINE_HEIGHT_COMFORTABLE",
      },
      BODY_MEDIUM: {
        fontSize: "FONT_SIZE_SM",
        fontWeight: "FONT_WEIGHT_REGULAR",
        lineHeight: "LINE_HEIGHT_COMFORTABLE",
      },
      BODY_SMALL: {
        fontSize: "FONT_SIZE_XS",
        fontWeight: "FONT_WEIGHT_REGULAR",
        lineHeight: "LINE_HEIGHT_COMFORTABLE",
      },
      BODY_XSMALL: {
        fontSize: "FONT_SIZE_XXS",
        fontWeight: "FONT_WEIGHT_REGULAR",
        lineHeight: "LINE_HEIGHT_NORMAL",
      },

      // Label styles
      LABEL_LARGE: {
        fontSize: "FONT_SIZE_SM",
        fontWeight: "FONT_WEIGHT_MEDIUM",
        lineHeight: "LINE_HEIGHT_NORMAL",
      },
      LABEL_MEDIUM: {
        fontSize: "FONT_SIZE_XS",
        fontWeight: "FONT_WEIGHT_MEDIUM",
        lineHeight: "LINE_HEIGHT_NORMAL",
      },
      LABEL_SMALL: {
        fontSize: "FONT_SIZE_XXS",
        fontWeight: "FONT_WEIGHT_MEDIUM",
        lineHeight: "LINE_HEIGHT_NORMAL",
      },

      // Button styles
      BUTTON_LARGE: {
        fontSize: "FONT_SIZE_LG",
        fontWeight: "FONT_WEIGHT_SEMIBOLD",
        lineHeight: "LINE_HEIGHT_NORMAL",
        textTransform: "TEXT_TRANSFORM_NONE",
      },
      BUTTON_MEDIUM: {
        fontSize: "FONT_SIZE_MD",
        fontWeight: "FONT_WEIGHT_SEMIBOLD",
        lineHeight: "LINE_HEIGHT_NORMAL",
        textTransform: "TEXT_TRANSFORM_NONE",
      },
      BUTTON_SMALL: {
        fontSize: "FONT_SIZE_SM",
        fontWeight: "FONT_WEIGHT_MEDIUM",
        lineHeight: "LINE_HEIGHT_NORMAL",
        textTransform: "TEXT_TRANSFORM_NONE",
      },

      // Caption styles
      CAPTION_LARGE: {
        fontSize: "FONT_SIZE_XS",
        fontWeight: "FONT_WEIGHT_REGULAR",
        lineHeight: "LINE_HEIGHT_NORMAL",
      },
      CAPTION_SMALL: {
        fontSize: "FONT_SIZE_XXS",
        fontWeight: "FONT_WEIGHT_REGULAR",
        lineHeight: "LINE_HEIGHT_NORMAL",
      },

      // Overline styles
      OVERLINE: {
        fontSize: "FONT_SIZE_XXXS",
        fontWeight: "FONT_WEIGHT_MEDIUM",
        lineHeight: "LINE_HEIGHT_NORMAL",
        textTransform: "TEXT_TRANSFORM_UPPERCASE",
        letterSpacing: "LETTER_SPACING_WIDE",
      },

      // Your existing variants mapped to new system
      SECTION_TITLE: {
        fontSize: "FONT_SIZE_MD",
        fontWeight: "FONT_WEIGHT_SEMIBOLD",
      },
      SECTION_SUBTITLE: {
        fontSize: "FONT_SIZE_SM",
        fontWeight: "FONT_WEIGHT_MEDIUM",
      },
      SECTION_DESCRIPTION: {
        fontSize: "FONT_SIZE_SM",
        fontWeight: "FONT_WEIGHT_REGULAR",
      },
      BODY_COPY: {
        fontSize: "FONT_SIZE_SM",
        fontWeight: "FONT_WEIGHT_REGULAR",
        lineHeight: "LINE_HEIGHT_COMFORTABLE",
      },
      BUTTON: {
        fontSize: "FONT_SIZE_XS",
        fontWeight: "FONT_WEIGHT_MEDIUM",
        textTransform: "TEXT_TRANSFORM_NONE",
      },
    },
  },

  // ===== NEW BORDER RADIUS CONSTANTS =====
  BORDER_RADIUS: {
    SM: 4,
    MD: 8,
    LG: 12,
    XL: 16,
    ROUND: 50,
  },

  // ===== NEW ICON SIZES =====
  ICON_SIZES: {
    SM: 16,
    MD: 24,
    LG: 32,
    XL: 40,
  },

  // ===== NEW APP CONFIGURATION =====
  APP: {
    NAME: "GPS Camera",
    VERSION: "1.0.0",
    SUPPORT_EMAIL: "support@gpscamera.app",
  },

  // ===== NEW ERROR MESSAGES =====
  ERROR_MESSAGES: {
    CAMERA_PERMISSION: "Camera permission is required to take photos",
    LOCATION_PERMISSION: "Location permission is required to tag photos with GPS",
    LOCATION_UNAVAILABLE: "Unable to get current location. Please check your GPS settings",
    WEATHER_UNAVAILABLE: "Weather data is currently unavailable",
    UPLOAD_FAILED: "Failed to upload photo. Please try again",
    NETWORK_ERROR: "Network connection required. Please check your internet connection",
  },

  // ===== NEW SUCCESS MESSAGES =====
  SUCCESS_MESSAGES: {
    PHOTO_CAPTURED: "Photo captured successfully",
    PHOTO_UPLOADED: "Photo uploaded with GPS data",
    LOCATION_VERIFIED: "Location verified and tagged",
  },

  // ===== NEW LIMITS =====
  LIMITS: {
    MAX_PHOTO_SIZE: 5000000, // 5MB in bytes
    MAX_BASE64_SIZE: 1500000, // 1.5MB for Base64 strings
    MAX_PHOTOS_PER_USER: 1000,
    MAX_CONCURRENT_UPLOADS: 3,
  },

  // ===== NEW API CONFIGURATION =====
  API: {
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 3,
    RETRY_DELAY: 1000,
  },

  // ===== NEW STORAGE PATHS =====
  STORAGE: {
    PHOTOS_DIR: "photos",
    EXPORTS_DIR: "exports",
    CACHE_DIR: "cache",
  },
};

export default Constant;