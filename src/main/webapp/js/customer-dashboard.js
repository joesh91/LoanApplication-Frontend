
const token = sessionStorage.getItem("token");

if(!token){
	window.location.href="../pages/login.html";
}


console.log("TOKEN : "+token);
//===============
//	LOAD CURRENT CUSTOMER
//===============

async function loadCurrentCustomer(){
	
	try{
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
	

				
				//===============
				//	DISPLAY USER NAME
				//===============
				
				document.getElementById("customer").textContent = user.userName;
				
				document.getElementById("welcomeName").textContent = user.userName;

					// ==============================
				    // STORE CUSTOMER ID
				    // ==============================
				
				sessionStorage.setItem("customerId",user.customerId);
				
				console.log("CUSTOMER ID ",user.customerId);
					
					
					
}catch(error){
	
	console.error("ERROR loading  : ",error);
	
}

}

//===============
// LOAD DASHBOARD DATA
//===============
loadCurrentCustomer(); //	CALLING THE METHOD


//===============
//	GO TO MY PROFILE
//===============

const viewProfileButton = document.getElementById("viewProfileButton");

	if(viewProfileButton){
		
		viewProfileButton.addEventListener("click",function(){
			
			
			window.location.href="../customer/customer-profile.html";
			
		});
		
	}


//===============
//	GO TO APPLY FOR LOAN
//===============

const applyLoanButton = document.getElementById("applyLoanButton"); 

if(applyLoanButton){
	applyLoanButton.addEventListener("click",function(){
		
		window.location.href="../customer/loan-application.html";
		
	});
}


//===============
//	MY APPLICATIONS
//===============
const myLoanApplications = document.getElementById("viewApplications");

if(myLoanApplications){
	
	myLoanApplications.addEventListener("click",function(){
		
		window.location.href="../customer/my-loan-applications.html";
		
	});
	
}


//===============
//	APPLICATION STATUS
//===============

document.getElementById("checkStatus").addEventListener("click",function(){
	
	// TO DO
	
});

//===============
//	LOG OUT BUTTON
//===============

document.getElementById("logoutButton").addEventListener("click",function(){
	
	sessionStorage.removeItem("token");
	sessionStorage.removeItem("customerId");
	window.location.href= "../pages/login.html"	;
	
});



//============================
//	LOAD APPROVED APPLICATIONS 
//=============================




async function loadApprovedApplications(){
	
	const tableBody = document.getElementById("applicationTableBody");
	document.getElementById("tableView").classList.remove("d-none");
	try{
		
	const response = await fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/loanApplications/my",{
			
		method:"GET",
		headers:{
			"Authorization":"Bearer "+token
		}
		
		});
		
		console.log("loadApprovedApplications RESPONSE : "+response.status);
	
		//	CLIENT ERROR HANDLING
		
		if(response.status === 401){
			
			console.log("ERROR CODE 401");
			sessionStorage.removeItem("token");
			sessionStorage.removeItem("customerId");
			
			window.location.href="../pages/login.html";
		}
	
		if(response.status === 403){
			
					console.log("ERROR CODE 403");
						sessionStorage.removeItem("token");
						sessionStorage.removeItem("customerId");
						
						window.location.href="../pages/login.html";
			
		}
		
		if(response.status === 429){
				
						console.log("ERROR CODE 429");
							sessionStorage.removeItem("token");
							sessionStorage.removeItem("customerId");
							
							window.location.href="../pages/login.html";
				
			}
		
		const applications = await response.json();
		
			console.log("JSON APLLICATIONS : ",applications);
			
			//	GET ONLY APPROVED APPLICATIONS 
			
			const approvedApplications = applications.filter(
			            application => application.status === "APPROVED"
			        );
					
			console.log("Approved APLLICATIONS : ",approvedApplications);
			
			tableBody.innerHTML = "";
			
				// NO APPROVED APPLICATIONS
				
				
				if(approvedApplications.length === 0 ){
					const row = document.createElement("tr");

				           const cell = document.createElement("td");

				           cell.colSpan = 5;

				           cell.className = "text-center text-muted";

				           cell.textContent =
				               "No approved loan applications yet.";

				           row.appendChild(cell);

				           tableBody.appendChild(row);

				           return;
			}
			
			
			// DISPLAY APPROVED APPLICATIONS
	
			approvedApplications.forEach(function(application){
				
				const row = document.createElement("tr");
				
					//	APPLICATION ID
				
					const applicationIdCell = document.createElement("td");
					applicationIdCell.textContent=application.applicationId;
					
					//	LOAN TYPE
					
					const loanTypeCell = document.createElement("td");
					loanTypeCell.textContent = application.loanType;
					
					//	REQUESTED AMOUNT
					
					const requestedAmountCell = document.createElement("td");
						requestedAmountCell.textContent = application.requestedAmount;
					
						
					//	STATUS
					
					const statusCell = document.createElement("td");
						statusCell.textContent = application.status;	
						
						
					//	DATE 	
						
							//	DATE FORMAT CHANGE
						
							const dateParts = application.appDate;

						  	const formattedDate =
						  	`${dateParts[0]}-${String(dateParts[1]).padStart(2,"0")}-${String(dateParts[2]).padStart(2,"0")}`;
						  
					const dateCell = document.createElement("td");
						dateCell.textContent=formattedDate;
							
						// ADD CELLS TO ROW	
					row.appendChild(applicationIdCell);
					row.appendChild(loanTypeCell);
					row.appendChild(requestedAmountCell);
					row.appendChild(statusCell);
					row.appendChild(dateCell);
					
						// ADD CELLS TO TABLE
					tableBody.appendChild(row);
			});
			
	}catch(error){
		
		console.error("Failed to load approved applications",error);	
	}	
}

//	CALLING loadApprovedApplications METHOD 

loadApprovedApplications();