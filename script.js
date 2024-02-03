window.addEventListener("DOMContentLoaded", init);

const productlistURL = "https://kea-alt-del.dk/t7/api/products";

let productlistTemplate;
let productlistContainer;

function init() {
  console.log("init");

  productlistTemplate = document.querySelector("#productlist_template");
  console.log("productlistTemplate", productlistTemplate);

  productlistContainer = document.querySelector(".productlist_container");
  console.log("productlist_container", productlistContainer);

  fetch(productlistURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      showProductlist(json);
    });
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
    productlistClone.querySelector(".productlist_name").textContent = productlist.productdisplayname;
    productlistClone.querySelector(".brand").textContent = productlist.brandname;
    productlistClone.querySelector(".type").textContent = productlist.articletype;
    productlistClone.querySelector(".price").textContent = productlist.price;

    //produktet er udsolgt
    if (productlist.soldout) {
      productlistClone.querySelector("article").classList.add("soldOut");
    }
    //appende
    productlistContainer.appendChild(productlistClone);
  });
}
