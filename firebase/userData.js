// const getUserData = () => {
//     const user = auth.currentUser.uid;
//     console.log(user)
//     firestore.collection('users').doc(user).get().then(userDoc => {
//         userDoc.data().name;
//         //console.log(userDoc.data().name)
        
//         //<Text>{document.data().name}</Text>
//     })
//     .catch(error => alert(error.message))
// }