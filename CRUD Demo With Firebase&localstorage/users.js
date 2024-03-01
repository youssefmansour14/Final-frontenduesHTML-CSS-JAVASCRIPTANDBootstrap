//////////////////////////////////////////////////////
var email, password, userName, isAdmin
var UserNameToFind;
///////////////////Btn`s//////////////////

var AddBtn = document.getElementById('AddBtn');
var UpdateBtn = document.getElementById('UpdateBtn');
var ShowBtn = document.getElementById('ShowBtn');
var DeleteBtn = document.getElementById('DeleteBtn');

////////////////Common Use Varaibles////////////////////

var database = firebase.database();
var userRef = database.ref('user/');
////////////////////////////////////
ReadData();
/////////////////Varibles From Form////////////////////
/////////////////////////////////////////////////////
function clearForm() {
    document.getElementById('UserEmail').value = "";
    document.getElementById('UserPassword').value = "";
    document.getElementById('UserName').value = "";
    document.getElementById('IsAdmin').value = "";
}

/////////////////////////////////////
function ReadData() {
    database.ref('user/').on('value', (snapshot) => {
        var data = snapshot.val();
        var Bag = ``;
        for (item in data) {
            Bag +=
                `
        <tr>
        <td>${data[item].email}</td>
        <td >${data[item].password}</td>
        <td>${data[item].userName}</td>
        <td >${data[item].isAdmin}</td>
        </tr>
    `;
            document.getElementById('body').innerHTML = Bag;
        }

    });
}
////////////////////////////////////

AddBtn.onclick = function () {

    /////////////////////////////////////////////////////////////////////////
    email = document.getElementById('UserEmail').value;
    password = document.getElementById('UserPassword').value;
    userName = document.getElementById('UserName').value;
    isAdmin = document.getElementById('IsAdmin').value;
    //////////////////////////////////////////////////////////////////////////
    database.ref('user/' + userName).set({
        email: email,
        password: password,
        userName: userName,
        isAdmin: isAdmin
    }).then((resolve) => { console.log("Inserted") }
        , (reject) => { console.log("Error") })

    clearForm();
    ReadData();
}

ShowBtn.onclick = function () {
    UserNameToFind = prompt("Enter User Name To Show");
    firebase
        .database()
        .ref("user/" + UserNameToFind)
        .on("value", function (snap) {
            document.getElementById('UserEmail').value = snap.val().email;
            document.getElementById('UserName').value = snap.val().userName;
            document.getElementById('IsAdmin').value = snap.val().isAdmin;
            document.getElementById('UserPassword').value = snap.val().password;
        });
    UpdateBtn.classList.replace("d-none", "d-block");
    DeleteBtn.classList.replace("d-none", "d-block");

};

UpdateBtn.onclick = function () {

    email = document.getElementById('UserEmail').value;
    password = document.getElementById('UserPassword').value;
    userName = document.getElementById('UserName').value;
    isAdmin = document.getElementById('IsAdmin').value;

    firebase
        .database()
        .ref("user/" + UserNameToFind)
        .update({
            email: email,
            password: password,
            userName: userName,
            isAdmin: isAdmin
        });
    alert(" The User" + " " + UserNameToFind + " " + " Updated");
    clearForm();

    UpdateBtn.classList.replace("d-block", "d-none");
    DeleteBtn.classList.replace("d-block", "d-none");
};
DeleteBtn.onclick = function () {
    email = document.getElementById('UserEmail').value;
    password = document.getElementById('UserPassword').value;
    userName = document.getElementById('UserName').value;
    isAdmin = document.getElementById('IsAdmin').value;

    firebase
        .database()
        .ref("user/" + UserNameToFind)
        .remove();
    alert("The User" + " " + UserNameToFind + " " + " Deleted");
    clearForm();

    UpdateBtn.classList.replace("d-block", "d-none");
    DeleteBtn.classList.replace("d-block", "d-none");
};







// fetch("https://getnow-b0d68-default-rtdb.firebaseio.com/user.json")
//     .then((response) => {
//         return response.json();
//     })
//     .then((data) => {
//         for (const key in data) {
//             console.log(data[key]);
//         }
//     })