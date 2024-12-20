declare global {
    namespace Express {
      interface Request {
        userId?: string;
      }
    }
  }
  
  // Export an empty object to ensure this is treated as a module
  export {};
  