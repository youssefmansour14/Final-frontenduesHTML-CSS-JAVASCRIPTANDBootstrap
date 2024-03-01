
// get best selling products
(async function(){
    let productsArr = []; // that contain the result of search
    let filterProducts = []; // that contain the result of filter
    let i=0; // to check the array has elements or not

    let params = new URL(document.location).searchParams;
    let wordSearch = params.get("search");

    // title on top of page about the search word or category
    let searchHeader = document.createElement("h2");
    searchHeader.innerHTML = `Search about ${wordSearch}`;
    document.getElementById("sectionTitle").appendChild(searchHeader);

    // handle best selling section
    if(wordSearch == "Best Selling"){
        fetch("https://jsecommerceproject-default-rtdb.firebaseio.com/FinalProducts.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // console.log(data)
            for (const key in data) {
                if (data[key].rating > 4.5) {
                    let obj = {
                        key: key,
                        data: data[key]
                    }
                    productsArr.push(obj);
                    i++;
                }
            }
            // if there is no results founded on the search
            if(i==0){
                let notFound = document.createElement("p");
                notFound.setAttribute("class","notFound");
                notFound.innerHTML = `No results found for '${wordSearch}'!`;
        
                // append the product container info to the body
                document.getElementById("wordSearch").appendChild(notFound);
            }
            else{
                builtProduct(productsArr);
            }
        })
    }
    else{
            
        fetch("https://jsecommerceproject-default-rtdb.firebaseio.com/FinalProducts.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //regEx with value of the incoming word to search about it
            let regx = new RegExp(wordSearch,'i');
            for (const key in data) {
                if (regx.test(data[key].category) || regx.test(data[key].title) || regx.test(data[key].description)) {//data[key].category == obj
                    let obj = {
                        key: key,
                        data: data[key]
                    }
                    productsArr.push(obj);
                    i++;
                }
            }
            // if there is no results founded on the search
            if(i==0){
                let notFound = document.createElement("p");
                notFound.setAttribute("class","notFound");
                notFound.innerHTML = `No results found for '${wordSearch}'!`;
        
                // append the product container info to the body
                document.getElementById("wordSearch").appendChild(notFound);
            }
            else{
                builtProduct(productsArr);
            }
        })
    }
})();

//built prodcut container function 
function builtProduct(arr){
    for (const key in arr) {
         /// product info container
         let productContainer = document.createElement("div");
         productContainer.setAttribute("class","content");
         productContainer.setAttribute("id" , arr[key].key);
         productContainer.setAttribute("onclick","goToProduct(this)")

         // product image
         let productImg = document.createElement("img");
         productImg.setAttribute("src",arr[key].data.image);

         productContainer.appendChild(productImg);

         // Product Title
         let productTitle = document.createElement("h3");
         productTitle.innerHTML = arr[key].data.title;

         productContainer.appendChild(productTitle);

         // product price
         let productPrice = document.createElement("h6");
         productPrice.innerHTML = arr[key].data.price + "$";

         productContainer.appendChild(productPrice);

         // Rating Star ----------------
         // checked or stared icons
         for(let i=0; i<Math.floor(arr[key].data.rating); i++){
             let icon = document.createElement("i");
             icon.setAttribute("class" , "bx bxs-star checked")
             productContainer.appendChild(icon);
         }
         //to check the secimal number of rate
         // if it is lower than 3 the star will be unchecked
         let x = (arr[key].data.rating- Math.floor(arr[key].data.rating)) * 10;
         if(x <= 3){
             let icon = document.createElement("i");
             icon.setAttribute("class" , "bx bxs-star")
             productContainer.appendChild(icon);
         }
         // if it is more 8 the star will be checked
         else if(x >= 7){
             let icon = document.createElement("i");
             icon.setAttribute("class" , "bx bxs-star checked")
             productContainer.appendChild(icon);
         }
         // if it is between 3 and 8  the satr will be half checked
         else{
             let icon = document.createElement("i");
             icon.setAttribute("class" , "bx bxs-star-half checked")
             productContainer.appendChild(icon);
         }
         // unchecked icons
         for(let i=0; i<(4 - Math.floor(arr[key].data.rating)); i++){
             let icon = document.createElement("i");
             icon.setAttribute("class" , "bx bxs-star")
             productContainer.appendChild(icon);
         }

         // button buy now
         let btn = document.createElement("button");
         btn.innerHTML = "Buy Now";
         btn.setAttribute("value" , arr[key].key);
         btn.setAttribute("onclick",`addToCart(this,event)`);

         productContainer.appendChild(btn);

         // append the product container info to the body
         document.getElementById("wordSearch").appendChild(productContainer);
    }
}

// filter data by category
var categFilter = document.getElementsByClassName("category");
// categFilter = document.querySelectorAll("#inerlist li input");
// console.log(categFilter);
for (let index = 0; index < categFilter.length; index++) {
    console.log("---------")
}
function filterByCategory(obj){
    console.log("test categ");
}
// --------------------------------------------------
// handle function that sent product info to the product page
function goToProduct(obj){
    window.open(`productPage.html?productId=${obj.id}`, "_self");
}
