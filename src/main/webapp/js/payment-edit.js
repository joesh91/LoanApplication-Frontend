const token = sessionStorage.getItem("token");

if(!token){
	window.location.href = "login.html";
}

const urlParam = new URLSearchParams(window.location.search);

const paymentId = urlParam.get("id");


fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/payments/"+paymentId,{
	
	method:"GET",
	headers:{
		"Authorization":"Bearer "+token
	}	
	
}).then(response => {
	if(!response.ok){
		throw new Error("Failed to load payment details to edit .");
	}
	return response.json();
}).then(payment => {
	
	const date = payment.paymentDate;

					const formattedDate =
					    `${date[0]}-${String(date[1]).padStart(2, "0")}-${String(date[2]).padStart(2, "0")}`;
	
	document.getElementById("paymentId").value = payment.paymentId;
	
	document.getElementById("loanId").value = payment.loanId;
	
	document.getElementById("amount").value = payment.amount;
	
	document.getElementById("paymentDate").value = formattedDate;
	
	document.getElementById("status").value = payment.paymentStatus;
}
).catch(error=>{
	console.error("Error : "+error);
});

//	UPDATE PAYMENT

const paymentForm = document.getElementById("paymentForm");

paymentForm.addEventListener("submit",function(event){
	
	event.preventDefault();
	
	const amount = document.getElementById("amount").value;
	const loanId = document.getElementById("loanId").value;
	const paymentStatus = document.getElementById("status").value;
	
	console.log("Amount : "+amount);
	console.log("Loan ID : "+loanId);
	console.log("Payment Status : "+paymentStatus);
	
	const paymentData = {
		loanId : Number(loanId),
		amount : Number(amount),
		paymentStatus : paymentStatus
	};
	
	
	
	fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/payments/"+paymentId,{
		
		method:"PUT",
		headers :{
			"Content-Type":"application/json",
			"Authorization":"Bearer "+token
		},
			 body:JSON.stringify(paymentData)
		
	}).then(response=>{

			if(!response.ok){
				throw new Error("Failed to update payment");
			}		
			return response.json();
	}).then(updatedPayment =>{

		alert("Payment updated successfully.")
		
		window.location.href="payment.html";
	
	}).catch(error =>{
		console.error("Error updating payment : "+ error);
		alert("Faield to update payment.");		
	});
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
