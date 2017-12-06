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

  database.ref().set({
    name: 'Zac Moss',
    age: 29,
    isSingle: false,
    location: {
        city: 'Lafayette',
        country: 'United States'
    }
  }).then(() => {
      console.log('Data is saved');
  }).catch((error) => {
    console.log('This failed.', error);
  });

  // database.ref().set('This is my data');

  //database.ref('age').set(27);

  database.ref('attributes').set({
      height: 80,
      weight: 200
  }).then(() => {
      console.log('Second set call worked.');
  }).catch((error) => {
      console.log('Things didnt work for the second error');
  });