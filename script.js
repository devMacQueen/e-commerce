let img_div = document.getElementById("img-div");

let category = document.getElementById("category");

let imges = img_div.querySelectorAll("img");
let title = img_div.querySelectorAll(".title");
let price = img_div.querySelectorAll(".price");
let description = img_div.querySelectorAll(".desc");
let btn = img_div.querySelectorAll("button")

// console.log(imges);
// console.log(title);
// console.log(price);
// console.log(img_div)

async function getFour() {
  try {
    await fetch("https://dummyjson.com/products?limit=4")
      .then((res) => res.json())
      .then((data) => {
        data.products.forEach((p, i) => {
          imges[i].src = p.thumbnail;
          title[i].innerText = p.title;
          description[i].innerText = p.description
          price[i].innerText = `$${p.price}`;
          btn[i].dataset.product = JSON.stringify(p);
          console.log(btn[i])
        });
      });
  } catch (error) {}
}
getFour();

async function getFourCat(category) {
  try {
    await fetch(`https://dummyjson.com/products/category/${category}?limit=4`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        const category_div = document.getElementById("category-div");
        const cat_imges = category_div.querySelectorAll("img");
        const cat_title = category_div.querySelectorAll(".title");
        const cat_price = category_div.querySelectorAll(".price");
        const cat_desc = category_div.querySelectorAll(".desc");
        const cat_btn = category_div.querySelectorAll("button")


        data.products.forEach((p, i) => {
          cat_imges[i].src = p.thumbnail;
          cat_title[i].innerText = p.title;
          cat_desc[i].innerText = p.description
          cat_price[i].innerText = `$${p.price}`;
          cat_btn[i].dataset.product = JSON.stringify(p);
        });
      });
  } catch (error) {
    console.error(error.message);
  }
}

category.addEventListener("change", (e) => {
  getFourCat(category.value);
});
