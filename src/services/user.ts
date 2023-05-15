import { User } from "../types/user";

import api from "./api";

export async function saveUser(user: User) {
  const response = await api.post(`user`, user);
  return response.data;
}
