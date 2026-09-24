// =====================================================
// 						LOGIN
// =====================================================

// Find the login form
const loginForm = document.getElementById("loginform");

// Only execute this code if loginForm exists
if(loginForm){
loginForm.addEventListener("submit", function(event){
	
	console.log("logging button was pressed");
	
	event.preventDefault();
	
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;
	
	//	create JSON OBJECT EXPECTED BY THE JAKARTA BACKEND
	const loginData={
		userName: username,
		passWord: password
	};
	
	// Send login request to the Java backend
	fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/users/login",{
		
		method:"POST",							 		// Tell backend we are using POST
		headers:{										// Tell backend that our data is JSON
			"Content-Type":"application/json"
		},
		
		body:JSON.stringify(loginData)				 	// Convert JavaScript object into JSON
	})
	
	.then(response => response.text())					// "Take the server's response and read its body as plain text."
	.then(data=>{
		console.log(data);
		
		// Check whether login was successful
		
		if(data === "OTP SENT"){
			
			sessionStorage.setItem("username",username); 			// Save username so the OTP page knows which user is verifying the OTP
			 
			window.location.href = "otp.html";						// Go to OTP page
		}
	})
	.catch(error =>{
		console.error("Error : "+error);
	})
	
});
}


// =====================================================
// 						OTP VERIFICATION
// =====================================================


	const otpForm = document.getElementById("otpform");
	
	if(otpForm){
		
		otpForm.addEventListener("submit",function(event){
			
			event.preventDefault();
			
			const username = sessionStorage.getItem("username");
			
			const enteredOTp = document.getElementById("otp").value;
			
			const otpData = {
				
				userName : username,
				enteredOtp : enteredOTp 
			};
				
			
			// 	SEND OTP TO BACK END
			
			fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/users/verify-otp",{
				
				method:"POST",
				
				headers:{
					"content-type":"application/json"
				},		
				
				body:JSON.stringify(otpData)		
				
			}).then(response => response.json())
			.then(data =>{
				console.log(data);
				
				// Get JWT from LoginResponseDto
				const token = data.token;
				
				// Store JWT
				sessionStorage.setItem("token",token);
				
				
				//===================================
				//	GET USER ROLE FROM JWT
				//===================================
				
				// JWT has 3 parts:
				// HEADER.PAYLOAD.SIGNATURE
				
				const payload = JSON.parse(atob(token.split(".")[1]));
				
				//	GET ROLE FROM JWT PAYLOAD
				
				const role = payload.role;
				
				console.log("ROLE : ",role);
				
				//=============================
				//	REDIRECT BASED ON ROLE
				//=============================
				
				if(role === "CUSTOMER"){
					
					//go to customer dashboard
					console.log("CUSTOMER IF CONDITION LOADED.");
					window.location.href="../customer/customer-dashboard.html";
				
				}else{
					
					//go to admin dashboard
					console.log("ADMIN IF CONDITION LOADED.");
					window.location.href="../pages/dashboard.html";
				}
								
			})	
			.catch(error =>{
				console.log("Error : "+error);
			});
			
		});
		
	}	