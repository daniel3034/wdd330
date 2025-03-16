import { getParam } from "./utils.mjs"; // Import getParam function from utils.mjs
import ProductData from "./ProductData.mjs"; // Import ProductData class from ProductData.mjs
import ProductDetails from "./ProductDetails.mjs"; // Import ProductDetails class from ProductDetails.mjs

const dataSource = new ProductData("tents"); // Create a new instance of ProductData with "tents" as the category
const productId = getParam("product"); // Get the product ID from the URL parameters

const product = new ProductDetails(productId, dataSource); // Create a new instance of ProductDetails with the product ID and data source
product.init(); // Initialize the product details
