import { getAllProductsFromStorage, updateProductsInStorage } from "./utils";

export type Product = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  productImage?: string;
  addedDate: Date;
};

type GetProductsProps = {
  page: number;
  limit?: number;
  searchByName?: string;
};

export default class Storage {
  storageLocation: "local" | "session";

  constructor(storageLocation: "local" | "session") {
    this.storageLocation = storageLocation;
  }

  getStorageLocation() {
    return this.storageLocation;
  }

  getProducts({ page, limit = 20, searchByName = "" }: GetProductsProps) {
    // Get all products from storage (local or session)
    let allProducts = getAllProductsFromStorage(this.storageLocation);

    // Apply search by name feature
    allProducts = allProducts.filter((item) =>
      item.name.includes(searchByName)
    );

    // Now, let's apply page and limit (pagination)
    const startIndex = page === 1 ? 0 : limit / (page - 1);
    const endIndex = page * limit;

    return allProducts.splice(startIndex, endIndex);
  }

  getProduct(id: string) {
    const allProducts = getAllProductsFromStorage(this.storageLocation);
    const product = allProducts.find((item) => item.id === id);

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  }

  updateProduct(id: string, data: Partial<Omit<Product, "id">>) {
    let product = this.getProduct(id);
    product = { ...product, ...data };

    let allProducts = getAllProductsFromStorage(this.storageLocation);
    allProducts = allProducts.map((item) => {
      if (item.id === id) {
        return product;
      }
      return item;
    });

    // Updated to the storage
    updateProductsInStorage(this.storageLocation, allProducts);
    return product;
  }

  deleteProduct(id: string) {
    const product = this.getProduct(id);

    let allProducts = getAllProductsFromStorage(this.storageLocation);

    allProducts = allProducts.filter((item) => item.id !== id);
    updateProductsInStorage(this.storageLocation, allProducts);

    return product;
  }
}
