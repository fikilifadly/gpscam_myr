const Constant = {
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
  },
  BUTTON: {
    TYPES: {
      PRIMARY: "primary",
      SECONDARY: "secondary",
      DISABLED: "disabled",
    },
  },
  COLORS: {
    WHITE: "white",
    BLACK: "black",
    PRIMARY: "#8d2b89",
    SECONDARY: "#8c8c8c",
    GRAY: "gray",
  },
  PERMISSION: {
    GRANTED: "granted",
  },
  CAMERA: {
    QUALITY: 0.8,
    RATIO: "16:9" as const,
  },
  IMAGE: {
    MAX_WIDTH: 1080,
    THUMBNAIL_WIDTH: 200,
    COMPRESSION: 0.7,
  },
  LOCATION: {
    ACCURACY: "high" as const,
    UPDATE_INTERVAL: 1000,
    DISTANCE_INTERVAL: 1,
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
  },
  MOCK_LOCATION_APPS: ["com.lexa.fakegps", "com.evenwell.fakegps", "com.incorporateapps.fakegps.fre", "io.monospace.android.fakegps", "com.doctorgps.fakegps"],
};

export default Constant;
