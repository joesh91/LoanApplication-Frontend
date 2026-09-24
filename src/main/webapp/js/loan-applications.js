	// =====================================================
	//              LOAN APPLICATIONS
	// =====================================================

	// Get JWT from sessionStorage
	const token = sessionStorage.getItem("token");
	
	if(!token){
		
		// No JWT means the user is not authenticated
		window.location.href = "login.html";
		
	}
	
	// =====================================================
	//          GET LOAN APPLICATIONS FROM BACKEND
	// =====================================================
	
	fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/loanApplications",{
		
		method:"GET",
		
		headers:{
			// SENDING JWT TO BACK END
			
			"Authorization":"Bearer "+token
		}
	}) 
	
			//	CONVERT BACKEND RESPONSE TO JSON
	.then(response => {
		
		if(!response){
			throw new Error("Faield to load loan applications.");
		}
		
		return response.json();
	})
		
			//	RECEIVE ACTUAL DATA
	.then(data =>{
		console.log(data);
		
		const tableBody = document.getElementById("loanApplicationTable");
		
		data.forEach(application =>{
			
			//	CINVERT DATE
			
			const dateParts = application.appDate;
			
			const formattedDate =  `${dateParts[0]}-${String(dateParts[1]).padStart(2, "0")}-${String(dateParts[2]).padStart(2, "0")}`;
			
			const row = document.createElement("tr");
			
			row.innerHTML=`
				<td> <a href="loan-application-details.html?id=${application.applicationId}"> ${application.applicationId}</a> </td>
				<td> ${application.loanType} </td>
				<td> ${application.requestedAmount} </td>
				<td> ${application.purpose} </td>
				<td> ${application.status} </td>
				<td> ${application.customerid} </td>
				<td> ${formattedDate} </td>	
					
			`;
			
			tableBody.appendChild(row);
		});
				
	})
	
	//		ERROR HANDLING
	.catch(error =>{
		console.error("Error : "+error);
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
