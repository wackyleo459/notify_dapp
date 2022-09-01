/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

const local_bls_module = path.resolve(__dirname, './bls-patch/bls.js');
// Path of your local module

const thirdParty= {
  'bls-patch': local_bls_module,
};
const watchFolders = [ local_bls_module];


module.exports = {
  server: {
    // port: 5000,
    // host: "http://localhost:8000",
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
