/* tslint:disable */

import * as functions from 'firebase-functions';

exports.myFunction = functions.firestore
    .document('Users/{userId}')
    .onUpdate((change, context)=>{
        const oldValue = change.before.data();
        const newValue = change.after.data();

        //undefined回避
        if(oldValue == undefined || newValue == undefined)return null;
        
        //新旧のプロジェクト配列を取得
        const oldKeys = getKeys(oldValue.projects);
        const newKeys = getKeys(newValue.projects);

        //差分キーの取得
        let delKeys = oldKeys.filter(key => !newKeys.includes(key))

        if(delKeys.length == 0)return null;

        return change.after.ref.collection(delKeys[0]).listDocuments().then(
            docs => {
                docs.forEach(
                    doc => {
                        doc.delete();
                    }
                )
            }
        ).catch(e=>{
            console.log(e);
        })
    })
    const getKeys = li => {
        let keys:string[] = [];
        for(let key in li){
            keys.push(key);
        }
        return keys;
    }
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
