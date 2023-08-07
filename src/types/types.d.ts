// export interface UserRequestData {
//   id: number;
//   name: string;
//   email: string;
// }
// declare namespace Express {
//   export interface Request {
//     user: UserRequestData;
//   }
// }

// Define your custom UserRequestData interface
export interface UserRequestData {
  id: number;
  name: string;
  email: string;
}

// Merge the custom UserRequestData with the Express.Request interface
declare global {
  namespace Express {
    interface Request {
      user: UserRequestData;
    }
  }
}
