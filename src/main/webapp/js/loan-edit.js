
const token = sessionStorage.getItem("token");

console.log("TOKEN : "+token);

const urlParam = new URLSearchParams(window.location.search);

const loanId = urlParam.get("id");

console.log("LOAN ID : ",loanId);

fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/loans/"+loanId,{
	
	method:"GET",
	headers:{
		"Authorization":"Bearer "+token
	}
}).then(response =>{
	console.log("RESPONSE : ",response);
		if(!response.ok){
			throw new Error("Failed to load loan details. "+response.status);
		}
		return response.json();
}).then(loan =>{
	
	const startDateFormatted = loan.startDate;
	const endDateFormatted = loan.endDate;
							
	const startDate =  `${startDateFormatted[0]}-${String(startDateFormatted[1]).padStart(2, "0")}-${String(startDateFormatted[2]).padStart(2, "0")}`;
	const endDate =  `${endDateFormatted[0]}-${String(endDateFormatted[1]).padStart(2, "0")}-${String(endDateFormatted[2]).padStart(2, "0")}`;
	
	console.log("LOAN : ",loan);
	
	document.getElementById("loanId").value = loanId;
	document.getElementById("applicationId").value = loan.applicationId;
	document.getElementById("approvedAmount").value = loan.appAmount;
	document.getElementById("interestRate").value =loan.intRate;
	document.getElementById("duration").value = loan.duration;
	document.getElementById("startDate").value = startDate;
	document.getElementById("endDate").value = endDate;
	document.getElementById("status").value = loan.status;
	
}).catch(error =>{
	
	console.error("Error : ",error);
	
});


//	UPDATE BUTTON CALLING CAPTURE

const updateLoanButton = document.getElementById("updateLoanBtn");

updateLoanButton.addEventListener("click",function(event){
	
	event.preventDefault();
	
	const loanId = document.getElementById("loanId").value;
	const applicationId = document.getElementById("applicationId").value;
	const approvedAmount = document.getElementById("approvedAmount").value;
	const interestRate	= document.getElementById("interestRate").value;
	const duration = document.getElementById("duration").value;
	const startDate = document.getElementById("startDate").value;
	const endDate = document.getElementById("endDate").value;
	const status = document.getElementById("status").value

	

	
	const loanData={
		loanId:Number(loanId),
		applicationId:Number(applicationId),
		appAmount:approvedAmount,
		intRate:Number(interestRate),
		duration:Number(duration),
		endDate:endDate,
		status:status
	}
	console.log("JSON VALUE : ",loanData);
	
	fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/loans/"+loanId,{
		
		method:"PUT",
		headers:{
			"Content-Type":"application/json",
			"Authorization":"Bearer "+token
		},
		body:JSON.stringify(loanData)		
	}).then(response=>{
		if(!response.ok){
			throw new Error("Failed to submit loan approve. : "+response.status);
		}
		return response.json();
	}).then(result =>{
		console.log("LOAN SUCCESSFULLY APPROVED : ",result);
		window.location.href="loan.html";
	}).catch(error =>{
		console.error("Error : ",error);
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
