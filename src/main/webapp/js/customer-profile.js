const token = sessionStorage.getItem("token");

if (!token) {

    window.location.href = "../pages/login.html";

}


// -----------------------------------------------------
// LOAD CURRENT CUSTOMER
// -----------------------------------------------------

async function loadCurrentCustomer() {

    try {

        const response = await fetch(
            "http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/customers/me",
            {
                method: "GET",

                headers: {
                    "Authorization": "Bearer " + token
                }
            }
        );

        // -------------------------------------------------
        // CHECK UNAUTHORIZED
        // -------------------------------------------------

        if (response.status === 401) {

            sessionStorage.removeItem("token");
            sessionStorage.removeItem("customerId");

            window.location.href = "../pages/login.html";

            return;
        }


        // -------------------------------------------------
        // CHECK OTHER ERRORS
        // -------------------------------------------------

        if (!response.ok) {

            throw new Error(
                "Failed to load Customer Details."
            );

        }


        // -------------------------------------------------
        // GET CUSTOMER JSON
        // -------------------------------------------------

        const customer = await response.json();

        // -------------------------------------------------
        // DISPLAY CUSTOMER DETAILS
        // -------------------------------------------------

        document.getElementById("firstName").value =
            customer.firstName || "";

        document.getElementById("lastName").value =
            customer.lastName || "";

        document.getElementById("nic").value =
            customer.nic || "";

        document.getElementById("email").value =
            customer.email || "";

        document.getElementById("phone").value =
            customer.phone || "";

        document.getElementById("address").value =
            customer.address || "";


        // -------------------------------------------------
        // SHOW PROFILE
        // -------------------------------------------------

        document
            .getElementById("loadingMessage")
            .classList.add("d-none");

        document
            .getElementById("profileDetails")
            .classList.remove("d-none");


    } catch (error) {

        console.error(
            "Error loading customer profile : ",
            error
        );


        // -------------------------------------------------
        // HIDE LOADING MESSAGE
        // -------------------------------------------------

        document
            .getElementById("loadingMessage")
            .classList.add("d-none");


        // -------------------------------------------------
        // SHOW ERROR MESSAGE
        // -------------------------------------------------

        const errorMessage =
            document.getElementById("errorMessage");

        errorMessage.textContent =
            "Unable to load your profile. Please try again.";

        errorMessage.classList.remove("d-none");

    }

}


// -----------------------------------------------------
// LOGOUT
// -----------------------------------------------------

const logoutButton =
    document.getElementById("logout");


if (logoutButton) {

    logoutButton.addEventListener("click",function() {

            sessionStorage.removeItem("token");
            sessionStorage.removeItem("customerId");

            window.location.href =
                "../pages/login.html";

        }
    );

}



//	 SHOW USER NAME ON THE TOP

async function showUserName(){
	
			const response = await fetch( "http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/users/me",{
				
				method:"GET",
				headers:{
					"Authorization":"Bearer "+token
				}
				
			});

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
			
			//document.getElementById("customer").classList.add("d-none");
			document.getElementById("customer").textContent =  user.userName ;	
		
}

// -----------------------------------------------------
// LOAD PROFILE
// -----------------------------------------------------

loadCurrentCustomer();
showUserName();


