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
	
	
