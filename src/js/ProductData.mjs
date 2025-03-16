function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }

  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }

  // Ensure Data Loads Before Searching.
  async getData() {
    try {
      this.fullList = await fetch(this.path).then(convertToJson);
      return this.fullList;
    } catch (error) {
      console.error("Error fetching product data:", error);
      return []; // Return empty array if fetch fails
    }
  }
}