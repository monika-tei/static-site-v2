const url = "https://kea-alt-del.dk/t7/api/products";

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    handleProductList(data);
  });

function handleProductList(data) {
  //console.log(data);
  data.forEach(showProduct);
}

// 1.before working with this function, we comment out all the articles but one
// 2. wrapping that first article in a template
// then copying it here to remember the article structure

/*  <article class="smallProduct">
          <img
            src="https://kea-alt-del.dk/t7/images/webp/640/1163.webp"
            alt="Sahara Team India Fanwear Round Neck Jersey"
          />
          <h3>Sahara Team India Fanwear Round Neck Jersey</h3> DONE
          <p class="subtle">Tshirts | Nike</p> DONE
          <p class="price"><span>Prev.</span> DKK 1595,-</p>
          <div class="discounted">
            <p>Now DKK 1560,-</p>
            <p>-34%</p>
          </div>
          <a href="product.html">Read More</a>
        </article> */

function showProduct(product) {
  console.log(product);
  // soldOut onSale
  //grab the template
  const template = document.querySelector("#smallProductTemplate").content;
  //clone it
  const copy = template.cloneNode(true);
  //make changes, we are looking at console log which part we are going to need for manipulation (article type, brand)
  copy.querySelector(
    ".subtle"
  ).textContent = `${product.articletype} | ${product.brandname}`;
  copy.querySelector("h3").textContent = product.productdisplayname;

  if (product.soldout) {
    copy.querySelector("article").classList.add("soldOut");
  }
  if (product.discount) {
    copy.querySelector("article").classList.add("onSale");
    copy.querySelector(".discounted p").textContent =
      product.price / product.discount;
  }
  //how to make things on DISCOUNT, we need somemath here
  //   <div class="discounted">
  //   <p>Now DKK 1560,-</p>
  //   <p>-34%</p>
  // </div>

  //grab parent
  const parent = document.querySelector("main");
  //append it
  parent.appendChild(copy);
}
//after the first two changes, we need to tackle the difficult ones where we have classes of discounts and sold out. Check the HTML skeleton to confirm class names
