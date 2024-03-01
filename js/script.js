
// get best selling products
(async function(){
    fetch("https://jsecommerceproject-default-rtdb.firebaseio.com/FinalProducts.json")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // console.log(data)
        let i=0;
        for (const key in data) {
            if (data[key].rating > 4.5) {
                // product info container
                let productContainer = document.createElement("div");
                productContainer.setAttribute("class","content");
                productContainer.setAttribute("id" , key);
                productContainer.setAttribute("onclick","goToProduct(this)")

                // product image
                let productImg = document.createElement("img");
                productImg.setAttribute("src",data[key].image);

                productContainer.appendChild(productImg);

                // Product Title
                let productTitle = document.createElement("h3");
                productTitle.innerHTML = data[key].title;

                productContainer.appendChild(productTitle);

                // product price
                let productPrice = document.createElement("h6");
                productPrice.innerHTML = data[key].price + "$";

                productContainer.appendChild(productPrice);

                // Rating Star ----------------
                // checked or stared icons
                for(let i=0; i<Math.floor(data[key].rating); i++){
                    let icon = document.createElement("i");
                    icon.setAttribute("class" , "bx bxs-star checked")
                    productContainer.appendChild(icon);
                }
                //to check the secimal number of rate
                // if it is lower than 3 the star will be unchecked
                let x = (data[key].rating - Math.floor(data[key].rating)) * 10;
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
                for(let i=0; i<(4 - Math.floor(data[key].rating)); i++){
                    let icon = document.createElement("i");
                    icon.setAttribute("class" , "bx bxs-star")
                    productContainer.appendChild(icon);
                }

                // button buy now
                let btn = document.createElement("button");
                btn.innerHTML = "Buy Now";
                btn.setAttribute("value" , key);
                btn.setAttribute("onclick",`addToCart(this,event)`);

                productContainer.appendChild(btn);

                // append the product container info to the body
                document.getElementById("bestSelling").appendChild(productContainer);
                
                // to show only three results 
                i++;
                if(i == 3)
                    break;
                
            }
        }
    })
})();


// get fashion products
(async function(){
    fetch("https://jsecommerceproject-default-rtdb.firebaseio.com/FinalProducts.json")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // console.log(data)
        let i=0;
        for (const key in data) {
            if (data[key].category.includes("Fashion")) {
                // console.log(data[key].category)
                // product info container
                let productContainer = document.createElement("div");
                productContainer.setAttribute("class","content");
                productContainer.setAttribute("id" , key);
                productContainer.setAttribute("onclick","goToProduct(this)")

                // product image
                let productImg = document.createElement("img");
                productImg.setAttribute("src",data[key].image);

                productContainer.appendChild(productImg);

                // Product Title
                let productTitle = document.createElement("h3");
                productTitle.innerHTML = data[key].title;

                productContainer.appendChild(productTitle);

                // product price
                let productPrice = document.createElement("h6");
                productPrice.innerHTML = data[key].price + "$";

                productContainer.appendChild(productPrice);

                // Rating Star ----------------
                // checked or stared icons
                for(let i=0; i<Math.floor(data[key].rating); i++){
                    let icon = document.createElement("i");
                    icon.setAttribute("class" , "bx bxs-star checked")
                    productContainer.appendChild(icon);
                }
                //to check the secimal number of rate
                // if it is lower than 3 the star will be unchecked
                let x = (data[key].rating - Math.floor(data[key].rating)) * 10;
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
                for(let i=0; i<(4 - Math.floor(data[key].rating)); i++){
                    let icon = document.createElement("i");
                    icon.setAttribute("class" , "bx bxs-star")
                    productContainer.appendChild(icon);
                }

                // button buy now
                let btn = document.createElement("button");
                btn.innerHTML = "Buy Now";
                btn.setAttribute("value" , key);
                btn.setAttribute("onclick",`addToCart(this,event)`);

                productContainer.appendChild(btn);

                // append the product container info to the body
                document.getElementById("fashion").appendChild(productContainer);
                
                // to show only three results 
                i++;
                if(i == 3)
                    break;
                
            }
        }
    })
})();

// handle section button
function goToFashionCategory(){
    window.open("productSearch.html?search=Fashion","_self");
}

// handle best seeling button
function goToBestSelling(){
    window.open("productSearch.html?search=Best Selling","_self");
}

// handle function that sent product info to the product page
function goToProduct(obj){
    window.open(`productPage.html?productId=${obj.id}`,"_self");
}