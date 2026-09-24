
const token = sessionStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

console.log(token);
const createButton = document.getElementById("createStaffBtn");

createButton.addEventListener("click",function(event){
	
	event.preventDefault();
	
	const staffId = document.getElementById("staffId").value;
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const position = document.getElementById("position").value;

	
	console.log("STAFF ID : ",staffId)
	
	const staffData={
		
		staffId:Number(staffId),
		name:name,
		email:email,
		position:position,
	
	};
	
	console.log("NEW STAFF DATA : ",staffData);
	
	fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/staffs",{
		
		method:"POST",
		headers:{
			"Content-Type":"application/json",
			"Authorization":"Bearer "+token
		},
		
		body:JSON.stringify(staffData)
		
	}).then(response =>{
			if(!response.ok){
				throw new Error("Failed to submit new Staff creation.",response.status);
			}
			
			return response.json();
	}).then(createdStaff =>{
		
		console.log("CREATED SATFF DETAILS : ",createdStaff);
		
		window.location.href = "staff.html?id=" + createdStaff.staffId;
		
	}).catch(error =>{
		console.error("Error : ",error);
		
		document.getElementById("staffMessage").innerHTML = `
				<div class="alert alert-danger> Failed to create staff </div>
		`;
	});
	
});

//	CANCEL BUTTON CAPTURE

document.getElementById("cancelBtn").addEventListener("click", function() {

    window.location.href = "staff.html";

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




