

//////////////////////////////////////////////////////
var title, price, category, image, description, rating
var IdToFind;
///////////////////Btn`s//////////////////

var AddBtn = document.getElementById('AddBtn');
var UpdateBtn = document.getElementById('UpdateBtn');
var ShowBtn = document.getElementById('ShowBtn');
var DeleteBtn = document.getElementById('DeleteBtn');

////////////////Common Use Varaibles////////////////////

var database = firebase.database();
var TestRef = database.ref('test/');
var LocalStorageArry = [];
var currentUserId;
////////////////////////////////////
ReadData();
/////////////////Varibles From Form////////////////////
/////////////////////////////////////////////////////
function clearForm() {
  document.getElementById('ProductTitle').value = "";
  document.getElementById('ProductPrice').value = "";
  document.getElementById('ProductCategory').value = "";
  document.getElementById('ProductImageUrl').value = "";
  document.getElementById('ProductDescription').value = "";
  document.getElementById('ProductRate').value = "";
}

/////////////////////////////////////
function ReadData() {
  database.ref('products/').on('value', (snapshot) => {
    var data = snapshot.val();
    var Bag = ``;
    for (item in data) {
      Bag +=
        `
        <tr data-id = ${item} >
        <td>${data[item].id}</td>
        <td>${data[item].price}</td>
        <td >${data[item].category}</td>
        <td ><img src="${data[item].image}" width="200px" hight="200px"></td>
        <td >${data[item].rating}</td>
        <td>${data[item].title}</td>
        <td>${data[item].description}</td>
    `;
      document.getElementById('body').innerHTML = Bag;
    }

  });
}
////////////////////////////////////

AddBtn.onclick = function () {
  
  //////////////////////////////////////////////////////////////////////////
  ///////////////////// Use Local Storage To Generate Uniqe Id ///////////////////////////
  if (localStorage.getItem('Test') != null) {
    LocalStorageArry = JSON.parse(localStorage.getItem('Test'));
  }
  var Id;//--------------
  if (price != null) {
    Id = 1;
    var Idvalue = LocalStorageArry.map(function (x) { return x.Id; }).indexOf(Id);
    while (Idvalue != -1) {
      Id++;
      Idvalue = LocalStorageArry.map(function (x) { return x.Id; }).indexOf(Id);
    }
  }
  var LastIdInserted =
  {
    Id: Id,
    price:price
  }
  LocalStorageArry.push(LastIdInserted);
  localStorage.setItem("Test", JSON.stringify(LocalStorageArry));
  /////////////////////////////////////////////////////////////////////////
  title = document.getElementById('ProductTitle').value;
  price = document.getElementById('ProductPrice').value;
  category = document.getElementById('ProductCategory').value;
  image = document.getElementById('ProductImageUrl').value;
  description = document.getElementById('ProductDescription').value;
  rating = document.getElementById('ProductRate').value;
  //////////////////////////////////////////////////////////////////////////

  database.ref('products/' + Id).set({
    id: Id,
    title: title,
    price: price,
    category: category,
    image: image,
    description: description,
    rating: rating
  }).then((resolve) => { console.log("Inserted") }
    , (reject) => { console.log("Error") })

  clearForm();
  ReadData();
  Id++;
}

ShowBtn.onclick = function () {
  IdToFind = prompt("Enter Product Id To Show");
  firebase
    .database()
    .ref("products/" + IdToFind)
    .on("value", function (snap) {
      // IdToFind  = snap.val().id;
      document.getElementById('ProductTitle').value = snap.val().title;
      document.getElementById('ProductPrice').value = snap.val().price;
      document.getElementById('ProductCategory').value = snap.val().category;
      document.getElementById('ProductImageUrl').value = snap.val().image;
      document.getElementById('ProductDescription').value = snap.val().description;
      document.getElementById('ProductRate').value = snap.val().rating;
    });
    UpdateBtn.classList.replace("d-none", "d-block");
    DeleteBtn.classList.replace("d-none", "d-block");
};

UpdateBtn.onclick = function () {
   id =  IdToFind;
  title = document.getElementById('ProductTitle').value;
  price = document.getElementById('ProductPrice').value;
  category = document.getElementById('ProductCategory').value;
  image = document.getElementById('ProductImageUrl').value;
  description = document.getElementById('ProductDescription').value;
  rating = document.getElementById('ProductRate').value;

  firebase
    .database()
    .ref("products/" + IdToFind)
    .update({
      id:IdToFind,
      title: title,
      price: price,
      category: category,
      image: image,
      description: description,
      rating: rating
    });
  alert("Product No."+" "+IdToFind+" " + " Updated");
  clearForm();
  UpdateBtn.classList.replace("d-block", "d-none");
  DeleteBtn.classList.replace("d-block", "d-none");
};
DeleteBtn.onclick = function () {
  id =  IdToFind;
  title = document.getElementById('ProductTitle').value;
  price = document.getElementById('ProductPrice').value;
  category = document.getElementById('ProductCategory').value;
  image = document.getElementById('ProductImageUrl').value;
  description = document.getElementById('ProductDescription').value;
  rating = document.getElementById('ProductRate').value;
  firebase
    .database()
    .ref("products/" + IdToFind)
    .remove();
  alert("Product No."+" "+IdToFind+" " + " Deleted");
  clearForm();
  UpdateBtn.classList.replace("d-block", "d-none");
  DeleteBtn.classList.replace("d-block", "d-none");
};

//show data from firebase ----------------

// fetch("https://jsecommerceproject-default-rtdb.firebaseio.com/products.json")
// .then((response) => {
//   return response.json();
// })
// .then((data) => {
//   for (const key in data) {
//     console.log(data[key]);
//   }
// })

//----------------------------------------------------------

function selectFile(){
  let selectFile = document.getElementById("selectFile");
  selectFile.click();
  
}

function getImgSrc(){
  let selectFile = document.getElementById("selectFile");
  let imgSrc="";
  if ('files' in selectFile) {
    if (selectFile.files.length == 0) {
      alert("select file");
    } else {
      for (var i = 0; i < selectFile.files.length; i++) {
        var file = selectFile.files[i];
        if ('name' in file) {
          imgSrc = file.name;
        }
      }
    }
  }
  document.getElementById("ProductImageUrl").value = "../resources/"+imgSrc;
}