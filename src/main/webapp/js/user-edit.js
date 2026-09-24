
const token = sessionStorage.getItem("token");

if(!token){
	window.location.href="login.html";
}

console.log("TOKEN : ",token);

const urlParam = new URLSearchParams(window.location.search);

const userId = urlParam.get("id");

console.log("USER ID ",userId);

const userID = document.getElementById("userId");
const userName = document.getElementById("userName");
const passWord = document.getElementById("passWord");
const role = document.getElementById("role");
const customerId = document.getElementById("customerId");

const userForm = document.getElementById("userEditForm");

fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/users/"+userId,{
	
	method:"GET",
	headers:{
		"Authorization":"Bearer "+token
	}
	
}).then(response =>{
	
	if(!response.ok){
		throw new Error("Failed to load user details. ",response.status);
	}
	
	return response.json();
	
}).then(user =>{
	
	userID.value = userId;
	userName.value = user.userName;
	//passWord.value = user.passWord;
	role.value = user.role;
	customerId.value = user.customerId;
	
}).catch(error =>{
	
	console.error("Error : ",error);
	
	document.getElementById("userMessage").innerHTML = `
	<div class="alert alert-danger> Failed tp load user details. </div>
	`;
});

//	UPDATE USER

const updateButton = document.getElementById("updateUserButton");

updateButton.addEventListener("click",function(){
	
	const userName = document.getElementById("userName");
	//const passWord = document.getElementById("passWord");
	const role = document.getElementById("role");
	const customerId = document.getElementById("customerId");

	
	const userData={
		
		userId:Number(userId),
		userName:userName.value,
		//passWord:passWord.value,
		role:role.value,
		customerId:customerId.value
		
	}
	
	
	const userForm = document.getElementById("userEditForm");
	
	
	fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/users/"+userId,{
		
		method:"PUT",
		headers:{
			"Content-Type":"application/json",
			"Authorization":"Bearer "+token
		},
		
		body:JSON.stringify(userData)
		
	}).then(response =>{
		console.log("RESPONSE " +response.userName);
		if(!response.ok){
			throw new Error("Failed to submit user update .",response.status);
		}
		
		return response.json();
	}).then(result =>{
		
		console.log("SUCCESSFULLY UPDATED ",result);
		
		window.location.href="users.html";
		
	}).catch(error =>{
		console.error("Error ",error);
		
		document.getElementById("userMessage").innerHTML = `<div class="alert alert-danger"> Failed to update. </div>`;
	});
	
});





//	GO BACK

document.getElementById("backButton").addEventListener("click", function(){
	
	window.location.href="users.html";
});


//	GO DASHBOARD

document.getElementById("dashboard").addEventListener("click", function(){
	
	window.location.href="dashboard.html";
	
});

//	 LOGOUT FUNCTION

document.getElementById("logout").addEventListener("click", function(){
	
	sessionStorage.removeItem("token");
	window.location.href="login.html";
	
});



