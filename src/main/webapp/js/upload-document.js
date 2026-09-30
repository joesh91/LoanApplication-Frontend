
const token = sessionStorage.getItem("token");

const applicationId = sessionStorage.getItem("applicationId");


if(!token || !applicationId){
		window.location.href="login.html";
	}


const documentUploadForm = document.getElementById("uploadDocumentForm");

documentUploadForm.addEventListener ( "submit", function(event){
	
	event.preventDefault();
	
	const documentType = document.getElementById("documentType").value;
	
	const documentFile = document.getElementById("documentFile").files[0];
	
	const formData = new FormData();
	
	formData.append("documentType",documentType);
	formData.append("file",documentFile);
	formData.append("applicationId",applicationId);
	
	
	fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/loanDocuments/upload",
		{
			method:"POST",
			
			headers:{
				"Authorization": "Bearer "+ token
			},
			
			body : formData				
	}).then(response =>{
		if(!response.ok){
			throw new Error("Failed to upload documents.");
		}
		
		return response.text();
	})
	.then(data=>{

		document.getElementById("message").textContent = "Document uploaded successfully.";
	})
	.catch(error =>{
		console.error(error);
		document.getElementById("message").textContent = "Failed to upload document.";
	})
	
	
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

