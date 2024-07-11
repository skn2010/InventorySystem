import type { Product } from ".";

const PRODUCT_KEY = "products";

export function getAllProductsFromStorage(
  storageLocation: "local" | "session"
): Product[] {
  try {
    if (storageLocation === "local") {
      const stringProductList = localStorage.getItem(PRODUCT_KEY);
      return JSON.parse(stringProductList || "[]") as Product[];
    }

    const stringProductList = sessionStorage.getItem(PRODUCT_KEY);
    return JSON.parse(stringProductList || "[]") as Product[];
  } catch {
    console.error("Storage parsed error from utils.ts in storage");
    return [];
  }
}

export function updateProductsInStorage(
  storageLocation: "local" | "session",
  products: Product[]
) {
  try {
    if (storageLocation === "local") {
      localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
      return;
    }
    sessionStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
  } catch {
    console.error("Unable to store or set data to storage");
    return [];
  }
}
