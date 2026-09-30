
const token = sessionStorage.getItem("token");

if(!token){
	window.location.href="login.html";
}

const loanApplicationForm = document.getElementById("loanApplicationForm");

loanApplicationForm.addEventListener("submit",function(event){
	
	event.preventDefault();
	
	const loanType = document.getElementById("loanType").value;
	
	const requestedAmount = document.getElementById("requestedAmount").value;
	
	const purpose = document.getElementById("purpose").value;
	
	const loanData  ={

		loanType		:loanType,
		requestedAmount	:Number(requestedAmount),
		purpose			:purpose
	};
	
	
	//	FETCH DATA
	
	fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/loanApplications",
			
		{
			method :"POST",
			
			headers:{
				
				"Content-Type":"application/json",
				"Authorization":"Bearer "+token
			},
		
		body : JSON.stringify(loanData )
	})
	.then(response =>{
		if(!response.ok){
			
			throw new Error("Failed to submit loan application");
		}
		return response.json();
	})
	.then(data =>{
		
		sessionStorage.setItem("applicationId",data.applicationId);
		
		window.location.href="upload-document.html";
	}
		
	).catch(error=>{

		document.getElementById("message").textContent = "Failed to submit loan application."
	}
		
	)
	
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
