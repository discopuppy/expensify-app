import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCr9Srwu4LQGzT4TW9BEmR3HdYqgXU-3KE",
    authDomain: "expensify-cbd2d.firebaseapp.com",
    databaseURL: "https://expensify-cbd2d.firebaseio.com",
    projectId: "expensify-cbd2d",
    storageBucket: "expensify-cbd2d.appspot.com",
    messagingSenderId: "587410493353"
  };

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };

/* // child_removed
database.ref('expenses').on('child_removed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});

// child_changed
database.ref('expenses').on('child_changed', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
});

// child_added // Gets called for initial existing as well as every newly created
database.ref('expenses').on('child_added', (snapshot) => {
    console.log(snapshot.key, snapshot.val());
}); */

/* database.ref('expenses')
  .once('value')
  .then((snapshot) => {
      const expenses = [];

      snapshot.forEach((childSnapshot) => {
        expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
        });
      });

      console.log(expenses);
  }); */

/* database.ref('expenses').on('value', (snapshot) => {
    const expenses = [];
    
    snapshot.forEach((childSnapshot) => {
        expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
        });
    });

    console.log(expenses);
}); */

/* database.ref('expenses').push({
    Description: 'Auto',
    Note: 'Not Paid',
    Amount: 156.65,
    CreatedAt: 1000069887
}); */

/* database.ref('job').set({
    title: 'Web Developer',
    company: 'Google'
}); */

/* database.ref().on('value', (snapshot) => {
    const val = snapshot.val();
    console.log(`${val.name} is a ${val.job.title} at ${val.job.company}`)
});

database.ref('job/company').set('Google'); */

/* database.ref().on('value', (snapshot) => { // gets the value initially and everytime it is changed
    console.log(snapshot.val());
}); */



/* database.ref()
    .once('value')
    .then((snapshot) => {
        const val = snapshot.val();
        console.log(val);
    }).catch((error) => {
        console.log('Error fetching data', error);
    }); */

//database.ref().set({
//name: 'Zac Moss',
//age: 29,
//isSingle: false,
//location: {
//    city: 'Lafayette',
//    country: 'United States'
//}
//}).then(() => {
//    console.log('Data is saved');
//}).catch((error) => {
//console.log('This failed.', error);
//});

// database.ref().set('This is my data');

//database.ref('age').set(27);

//database.ref('attributes').set({
//    height: 80,
//    weight: 200
//}).then(() => {
//    console.log('Second set call worked.');
//}).catch((error) => {
//    console.log('Things didnt work for the second error');
//});

//database.ref('isSingle')
//.remove()
//.then(() => {
//    console.log('Data was removed');
//}).catch((error) => {
//    console.log('This failed', error);
//});

//database.ref().update({
//    age: '18',
//    'location/city': 'Boston'
//}); // The .update() above edits name and age, adds job, and deletes isSingle.

//database.ref('isSingle').set(null); // an alternative to delete the 'isSingle' data