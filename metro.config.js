const path = require('path');

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Simple approach - ensure blockList exists and add our pattern
config.resolver.blockList = [
  ...(Array.isArray(config.resolver.blockList) ? config.resolver.blockList : []),
  /.*_ctx\.android\.tsx$/,
];

config.resolver.alias = {
  "@": path.resolve(__dirname)
};

module.exports = config;