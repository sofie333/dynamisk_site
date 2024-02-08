//https://kea-alt-del.dk/t7/api/products/1526

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const url = `https://kea-alt-del.dk/t7/api/products/${id}`;

fetch("https://kea-alt-del.dk/t7/api/products/" + id)
  .then((response) => response.json())
  .then((data) => showProduct(data));

function calculateDiscountedPrice(originalPrice, discountPercentage) {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = originalPrice - discountAmount;
  return discountedPrice.toFixed(2);
}

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

  //produktet er udsolgt
  if (product.soldout == 1) {
    document.querySelector(".product_img").classList.add("soldOut");
  } else {
    document.querySelector(".sold_out").classList.add("none");
  }

  //produktet er på udsalg
  if (product.discount == null) {
    console.log("discount");
    document.querySelector(".discounted").classList.add("none");
  } else {
    document.querySelector(".discounted").textContent = `-${product.discount}%`;
    document.querySelector(".new_price").textContent = `Ny pris ${calculateDiscountedPrice(product.price, product.discount)} DKK`;
    document.querySelector(".price").classList.add("udstreget");
  }
}
