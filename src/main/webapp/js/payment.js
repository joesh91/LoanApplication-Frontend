
const token = sessionStorage.getItem("token");

if(!token){
	window.location.href="login.html";
}

console.log("TOKEN DETAILS : "+token);

fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/payments",{

	method:"GET",
	headers:{
		"Authorization":"Bearer "+token
	}		
}).then(response=>{
		if(!response.ok){
			
			const tableBody = document.getElementById("paymentTable");	
			const row=document.createElement("tr");
			
			row.innerHTML =`
				<td colspan="5"><h4 class="alert alert-danger"> Failed to load payment details. <h4></td>
			`;
			tableBody.appendChild(row);
				
			throw new Error("Failed to load payment details."+response.status);
		}	
		
		
		return response.json();
		
		
}).then(data=>{
	console.log(data);
	
	const tableBody = document.getElementById("paymentTable");
	
		data.forEach(payment =>{
			const date = payment.paymentDate;

			const formattedDate =
			    `${date[0]}-${String(date[1]).padStart(2, "0")}-${String(date[2]).padStart(2, "0")}`;
			const row = document.createElement("tr");
			// <td><a href="payment-details.html?id=${payment.paymentId}"> ${payment.paymentId}</a></td>
			row.innerHTML = `
							<td><a href="payment-details.html?id=${payment.paymentId}"> ${payment.paymentId}</a></td>
							<td> ${payment.loanId}</td>
							<td> ${payment.amount}</td>
							<td> ${formattedDate}</td>
							<td> ${payment.paymentStatus}</td>
			`;
			tableBody.appendChild(row);
			
		}); //<td> ${payment.paymentDate}</td>
}).catch(error=>{
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
