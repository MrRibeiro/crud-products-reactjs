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

export async function updateProduct(id: string, product: Product) {
  const response = await api.put<Product>(`produto/${id}`, product);
  return response.data;
}

export async function getProduct(id: string) {
  const response = await api.get<Product>(`produto/${id}`);
  return response.data;
}
