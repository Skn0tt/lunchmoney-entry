export function getAccessToken(): string | undefined | null {
  return window.localStorage.getItem("access_token");
}

export function setAccessToken(token: string) {
  return window.localStorage.setItem("access_token", token);
}

interface Category {
  name: string;
  id: number;
  categories?: Category[];
}

export function getCategories(): Category[] {
  return JSON.parse(window.localStorage.getItem("categories") ?? "[]");
}

export function setCategories(categories: Category[]) {
  return window.localStorage.setItem("categories", JSON.stringify(categories));
}

interface Asset {
  id: number;
  name: string;
}

export function getAssets(): Asset[] {
  return JSON.parse(window.localStorage.getItem("assets") ?? "[]");
}

export function setAssets(assets: Asset[]) {
  return window.localStorage.setItem("assets", JSON.stringify(assets));
}
