window.addEventListener("DOMContentLoaded", init);

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

// const productlistURL = "https://kea-alt-del.dk/t7/api/products?category=" + category;

let productlistTemplate;
let productlistContainer;

fetch("https://kea-alt-del.dk/t7/api/products?category=" + category)
  .then((res) => res.json())
  .then(showProductlist);

function init() {
  console.log("init");

  productlistTemplate = document.querySelector("#productlist_template");
  console.log("productlistTemplate", productlistTemplate);

  productlistContainer = document.querySelector(".productlist_container");
  console.log("productlist_container", productlistContainer);

  // fetch(productlistURL)
  //   .then(function (response) {
  //     return response.json();
  //   })
  //   .then(function (json) {
  //     showProductlist(json);
  //   });
}

function calculateDiscountedPrice(originalPrice, discountPercentage) {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = originalPrice - discountAmount;
  return discountedPrice.toFixed(2);
}

//looper og kalder showProductlist
function showProductlist(productlistJSON) {
  let productlistClone;
  productlistJSON.forEach((productlist) => {
    console.log("Productlist", productlist);

    //fanger template
    const template = document.querySelector("#productlist_template").content;

    //lav en kopi
    productlistClone = productlistTemplate.cloneNode(true).content;

    //ændre indhold
    // productlistClone.querySelector(".image").src = productlist.image_url;
    productlistClone.querySelector(".image").src = `https://kea-alt-del.dk/t7/images/webp/640/${productlist.id}.webp`;
    productlistClone.querySelector(".image").alt = `Picture of ${productlist.productdisplayname}`;
    // productlistClone.querySelector("h2").textContent = `produktliste.html?category=${productlist.category}`;
    productlistClone.querySelector(".productlist_name").textContent = productlist.productdisplayname;
    productlistClone.querySelector(".brand").textContent = productlist.brandname;
    productlistClone.querySelector(".type").textContent = productlist.articletype;
    productlistClone.querySelector(".price").textContent = `${productlist.price} DKK`;
    productlistClone.querySelector(".read_more").href = `produkt.html?id=${productlist.id}`;

    //produktet er udsolgt
    if (productlist.soldout == 1) {
      productlistClone.querySelector(".image").classList.add("soldOut");
    } else {
      productlistClone.querySelector(".sold_out").classList.add("none");
    }

    //produktet er på udsalg
    if (productlist.discount == null) {
      console.log("discount");
      productlistClone.querySelector(".discounted").classList.add("none");
    } else {
      productlistClone.querySelector(".discounted").textContent = `-${productlist.discount}%`;
      productlistClone.querySelector(".new_price").textContent = `Ny pris ${calculateDiscountedPrice(productlist.price, productlist.discount)} DKK`;
      productlistClone.querySelector(".price").classList.add("udstreget");
    }

    //appende
    productlistContainer.appendChild(productlistClone);
  });
}
