// add the product to the cart
// the obj refer to the key of the product

// async function addToCart(obj,event){
//     event.stopPropagation();
//     if(localStorage.getItem("userAuth") != "1"){
//         alert("Plz Login First");
//         window.open("login.html" , "_self");
//     }
//     else if(localStorage.getItem("userAuth") == "1"){
//         let productObj = {
//             productId : obj.value,
//             userEmail : localStorage.getItem("userEmail") //sessionStorage.getItem("userEmail")
//         }
//         let response = await fetch("https://jsecommerceproject-default-rtdb.firebaseio.com/Carts.json",{
//             method:"post",
//             body:JSON.stringify(productObj)
//         })
//         let data = await response.json();
//         if(data){
//             alert("The item is added successfully");
//         }
//     }
// }

// to save the cart items on it
let cartItems = [];
cartItems = (localStorage.getItem("cartItems"))?JSON.parse(localStorage.getItem("cartItems")):[];
async function addToCart(obj,event){
    event.stopPropagation();
    if(localStorage.getItem("userAuth") != "1"){
        alert("Plz Login First");
        window.open("login.html" , "_self");
    }
    else{
        cartItems.push(obj.value);
        console.log(cartItems);
        localStorage.setItem("cartItems",JSON.stringify(cartItems));
        alert("The item is added successfully");
    }
}