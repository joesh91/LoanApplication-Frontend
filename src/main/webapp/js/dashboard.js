	// =====================================================
	//                  DASHBOARD
	// =====================================================
	
	// 	GET JWT TOKEN 
	const token = sessionStorage.getItem("token");
	
	//	GET USERNAME
	const username = sessionStorage.getItem("username");
	
	//	CHECK WHETHER THE USER NAME IS LOGGED IN
	
	if (!token) {
	    //	JWT TOKEN NOT AUTHENTICATED
	
	    window.location.href = "login.html";
	}
	else {
	    console.log("JWT found");
	    console.log(token);
	
	    //	DISPLAY USERNAME
	
	    document.getElementById("usernameDisplay").textContent = username;
	}
	
	//======================================
	// DISPLAY ROLE 
	//======================================
	
	async function roleDisplay(){
	
		try{	
		const response = await fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/users/me",{
			
			method:"GET",
			headers:{
				"Authorization":"Bearer "+token
			}
			
		});
		

		const result = await response.json()
		console.log(result);
		
		document.getElementById("roleDisplay").textContent = result.role;			
	}catch(error){
		console.error("Failed to load user role."+error);
	}
	
	}
	roleDisplay();
	
	// =====================================================
	//                      LOGOUT
	// =====================================================
	
	const logoutBtn = document.getElementById("logout");
	logoutBtn.addEventListener("click",function(){
		
		//	REMOVE AUTHENTICATION INFORMATION
		
		sessionStorage.removeItem("token");
		sessionStorage.removeItem("username");
		
		//	RETURN TO THE LOGIN PAGE
		
		window.location.href = "login.html";
		
	});
	

	