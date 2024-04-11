var users = [];
fetch("./users.json").then((res) => res.json()).then((data) => (users = data.users));


let username = document.getElementById("username");
let password = document.getElementById("password");

const submit = document
  .getElementById("loginsubmit")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    loginuser(username.value, password.value);
  });

const msg = document.querySelector(".status");

const loginuser = (name, pw) => {
  let foundindex = users.findIndex((user) => user.name == name);
  if (foundindex != -1) {
    if (users[foundindex].password === pw) {
        msg.style.display = "block";
        msg.textContent="Successfully Logged In✅"
        msg.style.color="green";
        setTimeout(()=> window.location.href = "page.html",1000);
     
    } else {
      msg.style.display = "block";
      msg.style.color="red";
    }
  } else{
    msg.style.display = "block";
     msg.style.color="red";
  } 
};
