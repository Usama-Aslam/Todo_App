var config = {
  apiKey: "AIzaSyB7N5R_TZ_tX3G4ZHOdEBhstaNzQvs63Zg",
  authDomain: "myproject-3eae6.firebaseapp.com",
  databaseURL: "https://myproject-3eae6.firebaseio.com",
  projectId: "myproject-3eae6",
  storageBucket: "myproject-3eae6.appspot.com",
  messagingSenderId: "131756317443"
};
var nme = document.getElementById("name");
var email = document.getElementById("email");
var number = document.getElementById("number");
var password = document.getElementById("password");
firebase.initializeApp(config);
var arr = [];
var uidValue="";


function submit() {
  if (nme.value.indexOf("  ") != -1) {
    alert("No Double Space");
    nme.focus();
    return false;
  }
  else if (nme.value == "" || email.value == "" || password.value == "") {
    alert("Field cannot be empty");
    return false;
  }
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then(function (result) {
      var obj = {
        nme: nme.value,
        email: result.email,
        phone: number.value,
        pass: password.value,
        uid: result.uid,
        emailVerified: result.emailVerified
      };
      console.log(obj);
      firebase.database().ref("/").child("Todo/Registration/" + result.uid).set(obj);
      console.log(result)
      setTimeout(() => { 
        window.location.href = "index.html";
       }, 1000);
      nme.value = "";
      email.value = "";
      number.value = "";
      password.value = "";
      return true;
    })
    .catch(function (error) {
      console.log(error);
      if(!(nme.value == "" && email.value == "" && password.value == ""))
      alert(error);
      return false;
    });
}



/* 
firebase.database().ref("/").child("Todo/Registration/").on("child_added", (data) => {
  var obj = data.val();
  arr.push(obj);
  console.log("array");
  console.log(arr);
})
 */


var found = false;
var useremail = document.getElementById("userEmail");
var pass = document.getElementById("userPass");

var login=document.getElementById("login");
var logout=document.getElementById("logout");

function logIn(){
  firebase.auth().signInWithEmailAndPassword(useremail.value,pass.value)
  .then(function(result){
    console.log(result.uid);
      setTimeout(()=>{
        window.location.href="todo.html";
        login.style.display="none";
        logout.style.display="block";
      },1000)
  })
  .catch(function(error){
    console.log(error.message);
  });
}

/* var login=document.getElementById("login");
var logout=document.getElementById("logout");
firebase.auth().onAuthStateChanged((user)=>{
  if(user){
     var email=user.email;
     var uid=user.uid;
     console.log(email);
     console.log(uid);
     login.style.display="none";
     logout.style.display="block";
    setTimeout(()=>{window.location.href="todo.html";},3000);
    }
  else{
    login.style.display="block";
    logout.style.display="none";
    console.log("User is SignOut");
  }
  
})
function logout(){
  firebase.auth().signOut()
  .then(result=>{
    window.location.href="index.html";
  })
  .catch(error=>{
    console.log(error);
  })
}
 *//* function login() {
  for (var i = 0; i < arr.length; i++) {
    if (useremail.value == arr[i].email && pass.value == arr[i].pass) {
      console.log("Account found success");
      uidValue= arr[i].uid;
 */      /* var key=arr[i].uid;
      localStorage.setItem("userkey",key); */
/*       key=uidValue;
      console.log("my uid value"+uidValue);
      found = true;
      setTimeout(()=>{window.location = "todo.html";},1000)
      break;
    }
  }
  if (found == false) {
    console.log("Account not Found")
  }
  console.log("uid found" + uidValue);
}
 *//* var key=localStorage.getItem("userkey"); */
/*  function add() {
  
  var val = document.getElementById('val');
  if (val.value == "") {
    alert("error");
  }
  else {
    var list = document.getElementById('list');
    var li = document.createElement("LI");
    var btn = document.createElement("BUTTON");
    var btntxt = document.createTextNode("DELETE");
    btn.appendChild(btntxt);
    btn.onclick = function () {
      var li = this.parentElement;
      var ul = li.parentElement;
      ul.removeChild(li)
    }
    var text = document.createTextNode(val.value);
    li.appendChild(text);
    li.appendChild(btn);
    list.appendChild(li);
    /*  key=key.toString();
     console.log(key); */
   /*  var obj = {
      id: uidValue,
      item: val.value
    }
    firebase.database().ref("/").child("Todo/AppData").push(obj);
    console.log(obj.uid);
    val.value = "";
  }
}
function del(){
  document.getElementById("list").innerHTML="";   
}
var b=[];
window.onload=function(){
  firebase.database().ref("/").child("LoginEmail-Data/"+key).on("child_added",data=>{
    var obj=data.val();
    obj.id=data.key;
    b.push(obj);
    console.log(b);
  })
}; */