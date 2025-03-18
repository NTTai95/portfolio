function showAlert(mess, type) {
	let alertMessage = document.getElementById("alert-message");
	if (type == -1) {
		alertMessage.innerHTML = mess;
		alertMessage.classList.add("show");

		setTimeout(() => {
			alertMessage.classList.remove('show');
		}, 3000);
	} else if (type == 1) {
		alertMessage.innerHTML = mess;
		alertMessage.classList.add("show");
		alertMessage.classList.replace("alert-danger", "alert-success");

		setTimeout(() => {
			alertMessage.classList.remove('show');
			alertMessage.classList.replace("alert-success", "alert-danger");
		}, 3000);
	}
}