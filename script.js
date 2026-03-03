//Register
function registerUser(){

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if(name === "" || email === "" || password === ""){
        alert("Please fill all fields");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if(users.find(u => u.email === email)){
        alert("User already exists!");
        return;
    }

    let zone = "Zone " + (Math.floor(Math.random()*4)+1);

    users.push({
        name: name,
        email: email,
        password: password,
        zone: zone,
        status: "Not Arrived",
        entry: null,
        exit: null
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");

    window.location.href = "login.html";
}

// USER LOGIN
function loginUser(){
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;

    let users=JSON.parse(localStorage.getItem("users"))||[];

    let user=users.find(u=>u.email===email && u.password===password);

    if(user){
        localStorage.setItem("currentUser",email);
        window.location.href="user-dashboard.html";
    }else{
        alert("Invalid Login");
    }
}

// LOAD USER DASHBOARD
function loadUserDashboard(){
    let email=localStorage.getItem("currentUser");
    let users=JSON.parse(localStorage.getItem("users"))||[];

    let user=users.find(u=>u.email===email);

    if(!user){ window.location.href="login.html"; return;}

    document.getElementById("uName").innerText=user.name;
    document.getElementById("uZone").innerText=user.zone;
    document.getElementById("uStatus").innerText=user.status;
}

// ADMIN LOGIN
function loginAdmin(){
    let user=document.getElementById("adminUser").value;
    let pass=document.getElementById("adminPass").value;

    if(user==="admin" && pass==="admin123"){
        window.location.href="admin-dashboard.html";
    }else{
        alert("Wrong Admin Credentials");
    }
}

// LOAD ADMIN DASHBOARD
function loadAdminDashboard(){
    let users=JSON.parse(localStorage.getItem("users"))||[];

    document.getElementById("total").innerText=users.length;
    document.getElementById("inside").innerText=
        users.filter(u=>u.status==="Inside").length;

    let html="";
    users.forEach(u=>{
        html+=`
        <div class="card">
            <b>${u.name}</b><br>
            Email: ${u.email}<br>
            Zone: ${u.zone}<br>
            Status: ${u.status}<br>
            Entry: ${u.entry||"-"}<br>
            Exit: ${u.exit||"-"}
        </div>`;
    });

    document.getElementById("userList").innerHTML=html;
}

// SCANNER
function scanEntry(){
    let email=document.getElementById("scanEmail").value;
    let users=JSON.parse(localStorage.getItem("users"))||[];

    let user=users.find(u=>u.email===email);
    if(!user){ alert("User not found"); return;}

    user.status="Inside";
    user.entry=new Date().toLocaleString();

    localStorage.setItem("users",JSON.stringify(users));
    alert("Entry Recorded");
}

function scanExit(){
    let email=document.getElementById("scanEmail").value;
    let users=JSON.parse(localStorage.getItem("users"))||[];

    let user=users.find(u=>u.email===email);
    if(!user){ alert("User not found"); return;}

    user.status="Exited";
    user.exit=new Date().toLocaleString();

    localStorage.setItem("users",JSON.stringify(users));
    alert("Exit Recorded");
}

// LOGOUT
function logout(){
    localStorage.removeItem("currentUser");
    window.location.href="index.html";
}