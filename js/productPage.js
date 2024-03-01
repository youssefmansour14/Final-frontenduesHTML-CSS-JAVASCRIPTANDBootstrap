// get the product id from url
async function getProductId(){
    let params = new URL(document.location).searchParams;

    let productId = params.get("productId")
    return productId;
}
// get all products 
async function getData(){
    let response = await fetch("https://jsecommerceproject-default-rtdb.firebaseio.com/FinalProducts.json")
    return await response.json();
}
//get the product id and info
(async function(){

        let productId = await getProductId();
        // console.log(productId);

        let data= await getData();

        document.getElementById("productImage").src = data[productId].image;
        document.getElementById("productTitle").innerHTML = data[productId].title;
        document.getElementById("productCategory").innerHTML = data[productId].category;
        document.getElementById("product-description").innerHTML = data[productId].description;
        document.getElementById("product-price").innerHTML = data[productId].price + "$";
        document.getElementById("btn-buy").setAttribute("value" , productId);
        document.getElementById("btn-buy").setAttribute("onclick" , `addToCart(this,event)`);

        
        // btn.setAttribute("value" , key);
        // btn.setAttribute("onclick",`addToCart(this,event)`);
})();

//get feedback about this products
(async function(){
    let productId = await getProductId();

    let productData= await getData();

    fetch("https://jsecommerceproject-default-rtdb.firebaseio.com/feedback.json")
    .then((response) => {
        return response.json();
    })
    .then((feedbackData) => {
        for (const key in feedbackData) {
            if (feedbackData[key].product == productId) {
                let itemContainer = document.createElement("div");
                itemContainer.setAttribute("class","itemContainer");

                var userName = document.createElement("h2");
                userName.innerHTML = feedbackData[key].user;

                let feedback = document.createElement("p");
                feedback.innerHTML = feedbackData[key].Comment;

                itemContainer.appendChild(userName);
                itemContainer.appendChild(feedback);

                document.getElementById("feedbacks").appendChild(itemContainer);
            }
        }
    })
})();