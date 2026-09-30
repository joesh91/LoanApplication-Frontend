
const token = sessionStorage.getItem("token");


if(!token){
	window.location.href="login.html";
}
const createLoanButton = document.getElementById("createLoanButton");


createLoanButton.addEventListener("click",function(event){
	
	
	event.preventDefault();
	
	const applicationId = document.getElementById("applicationId").value;
	const approvedAmount = document.getElementById("appAmount").value;
	const interestRate = document.getElementById("intRate").value;
	const duration = document.getElementById("duration").value;
	const endDate = document.getElementById("endDate").value;
	
	
	const loanData = {
		
		applicationId:Number(applicationId),
		appAmount:Number(approvedAmount),
		intRate:Number(interestRate),
		duration:Number(duration),
		endDate:endDate,

	}
	
	fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/loans/",{
		
		method:"POST",
		headers:{
			"Content-Type":"application/json",
			"Authorization":"Bearer "+token
		},
		
		body:JSON.stringify(loanData)
		
	}).then(response =>{
		if(!response.ok){
			throw new Error("Failed to submit loan creaion. ",response.status);
		}
		return response.json();
		
	}).then(createdLoan=>{
		
		window.location.href = "loan.html";
		
	}).catch(error =>{
		
		console.error("Error : ",error);
		
		document.getElementById("loanMessage").innerHTML = `
						<div class="alert alert-danger"> 
							Failed to create loan 
						</div>
		`;
	});
});


//	CANCEL BUTTON CAPTURE

document.getElementById("cancelButton").addEventListener("click",function(){
	
	window.location.href="loan.html";
	
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

