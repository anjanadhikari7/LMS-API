import sessionSchema from "../schema/sessionSchema.js";
// Create
export const createSession = (sessionObj) => {
  return sessionSchema(sessionObj).save();
};
