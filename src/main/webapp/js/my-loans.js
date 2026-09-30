const token = sessionStorage.getItem("token");

const loanTableContainer = document.getElementById("loanTableContainer");
const loanTableBody = document.getElementById("loanTableBody");
const loadingMessage = document.getElementById("loadingMessage");
const loanMessage = document.getElementById("loanMessage");
const logoutButton = document.getElementById("logoutButton");
const backButton = document.getElementById("backButton");

// =====================================================
// CHECK LOGIN
// =====================================================

if (!token) {
window.location.href = "../pages/login.html";
}

// =====================================================
// LOAD CUSTOMER'S LOANS
// =====================================================

async function loadMyLoans() {


try {

    const response = await fetch(
        "http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/loans/my",
        {
            method: "GET",

            headers: {
                "Authorization": "Bearer " + token
            }
        }
    );


    const data = await response.json();


    // Hide loading message
    loadingMessage.classList.add("d-none");


    // =====================================================
    // SUCCESS
    // =====================================================

    if (response.ok) {

        if (data.length === 0) {

            loanMessage.innerHTML = `
                <div class="alert alert-info">
                    You currently have no loans.
                </div>
            `;

            return;
        }


        // Show table
        loanTableContainer.classList.remove("d-none");


        // Clear existing rows
        loanTableBody.innerHTML = "";


        // Create rows
        data.forEach(function(loan) {

            const row = document.createElement("tr");

		//	 DATE FORMATE CHANGE
			
			const startDate = loan.startDate;
			const startFormattedDate = `${startDate[0]}-${String(startDate[1]).padStart(2, "0")}-${String(startDate[2]).padStart(2, "0")}`;
			
			const endDate = loan.startDate;
			const endFormattedDate = `${endDate[0]}-${String(endDate[1]).padStart(2, "0")}-${String(endDate[2]).padStart(2, "0")}`;

			
			//  ROW VALUES 	
			
            row.innerHTML = `
                
                <td>${loan.loanId}</td>

                <td>${loan.loanType || "N/A"}</td>

                <td>${loan.appAmount || "N/A"}</td>

                <td>${loan.intRate || "N/A"}</td>

                <td>${loan.duration || "N/A"}</td>

                <td>${startFormattedDate || "N/A"}</td>

                <td>${endFormattedDate || "N/A"}</td>

                <td>
                    <span class="badge bg-success">
                        ${loan.status || "N/A"}
                    </span>
                </td>

                <td>
                    <button
                        class="btn btn-primary btn-sm"
                        onclick="makePayment(${loan.loanId})">
                        Make Payment
                    </button>
                </td>

            `;


            loanTableBody.appendChild(row);

        });

    }


    // =====================================================
    // ERROR
    // =====================================================

    else {

        loanMessage.innerHTML = `
            <div class="alert alert-danger">
                ${data.message || "Failed to load your loans."}
            </div>
        `;

    }


} catch (error) {

    console.error("Error loading loans:", error);

    loadingMessage.classList.add("d-none");

    loanMessage.innerHTML = `
        <div class="alert alert-danger">
            Unable to connect to the server.
            Please try again.
        </div>
    `;

}


}

// =====================================================
// MAKE PAYMENT
// =====================================================

function makePayment(loanId) {


sessionStorage.setItem("selectedLoanId", loanId);

window.location.href = "make-payment.html";


}

// =====================================================
// BACK TO DASHBOARD
// =====================================================

if (backButton) {


backButton.addEventListener("click", function() {

    window.location.href = "customer-dashboard.html";

});


}

// =====================================================
// LOGOUT
// =====================================================

if (logoutButton) {


logoutButton.addEventListener("click", function() {

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("customerId");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("selectedLoanId");

    window.location.href = "../pages/login.html";

});


}

// =====================================================
// LOAD LOANS WHEN PAGE OPENS
// =====================================================

loadMyLoans();


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
