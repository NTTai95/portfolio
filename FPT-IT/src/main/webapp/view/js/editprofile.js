$(document).ready(function() {
	// Khởi tạo Summernote
	$('#summernote1').summernote({
		height: 400,
		toolbar: [
			['font', ['bold', 'italic', 'ol', 'ul']]
		],
	});

	let showIntroduction = document.getElementById("show-introduction");
	if (showIntroduction != null) {
		const converter = new showdown.Converter();

		const markdownContent = showIntroduction.value;

		const htmlContent = converter.makeHtml(markdownContent);
		console.log(htmlContent)
		$('#summernote1').summernote('pasteHTML', htmlContent);
		let currentContent = $('#summernote1').summernote("code");

		currentContent = currentContent.replace(/<p><br><\/p>/g, "");
		currentContent = currentContent.replace(/<p>\n<br><\/p>/g, "");
		console.log(currentContent)

		$('#summernote1').summernote('code', currentContent);

	}
});

function scollToBtn(id) {
	document.getElementById(id).scrollIntoView({
		behavior: "smooth",
		block: "start"
	});
}
