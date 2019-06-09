import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

const getUpdatedUser = (event: any) => {
  const compare = (obj1: any, obj2: any) =>
    JSON.stringify(obj1) === JSON.stringify(obj2);
  return Object.keys(event.after.val()).filter(
    key => !compare(event.after.val()[key], event.before.val()[key])
  );
};
const setClaims = async (data: {
  email: string;
  level: number;
  enabled: boolean;
}) => {
  const authUser = await admin.auth().getUserByEmail(data.email);
  return admin.auth().setCustomUserClaims(authUser.uid, {
    level: data.level,
    enabled: data.enabled
  });
};
exports.triggerUsers = functions.database.ref("/userProfile").onWrite(event => {
  // console.log("event", event.after.toJSON());
  console.log("inside app ");
  getUpdatedUser(event).forEach(user => {
    const userData = event.after.val()[user];
    console.log("utente modificato", userData);
    // tslint:disable-next-line: no-floating-promises
    setClaims({
      email: userData.email,
      level: userData.level,
      enabled: userData.enabled
    }).then(v => {
      console.log("setted claims for ", userData, v);
    });
  });

  // console.log('snapshot',event.after[event.after.key])
});
