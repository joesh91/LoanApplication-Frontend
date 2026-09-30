
const token = sessionStorage.getItem("token");

if(!token){
	window.location=href="../pages/login.html";
}

const urlParam = new URLSearchParams(window.location.search);

const selectedApplicationId = urlParam.get("id");

//	LOGOUT BUTTON

const logout = document.getElementById("logout");

if(logout){
	
	logout.addEventListener("click", function(){
		
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("customerId");
		
		window.location.href="../pages/login.html";
		
	});
	
}

	const loadingMessage = document.getElementById("loadingMessage");
	const errorMessage = document.getElementById("errorMessage");
	const loanDetails = document.getElementById("loanDetails");
	
	const applicationId = document.getElementById("applicationId");
	const loanType = document.getElementById("loanType");
	const rquestedAmount = document.getElementById("rquestedAmount");
	const applicationStatus = document.getElementById("applicationStatus");
	const applicationDate = document.getElementById("applicationDate");
	const purpose = document.getElementById("purpose");
	
	const backButton = document.getElementById("backButton");

//	LOAN SELECTED LOAN APPLICATIONS

async function loadLoanApplication(){
	
	try{
		
		if(!selectedApplicationId){
			throw new Error("APPLICATION IT IS NOT FOUND.");
		}
		
		const response = await fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/loanApplications/myClick/"+selectedApplicationId,{
			
			method:"GET",
			headers:{
				"Authorization":"Bearer "+token
			}
			
		});
		
		
		if(response.status === 401){
			
			sessionStorage.removeItem("token");
			sessionStorage.removeItem("customerId");
			
			window.location.href="../pages/login.html";
			return;
		}
		
		if(!response.ok){
			
			throw new Error("Failed to load application details.");
		}
		
		if(response.status === 404){
			
			throw new Error("APPLICATION IS NOT FOUND.");
		}
		
		//	GET JSON VALUE TO VARIABLE AND READ JSON
		
		const result = await response.json();
		
		//	HIDE LOADING 
		
		loadingMessage.classList.add("d-none");
		
		// DISPLAY APPLICATION DETAILS
		
		applicationId.textContent 	=	result.applicationId;
		loanType.textContent		=	result.loanType;
		rquestedAmount.textContent	=	result.requestedAmount;
		applicationStatus.textContent	=	result.status;
		
			// DATE FORMATE CHANGE
			const dateParts = result.appDate;				
			const formattedDate =  `${dateParts[0]}-${String(dateParts[1]).padStart(2, "0")}-${String(dateParts[2]).padStart(2, "0")}`;
		
		applicationDate.textContent = formattedDate;
		purpose.textContent	= result.purpose;
		
		
		loanDetails.classList.remove("d-none");
	
		
	}catch(error){
		
		console.error("Failed to load application details.",error);
		
		loadingMessage.classList.add("d-none");
		
		errorMessage.textContent = error.messsage || "Failed to load loan application details.";
		
		errorMessage.classList.remove("d-none");
		
	}
	
}


//	CALLING THE FUNCTION

loadLoanApplication();

//	BACK BUTTON

if(backButton){
	
	backButton.addEventListener("click",function(){
		
		window.location.href="../customer/my-loan-applications.html?id="+applicationId;
		
	});
}




