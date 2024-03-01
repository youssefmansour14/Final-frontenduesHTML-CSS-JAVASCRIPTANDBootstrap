
var myusers;
var myemail;
var text ;
var objct;
var productItem;

function feedback(){
     myusers =document.getElementById("inputUser").value ;
     myemail = document.getElementById("emailUser").value ;
     text = document.getElementById("inputBox").value;
     productItem = document.getElementById("products").value;
     objct={
        user:myusers,
        email:myemail,
        product:productItem,
        Comment:text
    }

    var XHR = new XMLHttpRequest ();
    XHR.open("post","https:jsecommerceproject-default-rtdb.firebaseio.com/feedback.json ",true)
    XHR.onreadystatechange=function(){
        if(XHR.readyState == 4 && XHR.status== 200){
            console.log("done")
        }
    
    }
    XHR.send(JSON.stringify(objct));
    console.log(objct + "--------------------");
}



async function getfeedback(){
    var requesrGet =  await  fetch ("https:jsecommerceproject-default-rtdb.firebaseio.com/feedback.json")
    var newrequst = await requesrGet.json()
    console.log(newrequst)
    return newrequst;
}
var data = getfeedback();
console.log(data)


async function showfeedback(){
    var returnData = await data ;
var item ;
    for( item in returnData ){
        var mydiv = document.createElement("div");
        mydiv.setAttribute("class","fullWidth");

        var head =document.createElement("h1");
        head.innerHTML = returnData[item].user;

        mydiv.appendChild(head)

        var mail =document.createElement("h2");
        var mymail =document.createTextNode(returnData[item].email);
        mail.appendChild(mymail)
        mydiv.appendChild(mail)

        var pargraph =document.createElement("p");
        var textPragraph =document.createTextNode(returnData[item].Comment);
        pargraph.appendChild(textPragraph);
        mydiv.appendChild(pargraph);

        // var line =document.createElement("hr");
        //  mydiv.appendChild(line);
        
        
         document.getElementById("contaner").appendChild(mydiv);
        


    }
}

// get products categories
(async function(){
    let categories = [];
    fetch("https://jsecommerceproject-default-rtdb.firebaseio.com/FinalProducts.json")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        for (const key in data) {
            let categ = data[key].category;
            if(!categories.includes(categ)){
                categories.push(categ);
                let option = document.createElement("option");
                option.setAttribute("value",data[key].category);
                option.innerHTML = data[key].category;
                document.getElementById("category").appendChild(option);
            }
        }
    })
})();

function fillProductsSelect(){
    document.getElementById("products").innerHTML = "";
    fetch("https://jsecommerceproject-default-rtdb.firebaseio.com/FinalProducts.json")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // get the selected categories to show all elements with that category
        let selectedCateg = document.getElementById("category").value;
        for (const key in data) {
            if(data[key].category == selectedCateg){
                let option = document.createElement("option");
                option.setAttribute("value",key);
                option.innerHTML = data[key].title;
                document.getElementById("products").appendChild(option);
            }
        }
    })
    .then(() => {
        document.getElementById("products").style.display = "block";
    })
}




