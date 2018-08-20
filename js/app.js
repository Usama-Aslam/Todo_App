var config = {
  apiKey: "AIzaSyB7N5R_TZ_tX3G4ZHOdEBhstaNzQvs63Zg",
  authDomain: "myproject-3eae6.firebaseapp.com",
  databaseURL: "https://myproject-3eae6.firebaseio.com",
  projectId: "myproject-3eae6",
  storageBucket: "myproject-3eae6.appspot.com",
  messagingSenderId: "131756317443"
};
firebase.initializeApp(config);

var login = document.getElementById("login");
var logout = document.getElementById("logout");
var uid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    email = user.email;
    uid = user.uid;
    console.log(email);
    console.log(uid);
    login.style.display = "none";
    logout.style.display = "block";
  }
  else {
    login.style.display = "block";
    logout.style.display = "none";
    console.log("User is SignOut");
  }
});

function logOut() {
  firebase.auth().signOut()
    .then(result => {
      login.style.display = "block";
      logout.style.display = "none";
      window.location.href = "index.html";
    })
    .catch(error => {
      console.log(error);
    });
};
/* 
function add(currtodo="",itemID="") {
  var val = document.getElementById('val');
  if (val.value == "") {
    alert("error");
  }
  else {
    if(!(itemID)){
      itemID="Todo"+i
    }
    i++;
    var list = document.getElementById('list');
    var li = document.createElement("LI");
    var btn = document.createElement("BUTTON");
    var btntxt = document.createTextNode("DELETE");
    btn.appendChild(btntxt);
    btn.onclick = function () {
      var li = this.parentElement;
      var ul = li.parentElement;
      ul.removeChild(li);
    }
    btn.addEventListener('click',()=>{
      firebase.database().ref("/").child("Todo/AppData/"+itemID).remove();
      console.log("deleted");
    })
    var text = document.createTextNode(val.value);
    li.appendChild(text);
    li.appendChild(btn);
    list.appendChild(li);
    /*  key=key.toString();
     console.log(key); */
    /*var obj = {
      id: uid,
      item: val.value
    }
    firebase.database().ref("/").child("Todo/AppData").push(obj);
    console.log(obj.id);
    val.value = "";
  }
} */

var val=document.getElementById("val");
var btn=document.getElementById("btn");
btn.addEventListener('click',(event)=>{
  add(val.value);
  val.value="";
})

var deletekeys=[]
let itemID;

function add(currentTodo="",itemID=0,save=false){
  console.log("received",itemID);
  var list=document.getElementById("list");
  var li=document.createElement("LI");
  var btn=document.createElement("BUTTON");
  var btnText=document.createTextNode("Delete");
  btn.appendChild(btnText);
  btn.onclick=function(){
    var li=this.parentElement;
    var ul=li.parentElement;
    ul.removeChild(li);
    firebase.database().ref("/").child("Todo/AppData/"+itemID).remove();
    console.log("deleted ",itemID," from database");
  }
  var todoValue;
  if(currentTodo!=""){
    todoValue=currentTodo;
  }
  var obj = {
    id: uid,
    item:todoValue
  }
  if(save==false){
    itemID=firebase.database().ref("/").child("Todo/AppData").push(obj).key;
    console.log(obj);
    console.log(itemID)
    deletekeys.push(itemID);
/*     firebase.database().ref("/").child("Todo/AppData").once("value")
    .then(data=>{
      console.log("data from save condition",data.val())
    }) */
  }
  var text=document.createTextNode(todoValue);
  li.appendChild(text);
  li.appendChild(btn);
  list.appendChild(li);
}


checkTodo();
function checkTodo() {
  firebase.database().ref("/").child("Todo/AppData").once("value")
    .then(function (result) {
      /* var itemID=[];
      result.forEach(function (itemData) {  /*for getting inside the todo/Appdata and getting the unique key of todo*/
        /* itemID.push(itemData.key);
      });
      console.log(itemID);*/
       var postObj = result.val();       /*we call all the data from appdata*/
       var keys = Object.keys(postObj);  /*we are again asking for todo unique key so that we can run our loop till the end of todo list*/
      console.log(keys);
      for (var i = 0; i < keys.length; i++) { 
        var currentObj = postObj[keys[i]];  /*we got the first todo and enter to the first todo*/
        /* console.log("my uidd",uid);
        console.log("current uid",currentObj.id); */  /*the first todo having the uid of user*/
        if (uid == currentObj.id){
          console.log("current user todo uid",currentObj.id);
          var currTodo=currentObj.item;
          if(currTodo!=null){
            console.log("key in chectodo function",keys[i]);
            deletekeys.push(keys[i]);
            add(currTodo,keys[i],true);
          }
        }
        else
        console.log("todo uid not found");
      }
    })
}


 /*  window.onload=function(){
      firebase.database().ref("/").child("Todo/AppData").on("child_added",data=>{
          var obj=data.val();
          obj.key=data.key;
          arr.push(obj);
          console.log(obj);
          var list=document.getElementById("list");
            for(var i=0;i<arr.length;i++){
                if(arr[i].id==uid)
                {
                  var li=document.createElement("LI");
                  var btn=document.createElement("BUTTON");
                  var btnText=document.createTextNode("Delete");
                  var text=document.createTextNode(arr[i].item);
                  btn.appendChild(btnText);
                  li.appendChild(text);
                  li.appendChild(btn);
                  list.appendChild(li);
                }
            }
      })
  } */
  function del(){
    alert("Are You sure?");
    document.getElementById("list").innerHTML="";
    for(var i=0;i<deletekeys.length;i++)
    firebase.database().ref("/").child("Todo/AppData/"+deletekeys[i]).remove();
    console.log("keys deleted ",deletekeys)
}