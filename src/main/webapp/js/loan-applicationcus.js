const token = sessionStorage.getItem("token");

// AUTHENTICATION

if (!token) {

    window.location.href = "../pages/login.html";

}
console.log("APPLY LOAN JS TOKEN : "+token);

// ELEMENTS 
const submitButton = document.getElementById("submitButton");
const backButton = document.getElementById("backButton");

const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");

const loanApplicationForm = document.getElementById("loanApplicationForm");


//	LOGOUT ==============

const logout = document.getElementById("logout");
	
if(logout){
	logout.addEventListener("click", function(){
		
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("customerId");
		
		window.location.href="../pages/login.html";
		
	});
}

//	BACK BUTTON ==============

	
if(backButton){
	backButton.addEventListener("click", function(){
	
		console.log("BUTTON PRESSED");
		window.location.href="../customer/customer-dashboard.html";
		
	});
}

//==== SUBMIT LOAN APPLICATION

if(loanApplicationForm){
	
	loanApplicationForm.addEventListener("submit" ,
		
			async function(event){
		
			//// Prevent normal HTML form submission
				
			event.preventDefault();
			
			// Hide previous messages
			
			successMessage.classList.add("d-none");
			errorMessage.classList.add("d-none");
			
			//diSABLE BUTTON while submitting
			
			submitButton.disabled = true;
			submitButton.textContent = "Submitting...";
			
			
			//	GET FORM VALUES
			
			const loanType = document.getElementById("loanType").value;
			const requestedAmount = document.getElementById("requestedAmount").value;
			const purpose = document.getElementById("purpose").value;

			//	creation json object
			
			const loanApplication ={
				
				loanType:loanType,
				requestedAmount:Number(requestedAmount),
				purpose:purpose
			}
			
			console.log("LOAN APPLICATION JSON : ",loanApplication);
			
			
			// SENDING VALUES TO BACKEND
			
			try{
				
				const response = await fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/loanApplications",{
					
					method:"POST",
					headers:{
						"Content-Type":"application/json",
						"Authorization":"Bearer "+token
					},					
					body:JSON.stringify(loanApplication)
				});
				
				console.log("Response Status : ",response.status);
				
				//	TOKEN EXPIRED / NOT AUTHORIZED 
				
				if(response.status === 401){
					sessionStorage.removeItem("token");
					sessionStorage.removeItem("customerId");
					
					window.location.href="../pages/login.html";
					
				}
				
				// OTHER ERRORS
				
				if(!response.ok){
					throw new Error("Failed to submit loan applications.");
				}
				
				
				//	READ RESPONSE
				
				const result = await response.json();
				
				console.log("READ RESPONSE :"+result);
				
				// SUCCESS
				
				successMessage.textContent = "Loan application submitted successfully";
				
				successMessage.classList.remove("d-none");
				
				// If backend returned application ID,
				// show it to the customer.
				
				if(result.applicationId){
					successMessage.textContent = "Loan application submitted successfully. Application ID : "+result.applicationId;
				}
							   
				//	  CLEAR FROM
				
				loanApplicationForm.reset();
				
				
			}catch(error){
			
					console.error("Error submitting loan application.");
					
					errorMessage.textContent = " Unable to submit your loan application. please try again.";
					
					errorMessage.classList.remove("d-none");
			}finally{
				
				// ENABLE BUTTON
				
				submitButton.disabled = false;
				
				submitButton.textContent = "Submit Application";
				
			}
		
		
	});
	
}
//	 SHOW USER NAME ON THE TOP

async function showUserName(){
	
			const response = await fetch( "http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/users/me",{
				
				method:"GET",
				headers:{
					"Authorization":"Bearer "+token
				}
				
			});
			console.log("RESPONSE : "+response.status);
			//===============
			//	CHECK RESPONSE
			//===============
			
			if(!response.ok){
				if(response.status === 401){
					sessionStorage.removeItem("token");
					window.location.href="../pages/login.html";
					return;
				}
				throw new Error("failed to load current user");
			}
					//===============
					//	GET USER DATA
					//===============
			
					
			const user = await response.json();
			
			console.log("CURRENTE USER : ",user);	
			
			//document.getElementById("customer").classList.add("d-none");
			document.getElementById("customer").textContent =  user.userName ;	
		
}

showUserName();

