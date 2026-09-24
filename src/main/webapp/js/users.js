
const token = sessionStorage.getItem("token");

if(!token){
	window.location.href="login.html";
}

const userTable = document.getElementById("userTable");

console.log("TOKEN : ",token);
fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/users",{
	
	method:"GET",
	headers:{
		"Authorization":"Bearer "+token
	}
}).then(response =>{
	if(!response.ok){
		throw new Error("Failed to load user details. "+response.status);
	}
	console.log("RESPONSE : ",response.status);
	return response.json();
}).then(users =>{
	
	if(users.length === 0){
		userTable.innerHTML = `<tr><td colspan="4 class="text-center"> No Users Found. </td> </tr>`;
		return;
	}
	users.forEach(user =>{
		const row = document.createElement("tr");
		
		row.innerHTML = `
			<td><a href="user-details.html?id=${user.userId}"> ${user.userId} </a></td>
			<td> ${user.userName} </td>
			<td> ${user.role} </td>
			<td> ${user.customerId} </td>
		`;
		userTable.appendChild(row);
		console.log("USERS : "+user);
	})
	
}).catch(error =>{
	console.error("Error :", error);

	   userTable.innerHTML = `
	       <tr>
	           <td colspan="4" class="text-center text-danger">
	               Failed to load users.
	           </td>
	       </tr>
	   `;
});



//	 CREATE USER BUTTON CAPTURE

document.getElementById("userCreateButton").addEventListener("click",function(){
	console.log("button clicked");
	window.location.href="user-create.html";
	
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

