
const token = sessionStorage.getItem("token");

if(!token){
	window.location.href="login.html";
}

console.log("TOKEN : ",token);

const urlParam = new URLSearchParams(window.location.search);

const userId = urlParam.get("id");

console.log("USER ID : ",userId);

const userIdElement = document.getElementById("userId");
const userNameElement = document.getElementById("userName");
const roleElement = document.getElementById("role");
const customerIdElement = document.getElementById("customerId");

fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/users/"+userId,{
	
	method:"GET",
	headers:{
		"Authorization":"Bearer "+token
	}
}).then(response =>{
	if(!response.ok){
		throw new Error("Failed to load user details.",reponse.status);
	}
	
	return response.json();
}).then(user =>{

	userIdElement.textContent = userId;
	userNameElement.textContent = user.userName;
	roleElement.textContent = user.role;
	customerIdElement.textContent = user.customerId;
	
}).catch(error =>{
	
	console.error("Error : ",error);
	
	document.getElementById("userMessage").innerHTML=`<div class="alert alert-danger">Failed to load user details. </div>`;
	
});


//	EDIT USER BUTTON FUNCTION

document.getElementById("editUserButton").addEventListener("click",function(){
	
	window.location.href = "user-edit.html?id="+userId;
	
});


//	BACK BUTTON FUNCTION

document.getElementById("backButton").addEventListener("click",function(){
	
	window.location.href = "users.html";
	
});

//	LOGOUT BUTTON

document.getElementById("logout").addEventListener("click",function(){
	
	sessionStorage.removeItem("token");
	window.location.href="logout.html";
	
});

//	DASHBOARD BUTTON

document.getElementById("dashboard").addEventListener("click",function(){
	
	window.location.href="dashboard.html";
	
});

