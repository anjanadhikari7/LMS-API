import sessionSchema from "../schema/sessionSchema.js";
// Create
export const createSession = (sessionObj) => {
  return sessionSchema(sessionObj).save();
};

// find session

export const getSession = (token) => {
  return sessionSchema.findOne({ token });
};

// delete session

export const deleteSession = (accessJWT) => {
  return sessionSchema.findOneAndDelete({ token: accessJWT });
};
