// user auth from login page
function authUser(obj,event){
    event.preventDefault();
    let user = {
        userEmail : document.getElementById("email").value,
        userPassword : document.getElementById("password").value,
        auth : false
    }
    fetch("https://jsecommerceproject-default-rtdb.firebaseio.com/finalUser.json")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        for (const key in data) {
            if(data[key].email == user.userEmail && data[key].password == user.userPassword && data[key].isAdmin == 1){
                window.open("../CRUD Demo With Firebase&localstorage/index.html","_self");
            }
            else if(data[key].email == user.userEmail && data[key].password == user.userPassword){
                user.auth = true;
                break;
            }
        }
        
        
    if(user.auth == false){
        document.getElementById("error").style.display = "block";
    }
    else{
        saveInfo(user.userEmail);
    }
    })
}
// --------------------------------------------
function logOut(){
    localStorage.removeItem("userAuth");//sessionStorage.removeItem("userAuth");
    localStorage.removeItem("userEmail");//sessionStorage.removeItem("userEmail");

    // document.getElementById("profileAc").style.display = "none";
    document.getElementById("log-btn").innerHTML = "LogIn";

    localStorage.removeItem("cartItems"); //  remove the old array of items from array to local storage

    window.open("login.html","_self");
}

/// go to home page and save user info
function saveInfo(userEmail){
    localStorage.setItem("userEmail" , userEmail);//sessionStorage.setItem("userEmail" , user.userEmail);
    localStorage.setItem("userAuth" , "1");//sessionStorage.setItem("userAuth" , "1");

    // document.getElementById("profileAc").style.display = 'block';
    // document.getElementById("log-btn").innerHTML = "LogOut";
    window.open("home.html" , "_self");
}

// ---------------->>> register <<<------------------------
function addNewUser(obj,event){
    event.preventDefault();
    let user = {
        fullName : document.getElementById("fullName").value,
        userEmail : document.getElementById("email").value,
        userPassword : document.getElementById("password").value,
        confirmPassword : document.getElementById("confirm-password").value,
        auth : false
    }
    
    if(user.userPassword != user.confirmPassword){
        document.getElementById("pError").style.display = "block";
    }
    else{
            fetch("https://jsecommerceproject-default-rtdb.firebaseio.com/finalUser.json")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            for (const key in data) {
                if(data[key].email == user.userEmail){
                    user.auth = true;
                    break;
                }
                // console.log(data[key].email)
            }
        })
        console.log(user)
        if(user.auth == true){
            document.getElementById("error").style.display = "block";
        }
        else{
            let newUser = {
                fullName:user.fullName,
                email:user.userEmail,
                password:user.userPassword,
                isAdmin:0
            }

            postData("https://jsecommerceproject-default-rtdb.firebaseio.com/finalUser.json",newUser);
            saveInfo(user.userEmail);
        }
    }

}

async function postData(url = "" ,data ={}){
    const response = await fetch(url,{
        method: "post",

        body: JSON.stringify(data),//to convert from object to json
    });
    return response.json();
}

//===============================================================================

// let newUser = {
//         fullName:"hassan tawfik",
//         email:"hassan@gmail.com",
//         password:"hassan",
//         isAdmin:0
//     }
    
//     postData("https://jsecommerceproject-default-rtdb.firebaseio.com/finalUser.json",newUser);


//==========================