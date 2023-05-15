import { Product } from "../types/product";

import api from "./api";

export async function getProducts() {
  const response = await api.get<Product[]>(`produto`);
  return response.data;
}

export async function newProduct(product: Product) {
  const response = await api.post<Product[]>(`produto`, product);
  return response.data;
}
