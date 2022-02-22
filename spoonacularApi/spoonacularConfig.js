// https://www.youtube.com/watch?v=N5or5jBstg8
// https://spoonacular.com/food-api/docs#Grocery-Products-Overview
// https://www.youtube.com/watch?v=qWy9ylc3f9U

let url = "https://api.spoonacular.com/food/products/search?"

let defaultClient = SpoonacularApi.ApiClient.instance;
let apiKeyScheme =  defaultClient.authentications['apiKeyScheme'];
apiKeyScheme.apiKey = 'c899d34aa9984c94859dae7fedb1728c';

let groceries = new SpoonacularApi.ProductsApi();

export {groceries};