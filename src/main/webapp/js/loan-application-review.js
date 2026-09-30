const token = sessionStorage.getItem("token");
console.log("loan-application-review js file loaded.");
if(!token){
	window.location.href="login.html";
}

const urlParams = new URLSearchParams(window.location.search);

const applicationId = urlParams.get("id");

console.log("APPLICATION ID in review js : "+applicationId);

//	GET LOAN APPLICATION



fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/loanApplications/"+applicationId,{
	
	method:"GET",
	headers:{
		"Authorization":"Bearer "+token
	}
	
}

).then(response=>{
	console.log("STATUS : "+response.status);
	console.log("RESPONSE URL : "+response.url);
	
	if(!response.ok){
		console.log("response is not ok "+response.status);
		throw new Error("Failed to load application details this is review js.");
	}
	return response.json();
}
).then(application=>{
	console.log("APPLICATION : "+application.applicationId);
	console.log("Payment review loaded.");
	
	const dateParts = application.appDate;

	const formattedDate =
	    dateParts[0] + "-" +
	    String(dateParts[1]).padStart(2, "0") + "-" +
	    String(dateParts[2]).padStart(2, "0");

	
	document.getElementById("applicationId").textContent 	= application.applicationId;
	document.getElementById("customerId").textContent 		= application.customerid;
	document.getElementById("loanType").textContent			= application.loanType;
	document.getElementById("requestedAmount").textContent	= application.requestedAmount;
	document.getElementById("purpose").textContent			= application.purpose;
	document.getElementById("applicationDate").textContent  = formattedDate;
	document.getElementById("status").textContent  			= application.status;
	
}).catch(error=>{
	console.error("Error : "+error);
});


//	VALIDATE REVIEW DATA AND PROCESS

const staffIdInput = document.getElementById("staffId");
const decisionInput = document.getElementById("decision");
const commentsInput = document.getElementById("comments");

const submitReviewButton = document.getElementById("submitReviewBtn");
const rejectReviewButton = document.getElementById("rejectReviewBtn");
const reviewMessage = document.getElementById("reviewMessage");

//	CAPUTRUE SUBMIT BUTTON

submitReviewButton.addEventListener("click",function(){
	
	const staffId	=	staffIdInput.value;
	const decision	=	decisionInput.value;
	const comments	=	commentsInput.value;
	
	console.log("STAFF ID : "+staffId);
	console.log("DECISION : "+decision);
	console.log("COMMENTS : "+comments);
	
	const reviewData={
		loanApplication:Number(applicationId),
		staff:Number(staffId),
		decision:decision,
		comments:comments
	}
	
	console.log("REVIEW DATA JSON : "+reviewData);
	

//	SEND JSON REVIEW OBJECT TO SERVER DO THE FETCH

fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/applicationreviews",{
	
	method:"POST",
	headers:{
		
		"Content-Type":"application/json",
		"Authorization":"Bearer "+token
	},
	
	body:JSON.stringify(reviewData)
	
}).then(response =>{
	
	console.log("REVIEW RESPONSE STATUS : "+response.status);
	
	if(!response.ok){
		throw new Error("Failed to submit review details. "+response.status);
	}	
	
	return response.json();
}
).then(result=>{
	
	console.log("REVIEW DATA : ",result);
	
	reviewMessage.innerHTML="<div class='alert alert-success'> Application review submitted successfully. </div>";
	
}
	
).catch(error =>{
	
	console.error("ERROR SUBMITTING REVIEW : "+error)
	
	reviewMessage.innerHTML = "<div class='alert alert-warning'>Failed to submit application review. </div> ";
	
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


//	GO BACK

document.getElementById("cancelBtn").addEventListener("click",function(){
	
	window.location.href="loan-application-details.html?id="+applicationId;
	
});








