
const token = sessionStorage.getItem("token");

if(!token){
	window.location.href="login.html";
}

const urlParams = new URLSearchParams(window.location.search);

const customerID = urlParams.get("id");


fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/customers/"+customerID,{
	method:"GET",
	headers:{
		"Authorization":"Bearer "+token
	}
}).then(response=>{
	if(!response.ok){
		throw new Error("Failed to load customer details.");
	}
	return response.json();
	
}).then(customer=>{
	
		document.getElementById("customerID").textContent =customerID;
		document.getElementById("firstName").textContent = customer.firstName;
		document.getElementById("lastName").textContent = customer.lastName;
		document.getElementById("nic").textContent = customer.nic;
		document.getElementById("phone").textContent = customer.phone;
		document.getElementById("email").textContent = customer.email;
		document.getElementById("address").textContent = customer.address;
		
}
	
).catch(error=>{
	console.error("Error : "+error);
});


//	CAPTURE EDIT CUSTOMER DETAILS BUTTON

const editCustomerButton = document.getElementById("editCustomerBtn");

editCustomerButton.addEventListener("click",function(){
	
	window.location.href="../pages/customer-edit.html?id="+customerID;
	
	
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

// 	BACK BUTTON

document.getElementById("backBtn").addEventListener("click", function(){
	
	window.location.href="../pages/customer.html";
	
});


