const token = sessionStorage.getItem("token");

// =====================================================
// CHECK LOGIN
// =====================================================

if (!token) {
window.location.href = "../pages/login.html";
}

// =====================================================
// LOAD MY PAYMENTS
// =====================================================

async function loadMyPayments() {


const tableBody = document.getElementById("paymentTableBody");

try {

    const response = await fetch(
        "http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/payments/my",
        {
            method: "GET",

            headers: {
                "Authorization": "Bearer " + token
            }
        }
    );


    // If token is expired or unauthorized
    if (response.status === 401 || response.status === 403) {

        sessionStorage.clear();

        window.location.href = "../pages/login.html";

        return;
    }


    if (!response.ok) {
        throw new Error("Failed to load payments.");
    }


    const payments = await response.json();


    // =====================================================
    // NO PAYMENTS
    // =====================================================

    if (!payments || payments.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-muted py-4">
                    No payments found.
                </td>
            </tr>
        `;

        return;
    }


    // =====================================================
    // DISPLAY PAYMENTS
    // =====================================================

    tableBody.innerHTML = "";


    payments.forEach(function(payment) {

        let statusClass = "status-pending";

        if (payment.paymentStatus === "COMPLETED") {
            statusClass = "status-approved";
        }
        else if (
            payment.paymentStatus === "FAILED" ||
            payment.paymentStatus === "REJECTED" ||
            payment.paymentStatus === "CANCELLED"
        ) {
            statusClass = "status-rejected";
        }


        const row = document.createElement("tr");


        row.innerHTML = `
            <td>${payment.paymentId}</td>

            <td>${payment.loanId}</td>

            <td>
                ${Number(payment.amount).toLocaleString(
                    "en-LK",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                )}
            </td>

            <td>${payment.paymentDate ?? "-"}</td>

            <td>
                <span class="status-badge ${statusClass}">
                    ${payment.paymentStatus ?? "PENDING"}
                </span>
            </td>
        `;


        tableBody.appendChild(row);

    });

}
catch (error) {

    console.error("Error loading payments:", error);

    tableBody.innerHTML = `
        <tr>
            <td colspan="5" class="text-center text-danger py-4">
                Failed to load payments.
            </td>
        </tr>
    `;
}


}

// =====================================================
// LOGOUT
// =====================================================

const logoutButton = document.getElementById("logout");

if (logoutButton) {


logoutButton.addEventListener("click", function() {

    sessionStorage.clear();

    window.location.href = "../pages/login.html";

});


}

// =====================================================
// LOAD PAYMENTS WHEN PAGE OPENS
// =====================================================

loadMyPayments();



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

showUserName();