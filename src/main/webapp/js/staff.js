
const token = sessionStorage.getItem("token");

console.log("TOKEN : ",token);

if (!token) {
    window.location.href = "login.html";
}

fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/staffs",{
	
	method:"GET",
	headers:{
		"Authorization":"Bearer "+token
	}
}).then(response =>{
	console.log("RESPONSE : ",response);
	if(!response.ok){
		throw new Error("Failed to load staff details.",response.status);
	}
	
	return response.json();
}).then(staffs =>{
	
	const staffTable = document.getElementById("staffTable");
	
	staffs.forEach(staff=>{
		
		console.log("STAFF : ",staff.staffId);
		const row = document.createElement("tr");
		
			row.innerHTML = `
				<td><a href="staff-details.html?id=${staff.staffId}">  ${staff.staffId} </a></td>
				<td> ${staff.name}</td>
				<td> ${staff.email}</td>
				<td> ${staff.position}</td>
			`;
			staffTable.appendChild(row);	
	});
	
}).catch(error =>{
	
	console.error("Error : ",error);
	
	document.getElementById("staffMessage").innerHTML = `<div class="alert alert-danger"> Failed to load staff details </div>`;
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


