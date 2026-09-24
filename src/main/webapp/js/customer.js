
const token = sessionStorage.getItem("token");

if(!token){
	window.location.href="login.html";
}

fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/customers",{
	
	method:"GET",
	headers:{
		"Authorization":"Bearer "+token
	}
	
}).then(response=>{
	
	if(!response.ok){
		throw new Error("Failed to load customers");
	}
	
	return response.json();

}).then(data=>{
	console.log(data);
	
	const tableBody = document.getElementById("customerTable");
	
	data.forEach(customer =>{
		
		const row = document.createElement("tr");
		
		row.innerHTML=`
						<td><a href="customer-details.html?id=${customer.customerID }"> ${customer.customerID }</a></td>
						<td>${customer.firstName} </td>
						<td>${customer.lastName} </td>
						<td>${customer.nic} </td>
						<td>${customer.phone} </td>
						<td>${customer.email} </td>
						<td>${customer.address} </td>
		`;
		
		tableBody.appendChild(row);
	});	
}).catch(error =>{
	console.error("Error : "+error);
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
