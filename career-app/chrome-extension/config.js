// This file is auto-generated during the build process
// It injects environment variables into the extension
const CONFIG = {
  JSEARCH_API_KEY: 'YOUR_JSEARCH_API_KEY' // This will be replaced during build
};

// Make config available to other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} else {
  window.CONFIG = CONFIG;
}
