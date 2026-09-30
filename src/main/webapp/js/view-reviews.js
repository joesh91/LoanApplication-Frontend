
// ================= GET JWT TOKEN =================

const token = sessionStorage.getItem("token");

if(!token){
	window.location.href="login.html";
}

// ================= LOGOUT =================

const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click",function(){
	
	sessionStorage.removeItem("token");
	
	window.location.href="login.html";
	
});

// ================= GET TABLE BODY =================

const tableBody = document.getElementById("reviewsTableBody");


// ================= GET ALL APPLICATION REVIEWS =================


fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/applicationreviews",{
	
	method:"GET",
	headers:{
		"Authorization":"Bearer "+token
	}
	
}).then(response =>{
	if(!response.ok){
		throw new Error("Failed to load reviews : "+response.status);
	}
	return response.json();
	
}).then(reviews =>{
	
	if(reviews.length === 0){
		
		tableBody.innerHTML=`
				<tr>
					<td colspan="7" class="text-center" > No application reviews found </td>
				</tr>		
		`;
		return;		
	}
	
	// ================= CREATE TABLE ROWS =================
	
	reviews.forEach(review =>{
		
		const row = document.createElement("tr");
			
			//	CREATE TABLE ROW
			
			const dateParts = review.reviewDate;

				const formattedDate =
				    dateParts[0] + "-" +
				    String(dateParts[1]).padStart(2, "0") + "-" +
				    String(dateParts[2]).padStart(2, "0");
			
			
			row.innerHTML = `
						<td><a href="view-review-details.html?id=${review.reviewId}&applicationId=${review.loanApplication}">
							${review.reviewId}
							</a>
						</td>
						<td>
							${review.loanApplication}
						</td>
						<td>
							${review.staff}
						</td>
						<td>
							${formattedDate}
						</td>
						<td>
							${review.decision}
						</td>
						<td>
							${review.comments}
						</td>
						<td>
							
							<button class="btn btn-outline-primary btn-sm" onclick="viewApplication(${review.loanApplication})">
								View Application  
							</button>
							
						</td>		
						
			`;
			
			// Add row to table
			
			tableBody.appendChild(row);
	});	
}).catch(error =>{
	console.error("Error loading application reviews : "+error);
	
});

// ================= VIEW APPLICATION =================


function viewApplication(applicationId){
	
	window.location.href="view-loan-application-details.html?id=" + applicationId;
	
}


//	GO DASHBOARD

document.getElementById("dashboard").addEventListener("click", function(){
	
	window.location.href="dashboard.html";
	
});

//	 LOGOUT FUNCTION

document.getElementById("logout").addEventListener("click", function(){
	
	sessionStorage.removeItem("token");
	window.location.href="login.html";
	
});

