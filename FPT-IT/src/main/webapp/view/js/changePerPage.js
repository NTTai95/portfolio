window.addEventListener("DOMContentLoaded", function() {

	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
	tooltipTriggerList.forEach(function(tooltipTriggerEl) {
		new bootstrap.Tooltip(tooltipTriggerEl);
	});

	let perPage = document.getElementById("perPage");
	if (perPage != null) {
		perPage.addEventListener("change", function() {
			const selectedValue = this.value;

			const currentUrl = new URL(window.location.href);

			const params = new URLSearchParams(currentUrl.search);

			if (selectedValue == 10) {
				params.delete('perPage');
			} else {
				params.set('perPage', selectedValue);
			}

			params.set('page', 1);

			window.location.href = `${currentUrl.pathname}?${params.toString()}`;
		});
	}

	let formSearch = document.getElementById("search");
	if (formSearch != null) {
		formSearch.addEventListener("submit", function(e) {
			e.preventDefault();
			const search = document.querySelector('input[name="search"]').value;

			const currentUrl = new URL(window.location.href);

			const params = new URLSearchParams(currentUrl.search);

			if (search.trim() == "") {
				params.delete('search');
			} else {
				params.set('search', search);
			}

			params.set('page', 1);

			window.location.href = `${currentUrl.pathname}?${params.toString()}`;
		});
	}

	let searchQuestion = document.getElementById("searchQuestion");
	if (searchQuestion != null) {
		searchQuestion.addEventListener("submit", function(e) {
			e.preventDefault();
			const search = document.querySelector('input[name="searchQuestion"]').value;

			const currentUrl = new URL(window.location.href);

			const params = new URLSearchParams(currentUrl.search);

			params.delete('searchQuestion');
			params.delete('tag');

			if(search.trim() != "") {
				const regex = /\[([^\]]+)\]|([^[]+)/g;
				let tags = [];
				let searchText = '';
				let match;
				while ((match = regex.exec(search)) !== null) {
					if (match[1]) {
						tags.push(match[1]);
					}
					if (match[2]) {
						searchText = match[2].trim();

					}
				}

				if (tags.length > 0) {
					params.set('tag', tags.join(','));
				}

				if (searchText) {
					params.set('searchQuestion', searchText);
				}
			}

			params.set('page', 1);

			window.location.href = `/JAVA4_NEW/questions?${params.toString()}`;
		});
	}

	let formRes = document.getElementById("formRes");
	if (formRes != null) {
		formRes.addEventListener("submit", function(e) {
			e.preventDefault();
			let form = formRes.elements;
			let displayName = form.displayName;
			let email = form.email;
			let password = form.password;
			let confirmPassword = form.confirmPassword;
			let Agree = form.Agree;

			let errDisplayName = document.getElementById("errorDisplayName");
			let errEmail = document.getElementById("errorEmail");
			let errPassword = document.getElementById("errorPassword");
			let errConfirmPassword = document.getElementById("errorConfirmPassword");

			if (!Agree.checked) {
				Agree.classList.add("border-danger");
				Agree.focus();
			} else {
				Agree.classList.remove("border-danger");
			}

			if (password.value == "") {
				errPassword.innerText = "*Vui lòng nhập mật khẩu!";
				password.focus();
			} else if (password.value.length < 8) {
				errPassword.innerText = "*Mật khẩu tối thiểu 8 kí tự!";
				password.focus();
			} else if (password.value.length > 30) {
				errPassword.innerText = "*Mật khẩu tối đa 30 kí tự!";
				password.focus();
			} else {
				errPassword.innerText = "";
			}

			if (password.value != confirmPassword.value && errPassword.innerText == "") {
				errConfirmPassword.innerText = "*Mật khẩu không khớp!";
				confirmPassword.focus();
			} else {
				errConfirmPassword.innerText = "";
			}

			if (email.value == "") {
				errEmail.innerText = "*Vui lòng nhập email!";
				email.focus();
			} else if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email.value)) {
				errEmail.innerText = "*Email không hợp lệ!";
				email.focus();
			} else {
				errEmail.innerText = "";
			}

			if (displayName.value == "") {
				errDisplayName.innerText = "*Vui lòng nhập tên hiển thị!";
				displayName.focus();
			} else if (displayName.value.length < 2) {
				errDisplayName.innerText = "*Tên hiển thị tối thiểu 2 kí tự!";
				displayName.focus();
			} else if (displayName.value.length > 20) {
				errDisplayName.innerText = "*Tên hiển thị tối đa 20 kí tự!";
				displayName.focus();
			} else {
				errDisplayName.innerText = "";
			}

			if (errDisplayName.innerText == "" && errEmail.innerText == "" && errPassword.innerText == "" && errConfirmPassword.innerText == "" && Agree.checked) {
				formRes.submit();
			}

		});
	}

	let formLogin = document.getElementById("formLogin");
	if (formLogin != null) {
		formLogin.addEventListener("submit", function(e) {
			e.preventDefault();
			let form = formLogin.elements;
			let email = form.email;
			let password = form.password;

			let errEmail = document.getElementById("errorEmail");
			let errPassword = document.getElementById("errorPassword");

			if (email.value.trim() == "") {
				errEmail.innerText = "*Vui lòng nhập email!";
			} else if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email.value)) {
				errEmail.innerText = "*Email không hợp lệ!";
				email.focus();
			} else {
				email.innerText = "";
			}

			if (password.value.trim() == "") {
				errPassword.innerText = "*Vui lòng nhập mật khẩu!";
				password.focus();
			} else {
				errPassword.innerText = "";
			}

			if (errEmail.innerText == "" && errPassword.innerText == "") {
				formLogin.submit();
			}
		});
	}

	function markDownToText(el) {
		const currentUrl = new URL(window.location.href);
		const params = new URLSearchParams(currentUrl.search);
		let markDown = el.innerText;
		let text = markDown.replaceAll("\*", "");
		text = text.replaceAll("`", "");
		let regex = new RegExp(`(${params.get("search")})`, "gi");
		text = text.replace(regex, "<b>$1</b>")
		el.innerHTML = text;
	}

	let El = document.getElementById("focusEl");
	if (El != null) {
		checkFocus(El);
		console.log("Focus")
		El.classList.add("bg-warning-subtle", "outline-none");
		setTimeout(function() {
			El.classList.remove("bg-warning-subtle", "outline-none");
			if (El.tagName != "INPUT" && El.tagName != "TEXTAREA") {
				El.blur();
			}
		}, 2000);

		El.focus();
		setTimeout(function() {
			El.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}, 300);

	}

	const elements = document.querySelectorAll(".markdowntoText");
	elements.forEach(el => markDownToText(el));

	function checkFocus(el) {
		let parentEl = el.parentElement;
		while (parentEl) {
			if (parentEl.getAttribute("id")) {
				console.log(parentEl.getAttribute("id"))
				if (parentEl.getAttribute("id").includes("collapse")) {
					const collapseInstance = new bootstrap.Collapse(parentEl, {
						toggle: false
					});
					collapseInstance.toggle();
				}
			}
			parentEl = parentEl.parentElement;
		}
	}

	const inputs = document.querySelectorAll('input[id*="like-"]');

	Array.from(inputs).forEach(input => {

	});

	let ImgProfile = document.getElementById("img-profile");
	if (ImgProfile != null) {
		ImgProfile.addEventListener("change", function(e) {
			let showImg = document.getElementById("show-img-profile");

			const file = e.target.files[0];
			if (file) {
				if (file.size > 3 * 1024 * 1024) {
					let alert = document.getElementById("alert-message");
					alert.innerText = "Hình ảnh vượt quá 3MB!";
					alert.classList.add("show");

					setTimeout(function() {
						alert.classList.remove("show");
					}, 3000);
					e.target.value = "";
					return;
				}

				const reader = new FileReader();

				reader.onload = function(e) {
					showImg.src = e.target.result;
				};
				reader.readAsDataURL(file);

				document.getElementById("warning-save-img").classList.remove("d-none");
			}
		});
	}

	let intru = document.getElementById("show-introduction-2");
	if (intru != null) {
		console.log(intru.dataset.value);
		const converter = new showdown.Converter();

		const markdownContent = intru.dataset.value;

		const htmlContent = converter.makeHtml(markdownContent);

		/*		currentContent = currentContent.replace(/<p><br><\/p>/g, "");
				currentContent = currentContent.replace(/<p>\n<br><\/p>/g, "");*/

		intru.innerHTML = htmlContent;
	}

	let showAlertEl = document.getElementById("show-alert");
	if (showAlertEl != null) {
		showAlert(showAlertEl.innerText, 1);
		showAlertEl.remove();
	}
});

