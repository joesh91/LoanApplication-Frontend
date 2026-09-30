
// ================= GET JWT TOKEN =================

const token = sessionStorage.getItem("token");

if(!token){
	window.location.href="login.html";
}



//	GET REVIEW ID

const urlParam = new URLSearchParams(window.location.search);

const reviewId = urlParam.get("id");
const applicationId = urlParam.get("appid");


const reviewIdInput = document.getElementById("reviewId");
const applicationIdInput = document.getElementById("applicationId");
const decisionInput	= document.getElementById("decision");
const commentsInput = document.getElementById("comments");
const staffIdInput = document.getElementById("staffId");

async function getReviewDetails(){
	
	try{
	const response = await fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/applicationreviews/"+reviewId,{
		
		method:"GET",
		headers:{
			"Authorization":"Bearer "+token
			
		}
	});
	
	if(!response.ok){
		throw new Error("Failed to load review details.");
	}
	
	const reviewDetails = await response.json();
	
	console.log("REVIEW DETAILS : "+reviewDetails);
	
	//		APPLYING RESPONSE VALUES TO INPUTS
	
	reviewIdInput.value = reviewId;
	applicationIdInput.value = applicationId;
	decisionInput.value = reviewDetails.decision;
	commentsInput.value = reviewDetails.comments;
	staffIdInput.value = reviewDetails.staff;
	
	}catch(error){
		console.error("Failed to load loan application review details. "+error);
	}
} 

//		CALLING THE METHOD 
getReviewDetails();


//			PRESS UPDATE BUTTON FUNCTION




async function updateReviewButtonPress(){
	
	const ureviewIdInput = document.getElementById("reviewId");
	const uapplicationIdInput = document.getElementById("applicationId");
	const udecisionInput	= document.getElementById("decision");
	const ucommentsInput = document.getElementById("comments");
	const ustaffIdInput = document.getElementById("staffId");
	
	const updateValues ={
		reviewId:ureviewIdInput.value,
		loanApplication:uapplicationIdInput.value,
		decision:udecisionInput.value,
		comments:ucommentsInput.value,
		staff:ustaffIdInput.value
	}
	
	try{
		
	const response = await fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/applicationreviews/"+reviewId,{
		
		method:"PUT",
		headers:{
			"Content-Type":"application/json",
			"Authorization":"Bearer "+token
		},
		
		body:JSON.stringify(updateValues)
	});
	
	
	if(!response.ok){
		throw new Error("Failed to update review details.");
	}
	
	const updatedReviewDetails = await response.json();
	window.location.href="view-reviews.html";
	
	}catch(error){
		
		console.error("Failed to update review details. "+error);
		
	}
	
}

//		CALLING UPDATE METHOD 

document.getElementById("updateButton").addEventListener("click",function(){
	
	updateReviewButtonPress();
	
});
