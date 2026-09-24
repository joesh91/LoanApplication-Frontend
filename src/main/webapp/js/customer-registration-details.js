
const token = sessionStorage.getItem("token");

if(!token){
	window.location.href="login.html"
}

// Get registration ID from URL

const urlParams = new URLSearchParams(window.location.search);

const registrationId = urlParams.get("id");


//	GET REGISTRATION DETAILS FROM BACKEND

fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/registration/"+registrationId,
	{
		method:"GET",
		headers:{
			"Authorization":"Bearer "+token
		}
	}
).then(response =>{
	if(!response.ok){
		throw new Error("Failed to loan customer registration details.");
	}
	
	return response.json();
})
.then(registration =>{
	
	console.log(registration);
	
	document.getElementById("registrationId").textContent = registrationId;
	document.getElementById("firstName").textContent = registration.firstName;
	document.getElementById("lastName").textContent = registration.lastName;
	document.getElementById("nic").textContent = registration.nic;
	document.getElementById("phone").textContent = registration.phone;
	document.getElementById("email").textContent = registration.email;
	document.getElementById("address").textContent = registration.address;
	document.getElementById("status").textContent = registration.status;

})
.catch(error=>{
	console.error("Error : "+error);
});


/* APPROVE BUTTON FUNCTION*/


const approveBtn = document.getElementById("approveBtn");

console.log("APPROVE BUTTON CLICKED" +approveBtn.value);

approveBtn.addEventListener("click",function(){
	
	console.log("APPROVE BUTTON CLICKED");
	
	fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/registration/approve/"+registrationId,{
		
		method:"PUT",
		headers:{
			"Authorization":"Bearer "+token,
			"Content-Type":"application/json"
		},
		body:JSON.stringify({"status":"APPROVED"})
		
		}).then(response =>{
	if(!response.ok){
		throw new Error("Failed to approve customer registration.");
	}
	
	return response.json();
}).then(data=>{
	
	console.log(data);
	
	alert("Customer registration approved successfully.");
	
	window.location.href="customer-registration.html";
	
}).catch(error=>{
	console.error("Error : "+error);
	});
	});

	
	/* REJECT BUTTON FUNCTION*/
	
	const rejectBtn = document.getElementById("rejectBtn");
	
	rejectBtn.addEventListener("click", function(){
		
		console.log("REGISTRATION ID : "+registrationId);
	fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/registration/reject/"+registrationId,{
		
		method:"PUT",
		headers:{
			"Authorization":"Bearer "+token,
			"Content-Type":"application/json"
		},
		
		body:JSON.stringify({"status":"REJECTED"})
		
	}).then(response=>{
		if(!response.ok){
			
			throw new Error("Failed to reject customer registration.");
		}
		
		return response.json();
	}).then(data=>{
		console.log("REJECT RESPONSE : "+data);
		
		alert("Customer registration rejected successfully.");
		
		window.location.href="customer-registration.html";
	}).catch(error=>{
		
		console.error("REJECT REASON : "+error);
			
	});
	
	});
	
	
	//	GO DASHBOARD

	document.getElementById("dashboard").addEventListener("click", function(){
		
		window.location.href="../pages/dashboard.html";
		
	});

	//	 LOGOUT FUNCTION

	document.getElementById("logout").addEventListener("click", function(){
		
		sessionStorage.removeItem("token");
		window.location.href="login.html";
		
	});
	
	
	//	 GO BACK FUNCTION

		document.getElementById("backBtn").addEventListener("click", function(){
			
			console.log("pressed");
			window.location.href="../pages/customer-registration.html";
			
		});

