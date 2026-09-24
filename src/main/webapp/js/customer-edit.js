
const token = sessionStorage.getItem("token");

if(!token){
	window.location.href="login.html";
}

const urlParam = new URLSearchParams(window.location.search);

const customerID = urlParam.get("id");

console.log("CUSTOMER ID : ",customerID);

fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/customers/"+customerID,{
	
	method:"GET",
	headers :{
	Authorization:"Bearer "+token	
	}

}).then(response =>{
	console.log("CUSTOMER RESPONSE : ",response.status);
		if(!response.ok){
			throw new Error("Faield to load customer details.");
		}
		console.log("NO RESPONSE ERROR CAUGHT.");
		return response.json();
}).then(customer =>{
	
	console.log("CUSTOMER : ",customer);
	
	document.getElementById("customerID").value = customer.customerID;
	document.getElementById("firstName").value = customer.firstName;
	document.getElementById("lastName").value = customer.lastName;
	document.getElementById("nic").value = customer.nic;
	document.getElementById("phone").value = customer.phone;
	document.getElementById("email").value = customer.email;
	document.getElementById("address").value = customer.address;
}
	
).catch(error =>{
	console.error("Error : "+error);
});


//	EXECUTE UPDATE

const updateButton = document.getElementById("updateCustomerBtn");



updateButton.addEventListener("click",function(){
	
	const firstName 	= document.getElementById("firstName").value;
	const lastName 		= document.getElementById("lastName").value;
	const nic 			= document.getElementById("nic").value;
	const phone 		= document.getElementById("phone").value;
	const email 		= document.getElementById("email").value;
	const address 		= document.getElementById("address").value;
		
	console.log("first name : ",firstName);

	const customerData={
		
		customerID:Number(customerID),
		firstName:firstName,
		lastName:lastName,
		nic:nic,
		phone:phone,
		email:email,
		address:address
	};
console.log("CUSTOEMR DATA JSON : ",customerData);
	fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/customers/"+customerID,{
		
		method:"PUT",
		headers:{
			"Content-Type":"application/json",
			"Authorization":"Bearer "+token
		},
		body:JSON.stringify(customerData)
	
	}).then(response =>{
		
		if(!response.ok){
			throw new Error("Failed to update customer details ",response.status);
		}
		
		return response.json();
	
	}).then(result=>{
		
		console.log("RESULT : ",result);
		window.alert("done");
		window.location.href="customer-details.html?id="+customerID;
	
	}).catch(error =>{
		
		console.error("ERROR : "+error);
	
		});
	
	
});

// CANCEL BUTTON

document.getElementById("cancelBtn").addEventListener("click",function(){
	
	window.location.href="customer-details.html?id="+customerID;
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
