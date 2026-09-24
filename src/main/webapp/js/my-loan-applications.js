
const token = sessionStorage.getItem("token");

if (!token) {
    window.location.href = "../pages/login.html";
}

// 	ELEMENTS

const loadingMessage = document.getElementById("loadingMessage");

const errorMessage = document.getElementById("errorMessage");

const noApplicationsMessage = document.getElementById("noApplicationsMessage");

const applicationContainer = document.getElementById("applicationContainer");

const applicationsTableBody = document.getElementById("applicationsTableBody");


//	LOGOUT

const logOutButton = document.getElementById("logout");

if (logOutButton) {

    logOutButton.addEventListener("click", function() {

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("customerId");

        window.location.href = "../pages/login.html";

    });

}



//	LOAD MY APPLICATION

async function loadMyApplications() {

    try {
		const response = await fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/loanApplications/my", {

            method: "GET",
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        console.log("RESPONCE STATUS : " + response.status);

        if (response.status === 401) {

            sessionStorage.removeItem("token");
            sessionStorage.removeItem("customerId");

            window.location.href = "../pages/login.html";
            return;
        }

        if (!response.ok) {

            throw new Error("Failed to load applications.");
        }

        //	GET JSON DATA

        const applications = await response.json();

        console.log("MY APPLICATIONS : " + applications);


        //	HIDE LOADING 

        loadingMessage.classList.add("d-none");

        //	NO APPLICATIONS

        if (!applications || applications.length === 0) {

            noApplicationsMessage.classList.remove("d-none");

            return;
        }


        //		DISPLAY APPLICATIONS

        applicationContainer.classList.remove("d-none");

        for (const application of applications) {

            const row = document.createElement("tr");

            //	APPLICATION ID

            const applicationIdCell = document.createElement("td");

            applicationIdCell.textContent = application.applicationId;


            //	LOAN TYPE

            const loanTypeCell = document.createElement("td");

            loanTypeCell.textContent = application.loanType;


            //	REQUESTED AMOUNT

            const amountCell = document.createElement("td");

            amountCell.textContent = application.requestedAmount;


            //	PURPOSE

            const purposeCell = document.createElement("td");

            purposeCell.textContent = application.purpose;

            //	STATUS

            const statusCell = document.createElement("td");

            statusCell.textContent = application.status;

            //	APPLICATION DATE

            const applicationDateCell = document.createElement("td");
			
			const dateParts = application.appDate;
				
				const formattedDate = `${dateParts[0]}-${String(dateParts[1]).padStart(2, "0")}-${String(dateParts[2]).padStart(2, "0")}`;

            applicationDateCell.textContent = formattedDate || "";

			//	ACTION
			
			const actionCell = document.createElement("td");
			
			const viewButton = document.createElement("button");
			
			viewButton.textContent = "View Details";
			
			viewButton.className ="btn btn-outline-primary btn-md";
			
			viewButton.addEventListener("click",function(){
				
				window.location.href="../customer/customer-loan-view.html?id="+application.applicationId;
				
			});
			
			actionCell.appendChild(viewButton);
			

            //			ADD DATA ADDES CELLS TO THE TABLE ROW 

            row.appendChild(applicationIdCell);
            row.appendChild(loanTypeCell);
            row.appendChild(amountCell);
            row.appendChild(purposeCell);
            row.appendChild(statusCell);
            row.appendChild(applicationDateCell);
			row.appendChild(actionCell);

            // 			ADD ROW TO TABLE

            applicationsTableBody.appendChild(row);
        }


    } catch (error) {

        console.error("Error loading my loan applications.", error);

        loadingMessage.classList.add("d-none");

        errorMessage.textContent = "Unable to load loan applications. please try again.";

        errorMessage.classList.remove("d-none");

    }

}

//	BACK TO DASHBOARD BUTTON

const backButton = document.getElementById("backtoDashBoardButton");

if(backButton){
	
	backButton.addEventListener("click",function(){
		
		window.location.href="../customer/customer-dashboard.html";
		
	});
	
}

//	APPLY NEW LOAN BUTTON

const applyNewButton = document.getElementById("applyAnotherLoanButton");

if(applyNewButton){
	
	applyNewButton.addEventListener("click",function(){
		
		window.location.href="../customer/loan-application.html";
	});
	
}

//	CALLING ASYNC METHOD

loadMyApplications();