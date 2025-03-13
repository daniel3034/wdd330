import { setLocalStorage, getParam} from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
    }

    renderProductDetails() {
        if (this.product) {
            document.getElementById("product-title").textContent = "Product Not Found";
            return;
        }

        document.getElementById("product-title").textContent = this.product.Name;
        document.getElementById("product-description").textContent = this.product.description;
        document.getElementById("product-price").textContent = `$${this.product.price}`;

        const imageElement = document.getElementById("product-image");
        imageElement.src = this.product.image;
        imageElement.alt = this.product.Name;
    }

    addProductToCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(this.product);
        setLocalStorage("cart", cart);
        alert("Product added to cart!");
    }
}

export default ProductDetails;