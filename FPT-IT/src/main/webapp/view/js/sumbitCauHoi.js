var btnSubmit = document.getElementById("submitCH");
btnSubmit.setAttribute('disabled', true);

var checkTieuDe = false;
var checkChuDe = false;
var checkDetail = false;
document.getElementById('formCauHoi').addEventListener('submit', function(e) {

	e.preventDefault();

	const tieuDe = document.getElementById('tieuDe').value;
	const tags = Array.from(document.getElementById('multiSelect').selectedOptions).map(option => option.value);

	var content = $('#summernote1').summernote('code');

	console.log("Tiêu đề:", );
	console.log("Tags:", );
	console.log("Detail:", );
	
	let form = e.target;
	
	let inputTitle = document.createElement("input");
	inputTitle.name = "title";
	inputTitle.value = tieuDe;
	inputTitle.type = "hidden";
	
	let inputTags = document.createElement("input");
	inputTags.name = "tags";
	inputTags.value = tags;
	inputTags.type = "hidden";
	
	let inputContent = document.createElement("input");
	inputContent.name = "content";
	inputContent.value = convertToMarkdown(content);
	inputContent.type =	"hidden";
	
	form.appendChild(inputTitle)
	form.appendChild(inputTags)
	form.appendChild(inputContent)
	
	form.submit();
});

var errTieuDe = document.getElementById("errTieuDe");
document.getElementById('tieuDe').addEventListener("input", function(e) {
	var inputValue = e.target.value;
	if (inputValue.length < 20) {
		errTieuDe.innerText = "Tối thiểu 20 kí tự!";
		checkTieuDe = false;
		btnSubmit.setAttribute("disabled", true);
	} else if (inputValue.length > 100) {
		errTieuDe.innerText = "Tối đa 100 kí tự!";
		checkTieuDe = false;
		btnSubmit.setAttribute("disabled", true);
	} else {
		errTieuDe.innerText = "";
		checkTieuDe = true;
		check();
	}
});
console.log(document.getElementById('multiSelect'))

var errChuDe = document.getElementById("errChuDe");
$('#multiSelect').on('select2:select', function(e) {
	errChuDe.innerText = "";
	checkChuDe = true;
})

$('#multiSelect').on('select2:unselect', function(e) {
	if (document.getElementById('multiSelect').selectedOptions.length < 1) {
		errChuDe.innerText = "Chọn ít nhất 1 chủ đề";
		checkChuDe = false;
		btnSubmit.setAttribute("disabled", true);
	} else {
		errChuDe.innerText = "";
		checkChuDe = true;
		check()
	}
});

var errChiTiet = document.getElementById("errChiTiet");
$('#summernote1').on('summernote.change', function(event, contents, $editable) {
	if (convertToMarkdown(contents).length < 20) {
		errChiTiet.innerText = "Tối thiểu 20 kí tự";
		checkDetail = false;
		btnSubmit.setAttribute("disabled", true);
	} else {
		errChiTiet.innerText = "";
		checkDetail = true;
		check()
	}
})

function check() {
	if (checkChuDe && checkTieuDe && checkDetail) {
		btnSubmit.removeAttribute('disabled');
	}
}

check();
