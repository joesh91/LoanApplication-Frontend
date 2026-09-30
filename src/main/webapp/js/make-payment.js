
const paymentForm = document.getElementById("paymentForm");
const paymentMessage = document.getElementById("paymentMessage");
const logoutButton = document.getElementById("logoutButton");
const cancelButton = document.getElementById("cancelButton");

const token = sessionStorage.getItem("token");
const selectedLoanId = sessionStorage.getItem("selectedLoanId");

// =====================================================
// CHECK LOGIN
// =====================================================

if (!token) {
    window.location.href = "../pages/login.html";
}


// =====================================================
// CHECK SELECTED LOAN
// =====================================================

if (!selectedLoanId) {

    paymentMessage.innerHTML = `
        <div class="alert alert-danger">
            No loan has been selected for payment.
        </div>
    `;

    if (paymentForm) {
        paymentForm.classList.add("d-none");
    }
}


// =====================================================
// DISPLAY SELECTED LOAN ID
// =====================================================

const loanIdInput = document.getElementById("loanId");

if (loanIdInput && selectedLoanId) {
    loanIdInput.value = selectedLoanId;
}


// =====================================================
// MAKE PAYMENT
// =====================================================

if (paymentForm) {

    paymentForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const amount = Number(
            document.getElementById("amount").value
        );

        paymentMessage.innerHTML = "";


        // Validate amount

        if (!amount || amount <= 0) {

            paymentMessage.innerHTML = `
                <div class="alert alert-danger">
                    Payment amount must be greater than zero.
                </div>
            `;

            return;
        }


        try {

            const response = await fetch(
                "http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/payments",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + token
                    },

                    body: JSON.stringify({
                        loanId: Number(selectedLoanId),
                        amount: amount
                    })
                }
            );


            const data = await response.json();


            // =====================================================
            // SUCCESS
            // =====================================================

            if (response.ok) {

                paymentMessage.innerHTML = `
                    <div class="alert alert-success">
                        Payment submitted successfully.
                        <br>
                        Payment ID:
                        <strong>${data.paymentId || "Generated"}</strong>
                        <br>
                        Payment Status:
                        <strong>PENDING</strong>
                    </div>
                `;

                paymentForm.reset();

                // Put the loan ID back after reset
                if (loanIdInput) {
                    loanIdInput.value = selectedLoanId;
                }

                // Remove selected loan after successful payment
                sessionStorage.removeItem("selectedLoanId");

            } else {

                paymentMessage.innerHTML = `
                    <div class="alert alert-danger">
                        ${data.message || "Failed to make payment."}
                    </div>
                `;
            }

        } catch (error) {

            console.error("Payment error:", error);

            paymentMessage.innerHTML = `
                <div class="alert alert-danger">
                    Unable to connect to the server.
                    Please try again.
                </div>
            `;
        }
    });
}


// =====================================================
// CANCEL
// =====================================================

if (cancelButton) {

    cancelButton.addEventListener("click", function() {

        sessionStorage.removeItem("selectedLoanId");

        window.location.href = "my-loans.html";
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
