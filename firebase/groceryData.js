import { firestore, storage } from './firebaseConfig';
import { useState } from 'react';

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
    // storage.ref("Bakery/Bagels-mae-mu.jpg").getDownloadURL()
    // .then(url => 
    //     {
    //     console.log(url)
    // })
    // .catch(error => alert(error.message))


    firestore.collection('Vegetables').doc('Test').set({
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


// let bakeryList = []

// export const pullGroceries = () => {
//     //let bakeryList = []

//     firestore.collection('Bakery').doc('Bagels').get()
//     .then(bakeryDoc => {
//         bakeryList.push(bakeryDoc.data())

//         //console.log(bakeryList)
//     })
//     .catch(error => alert(error.message))

//     firestore.collection('Bakery').doc('BrownLoafBread').get()
//     .then(bakeryDoc => {
//         bakeryList.push(bakeryDoc.data())

//         //console.log(bakeryList)
//     })
//     .catch(error => alert(error.message))

//     firestore.collection('Bakery').doc('Croissant').get()
//     .then(bakeryDoc => {
//         bakeryList.push(bakeryDoc.data())

//         //console.log(bakeryList)
//     })
//     .catch(error => alert(error.message))

//     firestore.collection('Bakery').doc('PainAuChocolat').get()
//     .then(bakeryDoc => {
//         bakeryList.push(bakeryDoc.data())

//         //console.log(bakeryList)
//     })
//     .catch(error => alert(error.message))

//     firestore.collection('Bakery').doc('Tortilla').get()
//     .then(bakeryDoc => {
//         bakeryList.push(bakeryDoc.data())

//         //console.log(bakeryList)
//     })
//     .catch(error => alert(error.message))

//     firestore.collection('Bakery').doc('WhiteLoafBread').get()
//     .then(bakeryDoc => {
//         bakeryList.push(bakeryDoc.data())

//         //console.log(bakeryList)
//     })
//     .catch(error => alert(error.message))

//     return console.log(bakeryList)
// }
    
//     firestore.collection('Bakery').get()
//     then((data) => {
//         data.forEach(product => {
//             const document = { [product.id]: product.data()}
//             bakeryList.push(document);
//         })
//     })
//     // getData.forEach(product => {
//     //     const document = { [product.id]: product.data()}
//     //     bakeryList.push(document);
//     // })
//     // .then(data => {
//     //     data.docs.map(bakeryDocs => bakeryDocs.data())

//     //     //console.log('this worked')
//     //     bakeryList.push(bakeryData)
//     // })
//     // .catch(error => alert(error.message))
    
//     // return bakeryList

//     // return console.log(dataGrab.docs.map(bakeryDocs => bakeryDocs.data()))

//     // firestore.collection('Bakery').get()
//     // .then(data => {
//     //     data.docs.map(bakeryDocs => bakeryDocs.data())

//     // })
//     // .catch(error => alert(error.message))

//     // firestore.collection('Bakery').get()
//     // .then(bakeryDoc => {
//     //     bakeryList.push(bakeryDoc.data())

//     // })
//     // .catch(error => alert(error.message))

//     return console.log(bakeryList)
// }


export const pullGroceries = () => {
    let groceryList = []

    firestore.collection('Vegetables').get().then(querySnapshot => 
        {
            //bakeryList.push(snapshot.data())
            //console.log(querySnapshot.size)
            //console.log("this works")
            querySnapshot.forEach(product => {
                //console.log("this works")
                var productDetails = product.data()
                groceryList.push(productDetails)
                //console.log(product.id, product.data())
                //bakeryList.push(product.data())
            })

            console.log(groceryList)
        })
    .catch(error => alert(error.message))
    //return console.log(bakeryList)
}

// export const [categories,setCategories] = useState([
//   {
//     categoryName: "Bakery",
//     imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Bakery%2Fpain-au-chocolat-tabitha-turner.jpg?alt=media&token=ed63386b-cc52-4be3-af29-6993b13ae3cc"
//   },
//   {
//     categoryName: "Fruit",
//     imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Fruit%2FRaspberry-zach-inglis.jpg?alt=media&token=d1cf9825-28f1-40e9-8ee7-01ccbb2931bb"
//   },
//   {
//     categoryName: "Dairy",
//     imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Dairy%2FMilk-ahmadreza-rezaie.jpg?alt=media&token=a40ef9f6-01cc-42f2-a730-39ade5d97a12"
//   },
//   {
//     categoryName: "Plant Based",
//     imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/PlantBased%2FOat-Milk-madalyn-cox.jpg?alt=media&token=3014512a-033f-46a5-9d66-6569cf3be6eb"
//   },
//   {
//     categoryName: "Poultry",
//     imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Poultry%26Fish%2FChicken-Breast-eiliv-sonas-aceron.jpg?alt=media&token=565e875a-575b-4188-9486-ce6080044e36"
//   },
//   {
//     categoryName: "Vegetables",
//     imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Vegetables%2FTomato-engin-akyurt.jpg?alt=media&token=46be9d2d-8f8c-4f95-8997-8389bce90f17"
//   },

// ])

export const categories= [
  {
    categoryName: "Bakery",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Bakery%2Fpain-au-chocolat-tabitha-turner.jpg?alt=media&token=ed63386b-cc52-4be3-af29-6993b13ae3cc"
  },
  {
    categoryName: "Fruit",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Fruit%2FRaspberry-zach-inglis.jpg?alt=media&token=d1cf9825-28f1-40e9-8ee7-01ccbb2931bb"
  },
  {
    categoryName: "Dairy",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Dairy%2FMilk-ahmadreza-rezaie.jpg?alt=media&token=a40ef9f6-01cc-42f2-a730-39ade5d97a12"
  },
  {
    categoryName: "Plant Based",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/PlantBased%2FOat-Milk-madalyn-cox.jpg?alt=media&token=3014512a-033f-46a5-9d66-6569cf3be6eb"
  },
  {
    categoryName: "Poultry",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Poultry%26Fish%2FChicken-Breast-eiliv-sonas-aceron.jpg?alt=media&token=565e875a-575b-4188-9486-ce6080044e36"
  },
  {
    categoryName: "Vegetables",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Vegetables%2FTomato-engin-akyurt.jpg?alt=media&token=46be9d2d-8f8c-4f95-8997-8389bce90f17"
  },

]

export const bakeryList = [
    {
      "description": "Locally baked brown bagels.",
      "imageAuthor": "Mae Mu",
      "imageSource": "https://unsplash.com/photos/8GzmzEyLNyc",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Bakery%2FBagels-mae-mu.jpg?alt=media&token=46f4ce9e-fd44-4208-bcc0-bc1d0249123d",
      "price": 0.40,
      "productName": "Bagels",
      "QuantityInStock": 20,
    },
    {
      "description": "Locally baked brown loaf of bread.",
      "imageAuthor": "Sergio Arze",
      "imageSource": "https://unsplash.com/photos/8JGA8LZv9i4",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Bakery%2FBrown-Bread-sergio-arze.jpg?alt=media&token=8f60af17-d879-4ca8-afd3-f9edd8c1c648",
      "price": 0.80,
      "productName": "Brown Loaf of Bread",
      "QuantityInStock": 20,
    },
    {
      "description": "Locally baked croissants.",
      "imageAuthor": "Conor Brown",
      "imageSource": "https://unsplash.com/photos/sqkXyyj4WdE",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Bakery%2FCrossaint-conor-brown.jpg?alt=media&token=14453e2e-bd90-4439-b120-784b355416cc",
      "price": 0.70,
      "productName": "Croissants",
      "QuantityInStock": 20,
    },
    {
      "description": "Locally baked pain au chocolat.",
      "imageAuthor": "Tabitha Turner",
      "imageSource": "https://unsplash.com/photos/Ns2aJ5OXKds",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Bakery%2Fpain-au-chocolat-tabitha-turner.jpg?alt=media&token=ed63386b-cc52-4be3-af29-6993b13ae3cc",
      "price": 0.60,
      "productName": "Pain au chocolat",
      "QuantityInStock": 20,
    },
    {
      "description": "Locally baked brown bagels.",
      "imageAuthor": "Louis Hansel",
      "imageSource": "https://unsplash.com/photos/6S8BEbV55YY",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Bakery%2FTortillas-louis-hansel.jpg?alt=media&token=0b37f7f5-c44d-4197-ae88-b0c8f20c3d5f",
      "price": 0.50,
      "productName": "Tortillas",
      "QuantityInStock": 20,
    },
    {
      "description": "Locally baked white loaf of bread.",
      "imageAuthor": "Tommaso Urli",
      "imageSource": "https://unsplash.com/photos/hzScL4ufC6k",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Bakery%2FLoaf-Bread-tommaso-urli.jpg?alt=media&token=6d655e12-7135-4b73-89d1-93ba24f6f35b",
      "price": 0.80,
      "productName": "White Loaf of Bread",
      "QuantityInStock": 20,
    },
  ]

  export const fruitList = [
    {
      "description": "British Blueberries.",
      "imageAuthor": "Cody Chan",
      "imageSource": "https://unsplash.com/photos/TdDtTu2rv4s",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Fruit%2FBlueberries-cody-chan.jpg?alt=media&token=e1aa0c1d-7537-4227-8f8b-82f4b1e40b69",
      "price": 1.40,
      "productName": "Blueberries",
      "QuantityInStock": 20,
    },
    {
      "description": "Locally sourced pears.",
      "imageAuthor": "Mockup Graphic",
      "imageSource": "https://unsplash.com/photos/haSJEJYzl5A",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Fruit%2FPear-mockup-graphic.jpg?alt=media&token=3fbe2a35-05c6-490b-9342-281bb6b831a9",
      "price": 0.70,
      "productName": "Pears",
      "QuantityInStock": 20,
    },
    {
      "description": "Locally sourced raspberries.",
      "imageAuthor": "Zach Inglis",
      "imageSource": "https://unsplash.com/photos/t0A2NCMhXRQ",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Fruit%2FRaspberry-zach-inglis.jpg?alt=media&token=d1cf9825-28f1-40e9-8ee7-01ccbb2931bb",
      "price": 1.20,
      "productName": "Raspberries",
      "QuantityInStock": 20,
    },
    {
      "description": "Locally sourced royal gala apples.",
      "imageAuthor": "Matheus Cenali",
      "imageSource": "https://unsplash.com/photos/wXuzS9xR49M",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Fruit%2FApples-matheus-cenali.jpg?alt=media&token=f01e4b4a-1c6e-4b36-a0f2-241355bb50b6",
      "price": 0.50,
      "productName": "Royal Gala Apples",
      "QuantityInStock": 20,
    },
    {
      "description": "British seedless green grapes.",
      "imageAuthor": "Kier In Sight",
      "imageSource": "https://unsplash.com/photos/NMkWw9Hq9Sg",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Fruit%2FGreen-Grapes-kier-in-sight.jpg?alt=media&token=6f4f3a55-8ac8-4576-8b57-49f498815481",
      "price": 1.20,
      "productName": "Seedless Green Grapes",
      "QuantityInStock": 20,
    },
    {
      "description": "British seedless red grapes.",
      "imageAuthor": "Rajesh Rajput",
      "imageSource": "https://unsplash.com/photos/y2MeW00BdBo",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Fruit%2FGrapes-rajesh-rajput.jpg?alt=media&token=ce534471-d643-4893-8223-2a9e9405234b",
      "price": 1.20,
      "productName": "Seedless Red Grapes",
      "QuantityInStock": 20,
    },
    {
      "description": "Locally sourced strawberries.",
      "imageAuthor": "Allec Gomes",
      "imageSource": "https://unsplash.com/photos/xnRg3xDcNnE",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Fruit%2FStrawberry-by-allec-gomes.jpg?alt=media&token=92134242-12ae-4eab-8021-79a212d4e194",
      "price": 0.70,
      "productName": "Strawberries",
      "QuantityInStock": 20,
    },
  ]

export const dairyList = [
    {
      "description": "Locally made Stilton.",
      "imageAuthor": "Towfiqu Barbhuiya",
      "imageSource": "https://unsplash.com/photos/Vr4GE2yTfjI",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Dairy%2FBleu-Cheese-towfiqu-barbhuiya.jpg?alt=media&token=ab2b2d93-576e-4e52-a47e-6fe30d9bbd87",
      "price": 1.50,
      "productName": "Stilton Cheese",
      "QuantityInStock": 20,
    },
    {
      "description": "Locally made cheddar cheese.",
      "imageAuthor": "Aliona Gumeniuk",
      "imageSource": "https://unsplash.com/photos/jeAjT87nbjM",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Dairy%2FChedder-Cheese-aliona-gumeniuk.jpg?alt=media&token=22c52f0f-c197-4704-83a3-6b1c5d1589d3",
      "price": 1.40,
      "productName": "Cheddar Cheese",
      "QuantityInStock": 20,
    },
    {
      "description": "British locally sourced milk.",
      "imageAuthor": "Sandi Benedicta",
      "imageSource": "https://unsplash.com/photos/8Pp9M13xuzs",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Dairy%2FMilk-ahmadreza-rezaie.jpg?alt=media&token=a40ef9f6-01cc-42f2-a730-39ade5d97a12",
      "price": 1.10,
      "productName": "Milk",
      "QuantityInStock": 20,
    },
    {
      "description": "Locally made yoghurt.",
      "imageAuthor": "Autumn Hassett",
      "imageSource": "https://unsplash.com/photos/nOctn3PEC0E",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Dairy%2FYogurt-autumn-hassett.jpg?alt=media&token=b759c0eb-8e7e-4a51-b2ef-3b8b1611847e",
      "price": 1.10,
      "productName": "Plain Yoghurt",
      "QuantityInStock": 20,
    },
  ]

export const plantBasedList = [
    {
      "description": "Locally made Almond Milk.",
      "imageAuthor": "Sandi Benedicta",
      "imageSource": "https://unsplash.com/photos/8Pp9M13xuzs",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/PlantBased%2FAlmond-Milk-sandi-benedicta.jpg?alt=media&token=f3324037-948d-4471-9269-3e84ce66a00a",
      "price": 1.70,
      "productName": "Almond Milk",
      "QuantityInStock": 20,
    },
    {
      "description": "British made Oat Milk.",
      "imageAuthor": "Madalyn Cox",
      "imageSource": "https://unsplash.com/photos/RVnDPsyiLEg",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/PlantBased%2FOat-Milk-madalyn-cox.jpg?alt=media&token=3014512a-033f-46a5-9d66-6569cf3be6eb",
      "price": 1.70,
      "productName": "Oat Milk",
      "QuantityInStock": 20,
    },
    {
      "description": "Locally made vegan burger patties.",
      "imageAuthor": "LikeMeat",
      "imageSource": "https://unsplash.com/photos/nEp0u0U-ovs",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/PlantBased%2FSoy-based-Burger-likemeat.jpg?alt=media&token=5fdc99d3-cfa6-4530-8cbb-302811133906",
      "price": 2.00,
      "productName": "Vegan Burger Patties",
      "QuantityInStock": 20,
    },
    {
      "description": "Locally made vegan sausages.",
      "imageAuthor": "LikeMeat",
      "imageSource": "https://unsplash.com/photos/cSxpCQrRlo8",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/PlantBased%2FVegan-Sausage-likemeat.jpg?alt=media&token=56dff535-6b29-463d-b86c-8e35a707c88d",
      "price": 1.80,
      "productName": "Vegan Sausages",
      "QuantityInStock": 20,
    },
  ]

export const poultryList = [
    {
      "description": "British Bacon.",
      "imageAuthor": "Kwon Junho",
      "imageSource": "https://unsplash.com/photos/RAoX-N4ZcK4",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Poultry%26Fish%2FBacon-kwon-junho.jpg?alt=media&token=d114b4ca-a452-4425-8612-d187e6c335b4",
      "price": 1.10,
      "productName": "British Bacon",
      "QuantityInStock": 20,
    },
    {
      "description": "British chicken breasts.",
      "imageAuthor": "Eiliv-Sonas Aceron",
      "imageSource": "https://unsplash.com/photos/DNQLBdGdld0",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Poultry%26Fish%2FChicken-Breast-eiliv-sonas-aceron.jpg?alt=media&token=565e875a-575b-4188-9486-ce6080044e36",
      "price": 1.30,
      "productName": "Chicken breasts",
      "QuantityInStock": 20,
    },
    {
      "description": "British eggs.",
      "imageAuthor": "Erol Ahmed",
      "imageSource": "https://unsplash.com/photos/leOh1CzRZVQ",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Poultry%26Fish%2FEggs-erol-ahmed.jpg?alt=media&token=f4f6b18f-f249-43c2-a340-dc6210296298",
      "price": 1.70,
      "productName": "Eggs",
      "QuantityInStock": 20,"QuantityInStock": 20,
    },
    {
      "description": "British Sausages.",
      "imageAuthor": "Rachel Clark",
      "imageSource": "https://unsplash.com/photos/MhI8HVjqJf8",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Poultry%26Fish%2FSausages-rachel-clark.jpg?alt=media&token=0b08a954-c9ef-4cca-a643-2b0c09929478",
      "price": 1.20,
      "productName": "British Sausages",
      "QuantityInStock": 20,
    },
    {
      "description": "British Steak.",
      "imageAuthor": "Eiliv-Sonas Aceron",
      "imageSource": "https://unsplash.com/photos/AQ_BdsvLgqA",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Poultry%26Fish%2FSteak-eiliv-sonas-aceron.jpg?alt=media&token=17715e10-5d78-4a20-8694-955edd77f2aa",
      "price": 2.40,
      "productName": "British Steak",
      "QuantityInStock": 20,
    },
  ]

  export const vegetableList = [
    {
      "description": "Locally grown aubergines.",
      "imageAuthor": "Maja Vujic",
      "imageSource": "https://unsplash.com/photos/2QcrIXn98PM",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Vegetables%2Faubergine-maja-vujic.jpg?alt=media&token=ee883f44-2f59-4e85-829c-4d1745d9dfc3",
      "price": 0.60,
      "productName": "Aubergines",
      "QuantityInStock": 20,
    },
    {
      "description": "Locally grown carrots.",
      "imageAuthor": "Rodrigo dos Reis",
      "imageSource": "https://unsplash.com/photos/ZgDHMMd72I8",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Vegetables%2FCarrots-rodrigo-dos-reis.jpg?alt=media&token=523db908-4e7a-4187-ab16-01d6c2e9f5f5",
      "price": 0.30,
      "productName": "Carrots",
      "QuantityInStock": 20,
    },
    {
      "description": "British grown Onions.",
      "imageAuthor": "Mayu Ken",
      "imageSource": "https://unsplash.com/photos/CNZ-9s5p2i8",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Vegetables%2FOnion-mayu-ken.jpg?alt=media&token=a913e11b-450c-4690-9875-6c00999a413b",
      "price": 0.50,
      "productName": "British Onions",
      "QuantityInStock": 20,
    },
    {
      "description": "British grown peas.",
      "imageAuthor": "Artie Kostenko",
      "imageSource": "https://unsplash.com/photos/Sgnhru4-z78",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Vegetables%2FPeas-artie-kostenko.jpg?alt=media&token=9f5ec9c7-b496-498f-9c78-fad3aa59e9ec",
      "price": 1.20,
      "productName": "British Peas",
      "QuantityInStock": 20,
    },
    {
      "description": "Locally grown potatos.",
      "imageAuthor": "Lars Blankers",
      "imageSource": "https://unsplash.com/photos/B0s3Xndk6tw",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Vegetables%2FPotato-lars-blankers.jpg?alt=media&token=20d2746a-3a55-462a-ae32-992d64126aee",
      "price": 1.20,
      "productName": "Potatos",
      "QuantityInStock": 20,
    },
    {
      "description": "Locally grown tomatos.",
      "imageAuthor": "Engin Akyurt",
      "imageSource": "https://unsplash.com/photos/eb26eV-ys_k",
      "imageUrl": "https://firebasestorage.googleapis.com/v0/b/project-dark-store.appspot.com/o/Vegetables%2FTomato-engin-akyurt.jpg?alt=media&token=46be9d2d-8f8c-4f95-8997-8389bce90f17",
      "price": 1.00,
      "productName": "Tomatos",
      "QuantityInStock": 20,
    },
  ]