
const token = sessionStorage.getItem("token");


if (!token) {
    window.location.href = "login.html";
}


fetch("http://localhost:8080/LoanApplication-0.0.1-SNAPSHOT/api/registration/all", {

    method: "GET",
    headers: {
        "Authorization": "Bearer " + token
    }

})
    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to load customer registration");
        }

        return response.json();
    })
    .then(data => {

        const tableBody = document.getElementById("customerRegistrationTable");

        data.forEach(registration => {
            const row = document.createElement("tr");

            row.innerHTML = `
							<td><a href="customer-registration-details.html?id=${registration.customerRegistrationId}">${registration.customerRegistrationId} </a>	</td>
							<td>	${registration.firstName} 				</td>
							<td>	${registration.lastName} 				</td>
							<td>	${registration.nic} 					</td>
							<td>	${registration.phone} 					</td>
							<td>	${registration.email} 					</td>
							<td>	${registration.address} 				</td>
							<td>	${registration.status} 					</td>
							`;

            tableBody.appendChild(row);
        });

    }).catch(error => {
        console.error("Error : " + error);
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

	//	 CREATE NEEW CUSTOMER FUNCTION

	document.getElementById("createNewCustomer").addEventListener("click", function(){
		
		window.location.href="#";
		
	});
	