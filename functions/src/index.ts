import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

const getUpdatedUser = (event: any) => {
  const compare = (obj1: any, obj2: any) =>
    JSON.stringify(obj1) === JSON.stringify(obj2);
  return Object.keys(event.after.val()).filter(
    key => !compare(event.after.val()[key], event.before.val()[key])
  );
};
exports.triggerUsers = functions.database.ref("/userProfile").onWrite(event => {
  // console.log("event", event.after.toJSON());
  console.log("user1", event.after);
  console.log("keys2", Object.keys(event.after));
  console.log("user's keys3", Object.keys(event.after.val()));
  console.log("updated user4", getUpdatedUser(event));

  // console.log('snapshot',event.after[event.after.key])
});