function submitFormUser(e) {
	let form = e.target;
	let errEmail = document.getElementById("errEmail");
	let errDisplayName = document.getElementById("errDisplayName");
	let errIntroduction = document.getElementById("errIntroduction");


	if (!/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(form.email.value)) {
		errEmail.innerText = "*Không hợp lệ!";
	} else {
		errEmail.innerText = "";
	}

	if (form.displayName.value.trim().length < 2) {
		errDisplayName.innerText = "*Tối thiểu 2 kí tự!";
	} else if (form.displayName.value.trim().length > 20) {
		errDisplayName.innerText = "*Tối đa 20 kí tự!";
	} else {
		errDisplayName.innerText = "";
	}

	let div = document.createElement("div");
	let introduction = $('#summernote1').summernote('code')
	div.innerHTML = introduction;

	const converter = new showdown.Converter();

	if (div.innerText.length > 5000) {
		errIntroduction.innerText = "*Tối đa 5000 kí tự!";
	} else {
		errIntroduction.innerText = "";
	}

	if (errEmail.innerText == "" && errDisplayName.innerText == "" && errIntroduction.innerText == "") {
		let input = document.createElement("input");
		input.type = "hidden";
		input.name = "introduction";
		input.value = converter.makeMarkdown(introduction).replace(/<!-- -->/g, "");
		form.appendChild(input);
		form.submit();
	} else { e.preventDefault(); }
}

