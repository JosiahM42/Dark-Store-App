import { firestore } from './firebaseConfig';

// https://www.youtube.com/watch?v=N5or5jBstg8
// https://spoonacular.com/food-api/docs#Grocery-Products-Overview
// https://www.youtube.com/watch?v=qWy9ylc3f9U

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

export const uploadGroceries = () => {
    firestore.collection('Vegetables').doc('Aubergines').set({
        productName: "Aubergines",
        price: 0.60,
        description: "Locally grown aubergines.",
        imageUrl: "url",
        imageAuthor: "Maja Vujic",
        imageSource: "https://unsplash.com/photos/2QcrIXn98PM",
    })
    .then(() => {
        console.log("Grocery successfully added")
    })
    .catch(error => alert(error.message))
};


