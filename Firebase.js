import firebase from 'firebase'; 
class Firebase {
  constructor() {
    this.init();
    this.observeAuth();
  }

  init = () =>
    firebase.initializeApp({
        apiKey: "AIzaSyCqvf6pvtRc0A7vZ4oIqldzb1VKB5LxJ2k",
        authDomain: "fir-authwithreactnative.firebaseapp.com",
        databaseURL: "https://fir-authwithreactnative.firebaseio.com",
        projectId: "fir-authwithreactnative",
        storageBucket: "fir-authwithreactnative.appspot.com",
        messagingSenderId: "887313025101"
    });

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
      
      }
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(50)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send  message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  // close  connection to the Backend
  off() {
    this.ref.off();
  }
}

Firebase.shared = new Firebase();
export default Firebase;
