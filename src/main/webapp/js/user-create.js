
const token = sessionStorage.getItem("token");

if(!token){
	window.location.href="login.html";
}

console.log("TOKEN : ",token);


const createbutton = document.getElementById("createUserButton");

createbutton.addEventListener("click",function(event){
	
	event.preventDefault();
	
	const userId = document.getElementById("userId").value;
	const userName = document.getElementById("userName").value;
	const role =  document.getElementById("role").value;
	const customerId = document.getElementById("customerId").value;

	console.log(staffId,name,email,position);

	const userData = {
		
		userId:userId,
		userName:userName,
		role:role,
		customerId:customerId
		
	}

	fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/staffs",{
		
		method:"POST",
		headers:{},
		body:JSON.stringify(userData)
		
	}).then(response => {
		if(!response.ok){
			throw new Error("Error : ",response.status);
		}
		
		return response.json();
		
	}).then(user =>{
		
		console.log("STAFF DETAILS CREATED SUCCESSFULLY. ",user);
		
		window.location.href = "users.html";
		
	}).catch(error =>{
		
		console.error("Error ",error);
			
			document.getElementById("staffMessage").innerHTML = `<div class="alert alert-danger"> Failed to createstaff details. </div>`;
		
	});

	
});