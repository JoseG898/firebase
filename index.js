const apiKey = 'AIzaSyAZl8iAAGO_zSG9t0mu4MU2AFTitT4ANyw';
const projectId = 'fir-f034e';
const collection = 'users';

firebase.initializeApp({
    apiKey,
    projectId
});

var db = firebase.firestore();

getUsers = () => {
    db.collection(collection).get().then((response) => {
        response.forEach((doc) => {
            console.log(doc.id);
            console.log(doc.data());
        });
    });
};

getUsers();

addUser = () => {
    let nameValue = document.getElementById('nameInput').value
    let lastnameValue = document.getElementById('lastnameInput').value
    let ageValue = document.getElementById('ageInput').value
  
    db.collection("users").add({
      name: nameValue,
      lastname: lastnameValue,
      age: parseInt(ageValue)
    })
    .then(function(response) {
        console.log("Document written with ID: ", response.id);
        getUsers();
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

updateUser = (userId, name, lastname, age, address) => {
    db.collection('users').doc(userId).set({
        name: name,
        lastname: lastname,
        age: age,
        address: address,
        date: firebase.firestore.Timestamp.fromDate(new Date()),
    }, { merge: true })
}

phones = (userId, remove, item) => {
    const user = db.collection('users').doc(userId)

    if(remove){
        user.update({
            phones: firebase.firestore.FieldValue.arrayRemove(item)
        });
    } else {
        user.update({
            phones: firebase.firestore.FieldValue.arrayUnion(item)
        });
    }
}

removeAddres = (userId) => {
    const user = db.collection(collection).doc(userId)
    user.update({
        address: firebase.firestore.FieldValue.delete()
    })
}

removeUser = (userId) => {
    db.collection('users').doc(userId).delete()
}
