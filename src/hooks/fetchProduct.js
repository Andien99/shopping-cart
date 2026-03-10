export default async function fetchProduct() {
  let data;
  const result = await fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((result) => (data = result))
    .catch((error) => error);
  return data;
}
