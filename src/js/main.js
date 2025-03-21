import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const dataSource = new ProductData("tents");
console.log("DataSource initialized:", dataSource);
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);

// Ensure data is loaded before initializing search functionality
async function initialize() {
    try {
        await dataSource.getData(); // Wait for data to be fetched
        console.log("Data loaded:", dataSource.fullList);

        listing.init(); // Initialize the listing AFTER data is fetched

        const searchBox = document.getElementById("searchBox");
        if (searchBox) {
            searchBox.addEventListener("input", searchProducts);
        } else {
            console.error("Search box not found!");
        }
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

initialize();

// Search Functionality
window.searchProducts = function () {
    const searchBox = document.getElementById("searchBox");
    if (!searchBox) {
        console.error("Search box not found!");
        return;
    }

    let query = searchBox.value.trim().toLowerCase();

    if (!dataSource.fullList || dataSource.fullList.length === 0) {
        console.error("dataSource.fullList is empty or undefined!");
        return;
    }

    const filteredList = dataSource.fullList.filter(product =>
        product.Name && product.Name.toLowerCase().includes(query)
    );

    console.log("Filtered Results:", filteredList);
    updateProductList(filteredList);
};

// Function to update the product list in the UI
function updateProductList(products) {
    const productList = document.querySelector(".product-list");
    if (!productList) return;

    const defaultImage = "../images/default-tent.jpg"; // Path to default image

    productList.innerHTML = ""; // Clear existing products

    products.forEach(product => {
        if (product.Name && product.FinalPrice) {
            const item = document.createElement("div");
            item.classList.add("product-item");
            item.innerHTML = `
                <img src="${product.Image || defaultImage}" alt="${product.Name}">
                <h3>${product.Name}</h3>
                <p>${product.FinalPrice}</p>
            `;
            productList.appendChild(item);
        } else {
            console.error("Product data is incomplete:", product);
        }
    });
}

