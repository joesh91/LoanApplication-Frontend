
const token = sessionStorage.getItem("token");


if (!token) {
    window.location.href = "login.html";
}

const urlParam = new URLSearchParams(window.location.search);

const staffId = urlParam.get("id");


fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/staffs/"+staffId,{
	
	method:"GET",
	headers:{
		"Authorization":"Bearer "+token
	}
}).then(response =>{
	if(!response.ok){
		throw new Error("Failed to load staff details."+response.status);
	}
	
	return response.json();
}).then(staff =>{
	
	document.getElementById("staffId").value = staffId;
	document.getElementById("name").value = staff.name;
	document.getElementById("email").value = staff.email; 
	document.getElementById("position").value = staff.position;
	
	
}).catch(error =>{
	console.error("Error ",error);
	
	document.getElementById("staffMessage").innerHTML = `<div class="alert alert-danger"> Failed to load staff details. </div>`;
	
});

//	UPDATE BUTTON CAPTURE EVENT

const updateButton =  document.getElementById("updateStaffButton");

updateButton.addEventListener("click",function(event){
	
	event.preventDefault();
	
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value; 
	const position = document.getElementById("position").value;
	
	const staffData = {
		staffId:staffId,
		name:name,
		email:email,
		position:position
	}
	
	fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/staffs/"+staffId,{
		
		method:"PUT",
		headers:{
			"Content-Type":"application/json",
			"Authorization":"Bearer "+token
		},
		body:JSON.stringify(staffData)
	}).then(response =>{
	
		if(!response.ok){
			throw new Error("Failed to update staff details."+response.status);
		}
	
		return response.json();
	}).then(staff =>{
		
		window.location.href="staff.html";
		
	}).catch(error =>{
		
		console.error("Error ",error);
		
		document.getElementById("staffMessage").innerHTML = `<div class="alert alert-danger"> Failed to update staff details. </div>`;
		
	});
	
});

/*

fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/staffs/" + staffId, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
    },
    body: JSON.stringify(staffData)
})
.then(async response => {

    console.log("RESPONSE STATUS:", response.status);

    const responseText = await response.text();

    console.log("SERVER RESPONSE:", responseText);

    if (!response.ok) {
        throw new Error(
            "Failed to update staff. Status: " +
            response.status +
            " Response: " +
            responseText
        );
    }

    return responseText ? JSON.parse(responseText) : null;
})
.then(staff => {

    console.log("STAFF DETAILS UPDATED SUCCESSFULLY", staff);

    window.location.href = "staff.html";

})
.catch(error => {

    console.error("UPDATE ERROR:", error);

    document.getElementById("staffMessage").innerHTML =
        `<div class="alert alert-danger">
            ${error.message}
        </div>`;
});
});*/

// CANCEL BUTTON CAPTURE EVENT

document.getElementById("cancelButton").addEventListener("click",function(){
	
	window.location.href="staff.html";
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
