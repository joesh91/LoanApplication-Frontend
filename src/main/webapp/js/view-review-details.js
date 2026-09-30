
// ================= GET JWT TOKEN =================

const token = sessionStorage.getItem("token");

if(!token){
	window.location.href="login.html";
}

//	GET REVIEW ID DETAILS

const urlParam = new URLSearchParams(window.location.search);

const reviewId =  urlParam.get("id");
const applicationId = urlParam.get("applicationId");


async function getApplicationDetails(){
	
	try{
	const response = await fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/loanApplications/"+applicationId,{
		
		method:"GET",
		headers:{
			"Authorization":"Bearer "+token
		}
	});
	
	if(!response.ok){
		throw new Error("Failed to load application details.");
	}
	
	const applicationDetails = await response.json();
	
	const dateParts = applicationDetails.appDate;

				const formattedDate =
				    dateParts[0] + "-" +
				    String(dateParts[1]).padStart(2, "0") + "-" +
				    String(dateParts[2]).padStart(2, "0");
					
					
	document.getElementById("applicationId").textContent = applicationDetails.applicationId;
	document.getElementById("loanType").textContent = applicationDetails.loanType;
	document.getElementById("requestedAmount").textContent = applicationDetails.requestedAmount;
	document.getElementById("customerid").textContent = applicationDetails.customerid;
	document.getElementById("status").textContent = applicationDetails.status;
	document.getElementById("appDate").textContent = formattedDate; 
	document.getElementById("purpose").textContent = applicationDetails.purpose;
	
	}catch(error){
		console.error("Failed to load application details. "+error);
	}
	
}

async function getApplicationReviewDetails(){
	
	try{
		
	const response = await fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/applicationreviews/"+reviewId,{
		
		method:"GET",
		headers:{
			"Authorization":"Bearer "+token
		}
	});
	
	if(!response.ok){
		throw new Error("Failed to load application review details.");
	}
	
	const reviewDetails = await response.json();
	
	const dateParts = reviewDetails.reviewDate;
	const formattedDate = dateParts[0] + "-" + String(dateParts[1]).padStart(2, "0") + "-" +String(dateParts[2]).padStart(2, "0");
		
	document.getElementById("reviewId").textContent = reviewDetails.reviewId;
	document.getElementById("loanApplicationId").textContent = reviewDetails.loanApplication;
	document.getElementById("staffId").textContent = reviewDetails.staff;
	document.getElementById("decision").textContent = reviewDetails.decision;
	document.getElementById("comments").textContent = reviewDetails.comments;
	document.getElementById("reviewDate").textContent = formattedDate;
	
	}catch(error){
		console.error("Failed to load application details. "+error);
	}
}





//	FUNCTION CALLING

getApplicationDetails();
getApplicationReviewDetails();


//	GO DASHBOARD

document.getElementById("dashboard").addEventListener("click", function(){
	
	window.location.href="dashboard.html";
	
});

//	 LOGOUT FUNCTION

document.getElementById("logout").addEventListener("click", function(){
	
	sessionStorage.removeItem("token");
	window.location.href="login.html";
	
});


//	 UPDATE BUTTON FUNCTION

document.getElementById("updateApplication").addEventListener("click", function(){
	
	window.location.href="review-update.html?id="+reviewId+"&appid="+applicationId;
	
});

