//https://kea-alt-del.dk/t7/api/products/1526

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const url = `https://kea-alt-del.dk/t7/api/products/${id}`;

fetch("https://kea-alt-del.dk/t7/api/products/" + id)
  .then((response) => response.json())
  .then((data) => showProduct(data));

function showProduct(product) {
  console.log(product);
  document.querySelector(".purchasebox h2").textContent = product.productdisplayname;
  document.querySelector(".purchasebox .brand").textContent = product.brandname;
  document.querySelector(".purchasebox .arctype").textContent = product.articletype;
  document.querySelector(".price").textContent = `${product.price} DKK`;
  document.querySelector(".product_img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  document.querySelector(".product_img").alt = product.productdisplayname;
  document.querySelector(".info .model_navn").textContent = product.productdisplayname;
  document.querySelector(".info .product_farve").textContent = product.basecolour;
  document.querySelector(".info .produk_yr").textContent = product.productionyear;
}
