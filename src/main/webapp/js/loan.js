
const token = sessionStorage.getItem("token");

if(!token){
	window.location.herf="login.html";
}

fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/loans",{

	method:"GET",
	headers:{
		"Authorization":"Bearer "+token
	}
		
}).then(response =>{
	if(!response.ok){
		
		throw new Error("Failed to load loan details. "+response.status);
	}
	return response.json();
	
}).then(loans =>{
	
	console.log("LOANS : ",loans);
	
	const tableBody = document.getElementById("loanTable");
	
	loans.forEach(loan=>{
		
		const startDateFormatted = loan.startDate;
		const endDateFormatted = loan.endDate;
					
		const startDate =  `${startDateFormatted[0]}-${String(startDateFormatted[1]).padStart(2, "0")}-${String(startDateFormatted[2]).padStart(2, "0")}`;
		const endDate =  `${endDateFormatted[0]}-${String(endDateFormatted[1]).padStart(2, "0")}-${String(endDateFormatted[2]).padStart(2, "0")}`;
		
		const row = document.createElement("tr");
		
		row.innerHTML = `
			<td><a href="loan-details.html?id=${loan.loanId}">${loan.loanId} </a> </td>
			<td> ${loan.applicationId} </td>
			<td> ${loan.appAmount} </td>
			<td> ${loan.intRate} </td>
			<td> ${loan.duration} </td>
			<td> ${startDate} </td>
			<td> ${endDate} </td>
			<td> ${loan.status} </td>
		`;
		
		tableBody.appendChild(row);
	});
	
}).catch(error =>{
	console.error("Error : ",error);
});


//	CREATE NEW LOAN BUTTON CAPTURE

const createNewLoan = document.getElementById("createNewLoan");

createNewLoan.addEventListener("click",function(){
	
	window.location.href="create-loan.html";
	
	
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




