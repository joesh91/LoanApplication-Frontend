
const token = sessionStorage.getItem("token");

if(!token){
	window.location.herf="login.html";
}

console.log("TOKEN : ",token);

const urlParam = new URLSearchParams(window.location.search);

const loanId = urlParam.get("id");

console.log("LOAND ID : ",loanId);

fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/loans/"+loanId,{
	
	method:"GET",
	headers:{
		"Authorization":"Bearer "+token
	}
}).then(response=>{
	if(!response.ok){
		throw new Error("Faield to load loan details. "+response.status);
	}
	
	console.log("RESPONSE : ",response);
	return response.json();
}).then(result =>{
	
			const startDateFormatted = result.startDate;
			const endDateFormatted = result.endDate;
						
			const startDate =  `${startDateFormatted[0]}-${String(startDateFormatted[1]).padStart(2, "0")}-${String(startDateFormatted[2]).padStart(2, "0")}`;
			const endDate =  `${endDateFormatted[0]}-${String(endDateFormatted[1]).padStart(2, "0")}-${String(endDateFormatted[2]).padStart(2, "0")}`;
	
	console.log("LOAN DETAILS : ",result);
	
	document.getElementById("loanId").textContent = loanId;
	document.getElementById("applicationId").textContent = result.applicationId;
	document.getElementById("appAmount").textContent = result.appAmount;
	document.getElementById("intRate").textContent = result.intRate;
	document.getElementById("duration").textContent = result.duration;
	document.getElementById("startDate").textContent = startDate;
	document.getElementById("endDate").textContent = endDate;
	document.getElementById("status").textContent = result.status;
	
}).catch();

//	CAPTURE EDIT BUTTON

const editLoanButton = document.getElementById("editLoanButton");

	
editLoanButton.addEventListener("click",function(){
	
	console.log("LOAN ID : ",loanId);
	window.location.href = "loan-edit.html?id="+loanId;
	
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
