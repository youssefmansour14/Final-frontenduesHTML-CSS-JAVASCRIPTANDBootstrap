let listCartHTML = document.querySelector(".returnCart .list");
listCartHTML.innerHTML = "";
let menClothes = [];

// ---------------------------------------------------------------------
// get all items from local storage
let cartItems = JSON.parse(localStorage.getItem("cartItems"));
let userProducts = []; // to add all the products that the user added it to cart
let totalPrice = 0; // to calculate the total price of the user products
// handel get cart items from local storage
(async function () {
  if(localStorage.getItem("userAuth") == 1){
    fetch("https://jsecommerceproject-default-rtdb.firebaseio.com/FinalProducts.json")
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      for (let key of cartItems) {
          // the div that contain the product
          let content = document.createElement("div");
          content.setAttribute("class", "item");
  
          // product image
          let productImg = document.createElement("img");
          productImg.setAttribute("src", data[key].image);
  
          // product title
          let title = document.createElement("h2");
          title.innerHTML = data[key].title;
  
          // product price
          let price = document.createElement("div");
          price.setAttribute("class", "price");
          price.innerHTML = data[key].price + "$";
          
          totalPrice += data[key].price ;
  
          // <i class="fa-sharp fa-solid fa-xmark"></i>
          let removeProductIcon = document.createElement("i");
          removeProductIcon.setAttribute("class","fa-sharp fa-solid fa-xmark");
          removeProductIcon.setAttribute("onclick","removeProduct(this)");
          removeProductIcon.setAttribute("id", key);
  
          content.appendChild(productImg);
          content.appendChild(title);
          content.appendChild(price);
          content.appendChild(removeProductIcon);
  
          listCartHTML.appendChild(content);
        }
        // the number of items on cart
        document.getElementById("totalQuantity").innerHTML = cartItems.length;
        // show the total price with only two decimal point
        document.getElementById("totalPrice").innerHTML = totalPrice.toFixed(2) + "$";
    })
  }
})();

//---------handel from items from cart from local storage
function removeProduct(obj){
  let indxe = cartItems.findIndex((a) => {return a==obj.id}); // to find the index of the item
  const removed = cartItems.splice(indxe,1);

  localStorage.removeItem("cartItems"); //  remove the old array of items from array to local storage
  localStorage.setItem("cartItems",JSON.stringify(cartItems)); // add to thenew array to local storage
  document.location.reload();
}

// ---------------------Handle Remove product
// function removeProduct(obj){
//   // console.log(obj.id);
//   fetch(`https://jsecommerceproject-default-rtdb.firebaseio.com/Carts/${obj.id}`,{
//     method : "delete"
//   })
//   .then((response) => {
//     console.log(response.json());
//   })
// }
///////////////////////////////////////////////////////////////////
var fullName = document.getElementById("fullname");
var userphone = document.getElementById("phoneNum");
fullName.addEventListener("focus", function () {
  fullName.style.border = "solid 1px blue";
  fullName.style.outline = "none";
});

fullName.addEventListener("blur", function () {
  fullName.style.border = "none";
  fullName.style.outline = "solid 1px black";
  var userNameRegex = new RegExp(/^[a-z]{3,}\s[a-z]{3,}$/i);
  var userName = fullName.value;
  // console.log(userName);
  if (!userNameRegex.test(userName)) {
    this.value = "Please fill in the correct format";
    // this.nextElementSibling.style.display = "block";
    // this.nextElementSibling.innerText = "FullName isnot the correct format"
    fullName.focus();
    fullName.select();
  } else {
    fullName.style.backgroundColor = "white";
    userphone.style.color = "black";
  }
});
userphone.addEventListener("blur", function () {
  userphone.style.border = "none";
  userphone.style.outline = "solid 1px black";
  var userphoneregex = new RegExp(/^(01)(0|1|2|5)[0-9]{8}$/);
  var phoneNumber = userphone.value;
  // console.log(userName);
  if (!userphoneregex.test(phoneNumber)) {
    this.value = "Please fill in the correct format";
    // this.nextElementSibling.style.display = "block";
    // this.nextElementSibling.innerText = "FullName isnot the correct format"
    userphone.focus();
    userphone.select();
  } else {
    userphone.style.backgroundColor = "white";
    userphone.style.color = "black";
  }
});


// =======================================================
// add item on firebase
// (async function () {
//   let userEmail = localStorage.getItem("userEmail");
//   document.getElementById("email").value = userEmail;// put the user email into the eamil input

//   fetch("https://jsecommerceproject-default-rtdb.firebaseio.com/Carts.json")
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     for (const key in data) {
//       if (data[key].userEmail == userEmail) {
//         userProducts.push(data[key].productId)
//       }
//     }
//   })// ---------------
//   .then(() => {
//     fetch("https://jsecommerceproject-default-rtdb.firebaseio.com/FinalProducts.json")
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       document.getElementById("totalQuantity").innerHTML = userProducts.length;
//       for (const key of userProducts) {
//         // the div that contain the product
//         let content = document.createElement("div");
//         content.setAttribute("class", "item");

//         // product image
//         let productImg = document.createElement("img");
//         productImg.setAttribute("src", data[key].image);

//         // product title
//         let title = document.createElement("h2");
//         title.innerHTML = data[key].title;

//         // product price
//         let price = document.createElement("div");
//         price.setAttribute("class", "price");
//         price.innerHTML = data[key].price + "$";
        
//         totalPrice += data[key].price ;

//         // <i class="fa-sharp fa-solid fa-xmark"></i>
//         let removeProductIcon = document.createElement("i");
//         removeProductIcon.setAttribute("class","fa-sharp fa-solid fa-xmark");
//         removeProductIcon.setAttribute("onclick","removeProduct(this)");
//         removeProductIcon.setAttribute("id", key);

//         content.appendChild(productImg);
//         content.appendChild(title);
//         content.appendChild(price);
//         content.appendChild(removeProductIcon);

//         listCartHTML.appendChild(content);
//       }
//       // show the total price with only two decimal point
//       document.getElementById("totalPrice").innerHTML = totalPrice.toFixed(2) + "$";
//     })
//   })

//   // =====================================================================
//   // fetch("https://jsecommerceproject-default-rtdb.firebaseio.com/products.json")
//   //   .then((response) => {
//   //     return response.json();
//   //   })
//   //   .then((data) => {
//   //     for (let i in data) {
//   //       console.log();
//   //       if (data[i].category == "men's clothing") menClothes.push(data[i]);
//   //     }
//   //     return menClothes;
//   //   })
//   //   .then((menClothes) => {
//   //     for (let i = 0; i < menClothes.length; i++) {
//   //       let imgPath = menClothes[i].image;
//   //       let productTitle = menClothes[i].title;
//   //       let productPrice = menClothes[i].price;

//   //       // let listCartHTML = document.querySelector(" .listproduct");

//   //       let content = document.createElement("div");
//   //       content.setAttribute("class", "item");

//   //       let productImg = document.createElement("img");
//   //       productImg.setAttribute("src", imgPath);

//   //       let title = document.createElement("h2");
//   //       title.innerHTML = productTitle;

//   //       let price = document.createElement("div");
//   //       price.setAttribute("class", "price");
//   //       price.innerHTML = productPrice + "$";

//   //       content.appendChild(productImg);
//   //       content.appendChild(title);
//   //       content.appendChild(price);

//   //       listCartHTML.appendChild(content);
//   //     }
//   //   });
// })();