function editAnswer(elEdit, elAnswer, idAnswer) {
	let formEdit = document.getElementById(elEdit);
	let input = formEdit.getElementsByTagName("input")[0];
	let button = formEdit.getElementsByTagName("button")[formEdit.getElementsByTagName("button").length - 1];
	let text = document.getElementById(elAnswer);

	if (!document.getElementById("cannelAnswer" + elEdit)) {
		let buttonCannel = document.createElement('button');
		buttonCannel.id = "cannelAnswer" + elEdit;
		buttonCannel.innerText = "Hủy";
		buttonCannel.classList.add("btn-orange", "ms-2", 'w-25');
		buttonCannel.type = "button";

		buttonCannel.setAttribute("onclick", `cannelEditAnswer(event,'${elEdit}',${input.value})`);

		button.insertAdjacentElement('afterend', buttonCannel);
		button.innerText = "Lưu trả lời"
	}

	formEdit.action = formEdit.action.replace("/add", "/edit");

	console.log(idAnswer);
	input.value = idAnswer;

	let textTemp = document.createElement('div');
	textTemp.innerHTML = text.innerHTML;

	const textareas = textTemp.querySelectorAll('textarea');
	textareas.forEach(function(textarea) {
		textarea.remove();
	});
	let markDown = convertToMarkdown2(textTemp.innerHTML);
	console.log(textTemp);
	let HTML = convertToHtml2(markDown, 'summernote1');
	$('#summernote1').summernote('code', '');
	$('#summernote1').summernote('pasteHTML', HTML);

	formEdit.focus();
	formEdit.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function editComment(elEdit, elComment, idComment) {
	let formEdit = document.getElementById(elEdit);
	let label = formEdit.getElementsByTagName("label")[0];
	let textarea = formEdit.getElementsByTagName("textarea")[0];
	let input = formEdit.getElementsByTagName("input")[0];
	let button = formEdit.getElementsByTagName("button")[0];
	let text = document.getElementById(elComment).innerText;

	if (!document.getElementById("cannelComment" + elEdit)) {

		let buttonCannel = document.createElement('button');
		buttonCannel.id = "cannelComment" + elEdit;
		buttonCannel.innerText = "Hủy";
		buttonCannel.classList.add("btn", "btn-orange", "p-1", "px-2", "ms-2");
		buttonCannel.type = "button";

		buttonCannel.setAttribute("onclick", `cannelEditComment(event,'${elEdit}',${input.value})`);

		button.insertAdjacentElement('afterend', buttonCannel);
		button.innerText = "Lưu bình luận";
	}

	input.value = idComment;

	formEdit.action = formEdit.action.replace("/add", "/edit");


	label.innerText = "Chỉnh sửa bình luận";
	textarea.value = text;
	textarea.focus();
	textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function cannelEditAnswer(event, elEdit, id) {
	event.target.remove();
	let form = document.getElementById(elEdit);
	let input = form.getElementsByTagName("input")[0];
	let button = form.getElementsByTagName("button")[form.getElementsByTagName("button").length - 1];

	form.action = form.action.replace("/edit", "/add");

	$('#summernote1').summernote('code', '')
	input.value = id;
	button.innerText = "Thêm bình luận";
}

function cannelEditComment(event, elEdit, id, btnEnd) {
	event.target.remove();
	let form = document.getElementById(elEdit);
	let label = form.getElementsByTagName("label")[0];
	let textarea = form.getElementsByTagName("textarea")[0];
	let input = form.getElementsByTagName("input")[0];
	let button = form.getElementsByTagName("button")[0];

	form.action = form.action.replace("/edit", "/add");

	label.innerText = "Bình luận";
	textarea.value = "";
	input.value = id;
	button.innerText = "Thêm bình luận";
	textarea.focus();
}

function submitForm(e, errId) {
	e.preventDefault();

	let errEl = document.getElementById(errId);
	let form = e.target;
	let content = form.content;
	if (content.value.trim() == '') {
		errEl.innerText = "*Vui lòng nhập bình luận!";
	} else if (content.value.trim().length < 20) {
		errEl.innerText = "*Tối thiểu 20 kí tự!";
	} else if (content.value.trim().length > 200) {
		errEl.innerText = "*Tối đa 200 kí tự!";
	} else {
		errEl.innerText = "";
	}

	if (errEl.innerText == "") {
		form.submit();
	}
}

function submitFormAnswer(e, errId) {
	e.preventDefault();
	let errEl = document.getElementById(errId);
	let form = e.target;

	var content = $('#summernote1').summernote('code');
	let elTemp = document.createElement('div');
	elTemp.innerHTML = content;

	Array.from(elTemp.getElementsByTagName("p")).forEach(el => {
		if (el.id.includes("lauguge")) {
			el.remove();
		}
	});

	let text = elTemp.innerText.replace("Tab and Shift-Tab currently for indentation. Press Esc to enable keyboard navigation.", "");
	if (text.length < 50) {
		errEl.innerText = "*Chi tiết tối thiểu 50 kí tự!";
	} else if (text.length > 5000) {
		errEl.innerText = "*Chi tiết tối đa 5000 kí tự!";
	} else {
		errEl.innerText = "";
	}

	if (errEl.innerText == "") {
		let input = document.createElement("input");
		input.name = "content";
		input.type = "hidden";
		input.setAttribute("value", convertToMarkdown(content)); /*convertToMarkdown(content)*/

		console.log(input)
		form.appendChild(input);
		form.submit();
	}
}

async function dislikeAnswer(el) {
	const data = { id: el.dataset.id };
	const uri = "vote/answer/dislike";
	let point = Number(el.dataset.pointchange);

	let checkGroup = document.querySelectorAll(`input[name="${el.name}"]`);

	const initialStates = Array.from(checkGroup).map(cb => {
		return {
			element: cb,
			checked: cb.checked,
			count: Number(document.getElementById(cb.dataset.count).innerText)
		};
	});

	let pointEl = document.getElementById(el.dataset.point);

	Array.from(checkGroup).forEach(cb => {
		if (el === cb && cb.checked) {
			let countEl = document.getElementById(cb.dataset.count);
			countEl.innerText = Number(countEl.innerText) + 1;
		} else if (el !== cb && cb.checked) {
			let countEl = document.getElementById(cb.dataset.count);
			countEl.innerText = Number(countEl.innerText) - 1;
			cb.checked = false;
			pointEl.innerText = Number(pointEl.innerText) - Number(cb.dataset.pointchange);
		} else if (el === cb && !cb.checked) {
			let countEl = document.getElementById(cb.dataset.count);
			countEl.innerText = Number(countEl.innerText) - 1;
		}
	});


	if (el.checked) {
		pointEl.innerText = Number(pointEl.innerText) + point;
	} else {
		pointEl.innerText = Number(pointEl.innerText) - point;
	}


	try {
		const result = await sendServlet(uri, data);
	} catch (error) {
		showAlert("Cập nhật yêu thích thất bại!<br><i><b>dữ liệu đã được khôi phục.</b></i>", -1);

		initialStates.forEach(state => {
			state.element.checked = state.checked;
			document.getElementById(state.element.dataset.count).innerText = state.count;
		});

		el.checked = !el.checked;

		pointEl.innerText = Number(pointEl.innerText) - point;
	}
}

async function likeAnswer(el) {
	const data = { id: el.dataset.id };
	const uri = "vote/answer/like";
	let point = Number(el.dataset.pointchange);

	let checkGroup = document.querySelectorAll(`input[name="${el.name}"]`);

	const initialStates = Array.from(checkGroup).map(cb => {
		return {
			element: cb,
			checked: cb.checked,
			count: Number(document.getElementById(cb.dataset.count).innerText)
		};
	});

	let pointEl = document.getElementById(el.dataset.point);

	Array.from(checkGroup).forEach(cb => {
		if (el === cb && cb.checked) {
			let countEl = document.getElementById(cb.dataset.count);
			countEl.innerText = Number(countEl.innerText) + 1;
		} else if (el !== cb && cb.checked) {
			let countEl = document.getElementById(cb.dataset.count);
			countEl.innerText = Number(countEl.innerText) - 1;
			cb.checked = false;
			pointEl.innerText = Number(pointEl.innerText) - Number(cb.dataset.pointchange);
		} else if (el === cb && !cb.checked) {
			let countEl = document.getElementById(cb.dataset.count);
			countEl.innerText = Number(countEl.innerText) - 1;
		}
	});

	if (el.checked) {
		pointEl.innerText = Number(pointEl.innerText) + point;
	} else {
		pointEl.innerText = Number(pointEl.innerText) - point;
	}

	try {
		const result = await sendServlet(uri, data);
	} catch (error) {
		showAlert("Cập nhật yêu thích thất bại!<br><i><b>dữ liệu đã được khôi phục.</b></i>", -1);

		initialStates.forEach(state => {
			state.element.checked = state.checked;
			document.getElementById(state.element.dataset.count).innerText = state.count;
		});

		el.checked = !el.checked;

		pointEl.innerText = Number(pointEl.innerText) - point;
	}
}


async function dislikeQuestion(el) {
	const data = { id: el.dataset.id };
	const uri = "vote/question/dislike";
	let point = Number(el.dataset.pointchange);

	let checkGroup = document.querySelectorAll(`input[name="${el.name}"]`);

	const initialStates = Array.from(checkGroup).map(cb => {
		return {
			element: cb,
			checked: cb.checked,
			count: Number(document.getElementById(cb.dataset.count).innerText)
		};
	});

	let pointEl = document.getElementById(el.dataset.point);

	Array.from(checkGroup).forEach(cb => {
		if (el === cb && cb.checked) {
			let countEl = document.getElementById(cb.dataset.count);
			countEl.innerText = Number(countEl.innerText) + 1;
		} else if (el !== cb && cb.checked) {
			let countEl = document.getElementById(cb.dataset.count);
			countEl.innerText = Number(countEl.innerText) - 1;
			cb.checked = false;
			pointEl.innerText = Number(pointEl.innerText) - Number(cb.dataset.pointchange);
		} else if (el === cb && !cb.checked) {
			let countEl = document.getElementById(cb.dataset.count);
			countEl.innerText = Number(countEl.innerText) - 1;
		}
	});


	if (el.checked) {
		pointEl.innerText = Number(pointEl.innerText) + point;
	} else {
		pointEl.innerText = Number(pointEl.innerText) - point;
	}


	try {
		const result = await sendServlet(uri, data);
	} catch (error) {
		showAlert("Cập nhật yêu thích thất bại!<br><i><b>dữ liệu đã được khôi phục.</b></i>", -1);

		initialStates.forEach(state => {
			state.element.checked = state.checked;
			document.getElementById(state.element.dataset.count).innerText = state.count;
		});

		el.checked = !el.checked;

		pointEl.innerText = Number(pointEl.innerText) - point;
	}
}

async function likeQuestion(el) {
	const data = { id: el.dataset.id };
	const uri = "vote/question/like";
	let point = Number(el.dataset.pointchange);

	let checkGroup = document.querySelectorAll(`input[name="${el.name}"]`);

	const initialStates = Array.from(checkGroup).map(cb => {
		return {
			element: cb,
			checked: cb.checked,
			count: Number(document.getElementById(cb.dataset.count).innerText)
		};
	});

	let pointEl = document.getElementById(el.dataset.point);

	Array.from(checkGroup).forEach(cb => {
		if (el === cb && cb.checked) {
			let countEl = document.getElementById(cb.dataset.count);
			countEl.innerText = Number(countEl.innerText) + 1;
		} else if (el !== cb && cb.checked) {
			let countEl = document.getElementById(cb.dataset.count);
			countEl.innerText = Number(countEl.innerText) - 1;
			cb.checked = false;
			pointEl.innerText = Number(pointEl.innerText) - Number(cb.dataset.pointchange);
		} else if (el === cb && !cb.checked) {
			let countEl = document.getElementById(cb.dataset.count);
			countEl.innerText = Number(countEl.innerText) - 1;
		}
	});

	if (el.checked) {
		pointEl.innerText = Number(pointEl.innerText) + point;
	} else {
		pointEl.innerText = Number(pointEl.innerText) - point;
	}

	try {
		const result = await sendServlet(uri, data);
	} catch (error) {
		showAlert("Cập nhật yêu thích thất bại!<br><i><b>dữ liệu đã được khôi phục.</b></i>", -1);

		initialStates.forEach(state => {
			state.element.checked = state.checked;
			document.getElementById(state.element.dataset.count).innerText = state.count;
		});

		el.checked = !el.checked;

		pointEl.innerText = Number(pointEl.innerText) - point;
	}
}

async function sendServlet(uri, data) {
	console.log("uri: " + uri);

	try {
		const response = await fetch(`http://localhost:8080/JAVA4_NEW/${uri}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});

		console.log("Response status:", response.status); // Kiểm tra mã trạng thái phản hồi

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const result = await response.json();
		return result; // Trả về kết quả
	} catch (error) {
		console.error("Error occurred:", error); // Log lỗi nếu có
		throw error; // Ném lỗi ra ngoài nếu cần
	}
}

function submitFormChangePassword(e) {
	e.preventDefault();
	let form = e.target;
	let newPassword = form.newPassword;
	let newPasswordAgian = form.newPasswordAgain;

	let errNewPassword = document.getElementById("errNewPassword");
	let errNewPasswordAgian = document.getElementById("errNewPasswordAgain");

	if (newPassword.value.trim().length < 8) {
		errNewPassword.innerText = "*Mật khẩu tối thiểu 8 kí tự!";
	} else if (newPassword.value.trim().length > 30) {
		errNewPassword.innerText = "*Mật khẩu tối đa 30 kí tự!";
	} else if (newPasswordAgian.value.trim() != newPassword.value.trim()) {
		errNewPasswordAgian.innerText = "*Mật khẩu không khớp!";
	} else {
		errNewPassword.innerText = "";
		errNewPasswordAgian.innerText = "";
	}

	if (errNewPassword.innerText == "" && errNewPasswordAgian.innerText == "") {
		form.submit();
	}

}
function submitFormTag(e) {
	e.preventDefault();
	let form = e.target;
	let tagName = form.tagName;
	let description = form.description;

	let errTagName = document.getElementById("errTagName");
	let errDescription = document.getElementById("errDescription");

	if (!isNonVietnamese(tagName.value) || tagName.value.includes(" ")) {
		errTagName.innerText = "*Chủ đề không được có dấu và khoảng trắng!";
	} else if (hasSpecialCharacters(tagName.value)) {
		errTagName.innerText = "*Chủ đề không được có kí tự đặt biệt!";
	} else if (tagName.value.length < 2) {
		errTagName.innerText = "*Tối thiểu 2 kí tự!";
	} else if (tagName.value.length > 20) {
		errTagName.innerText = "*Tối đa 20 kí tự!";
	} else { errTagName.innerText = ""; }

	if (description.value.trim().length < 20) {
		errDescription.innerText = "*Tối thiểu 20 kí tự!";
	} else if (description.value.trim().length > 150) {
		errDescription.innerText = "*Tối đa 150 kí tự!";
	} else {
		errDescription.innerText = "";
	}

	if (errDescription.innerText == "" && errTagName.innerText == "") {
		form.submit();
	}
}

function isNonVietnamese(text) {
	const pattern = /^[^àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*$/i;
	return pattern.test(text);
}

function hasSpecialCharacters(text) {
	const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>[\]\\/+=_~`-]/;
	return specialCharacterPattern.test(text);
}

//id="focusEl" tabindex="0"