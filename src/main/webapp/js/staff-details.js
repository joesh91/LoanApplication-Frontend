
const token = sessionStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}

const urlParam = new URLSearchParams(window.location.search);

const staffId = urlParam.get("id");

fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/staffs/"+staffId,{
	
	method:"GET",
	headers:{
		"Authorization":"Bearer "+token
	}
	
}).then(response =>{
	if(!response.ok){
		throw new Error("Faield to load staff details. ",response.status);
	}
	return response.json();
	
}).then(staff=>{
	
	document.getElementById("staffId").textContent = staffId;
	document.getElementById("name").textContent = staff.name;
	document.getElementById("email").textContent = staff.email;
	document.getElementById("position").textContent = staff.position;
	
}).catch(error =>{
	console.error("Error : ",error);
	
	document.getElementById("staffMessage").innerHTML = `
		<div class="alert alert-danger"> 
			Failed to load staff details.
		 </div>
	`;
});


//	CANCEL BUTTON

document.getElementById("cancelButton").addEventListener("click",function(){
	
	window.location.href = "staff.html";
	
});


//	CAPTURE EDIT BUTTON EVENT

document.getElementById("editStaffButton").addEventListener("click",function(){
	
	window.location.href = "staff-edit.html?id="+staffId;
	
	
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


//	DELETE BUTTON

document.getElementById("deleteButton").addEventListener("click",async function(){	
	
	try{
		
		//	ASK FOR THE CONFIRMATION
		const confirmed = confirm("Are you sure you want to delete this staff member ?");
		
		if(!confirmed){
			return;
		}
		
		const response = await fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/staffs/"+staffId,{
			
			method:"DELETE",
			headers:{
				"Authorization":"Bearer "+token
			}
			
		});
		
		if(!response.ok){
			throw new Error("Failed to delete staff profile.");
		}
		
		window.location.href="staff.html";
	}catch(error){
		
		console.error("Failed to delete staff profile.",error);
		
	}

});