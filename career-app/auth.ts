// Import the auth configuration
import { 
  GET, 
  POST, 
  auth, 
  signIn, 
  signOut, 
  authOptions, 
  generateAuthToken, 
  type CustomSession 
} from './lib/next-auth';

// Re-export the NextAuth configuration
export {
  GET,
  POST,
  auth,
  signIn,
  signOut,
  authOptions,
  generateAuthToken,
  type CustomSession
};

// Export the auth options as the default export for backward compatibility
export { authOptions as default };
