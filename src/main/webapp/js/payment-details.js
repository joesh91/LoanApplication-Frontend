
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
}).then(response =>{
		if(!response.ok){
			throw new Error("Failed to loan payment details.");
		}	
		return response.json();
		
}).then(payment=>{
	console.log(payment);
	
	const date = payment.paymentDate;

				const formattedDate =
				    `${date[0]}-${String(date[1]).padStart(2, "0")}-${String(date[2]).padStart(2, "0")}`;
	
		document.getElementById("paymentId").textContent = paymentId;
		document.getElementById("loanId").textContent = payment.loanId;
		document.getElementById("amount").textContent = payment.amount;
		document.getElementById("paymentDate").textContent = formattedDate;
		document.getElementById("status").textContent = payment.paymentStatus;
		
		
	
}).catch(error=>{
	console.error("Error : "+error);
});


// 	EDIT PAYMENT

const editPaymentBtn = document.getElementById("editPayment");

console.log("EDIT BUTTON "+ editPaymentBtn);

editPaymentBtn.addEventListener("click",function(){
	
	console.log("button pressed");
	
	window.location.href = "payment-edit.html?id="+paymentId;
	
	console.log("button pressed done");
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
