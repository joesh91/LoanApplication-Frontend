
const token = sessionStorage.getItem("token");

if(!token){
	
	window.location.href="login.html";
}

// Get application ID from URL

const urlParams = new URLSearchParams(window.location.search);

const applicationId = urlParams.get("id");


// Get application from backend

fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/loanApplications/"+applicationId,{
	
	method:"GET",
	
	headers:{
		"Authorization" : "Bearer "+token
	}
	
}).then(response => response.json()

).then(application =>{
	
	document.getElementById("applicationId").textContent = application.applicationId;
	document.getElementById("loanType").textContent = application.loanType;
	document.getElementById("requestedAmount").textContent = application.requestedAmount;
	document.getElementById("purpose").textContent = application.purpose;
	document.getElementById("status").textContent = application.status;
	document.getElementById("customerid").textContent = application.customerid;
	
	const dateParts = application.appDate;
	
	const formattedDate = `${dateParts[0]}-${String(dateParts[1]).padStart(2, "0")}-${String(dateParts[2]).padStart(2, "0")}`;
	
	document.getElementById("appDate").textContent = formattedDate;
	
});

//  GET LOAN DOCUMENTS TO SURFACE

fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/loanDocuments/getByApplicationId/"+applicationId,{
	
	
	method:"GET",
	headers:{
		"Authorization":"Bearer "+token
	}
	
}

).then(response =>{

	if(!response.ok){
		throw new Error("Failed to get loan documents.");
			}

	return response.json();
	
}
).then(documents=>{
	
	const documentsContainer = document.getElementById("documentsContainer");
	
	// CLEAR LOADING DOCUMENTS
	
	documentsContainer.innerHTML = "";
	
	if(documents.length === 0){
		
		documentsContainer.innerHTML = "<p> No documents have been uploaded for this loan application. </p>";
		
		return;
		
	}
	
	// DISPLAY EACH DOCUMENT
	
	documents.forEach(document =>{
		
		const documentsRow =document.createElement("div")
		
		documentsRow.className="d-flex justify-content-between align-items-center border-bottom py-3";
		
		documentsRow.innerHTML = `
						
				<div> 
					
					<strong>${document.documentType} </strong>
					
					<br>

					<small>${document.fileName} </small>
									
				</div>
				
				<div> 
				
				<a href="http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/loanDocuments/download/${document.documentId}"
				                    class="btn btn-primary btn-sm">
									
				                    Download
				</a>
				
				</div>
		`;
		
		documentsContainer.appendChild(documentsRow);
		
		
		
	});
}
).catch(error=>{
	console.error("Error Loading Documents : "+error);
	document.getElementById("documentsContainer").innerHTML =
	        "<p class='text-danger'>Failed to load documents.</p>";
});


// REVIEW APPLICATION BUTTON

const reviewButton = document.getElementById("reviewApplication");

reviewButton.addEventListener("click",function(){
	
	window.location.href="loan-application-review.html?id="+applicationId;
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

