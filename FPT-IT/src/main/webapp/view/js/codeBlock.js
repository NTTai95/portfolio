var isHasText = false;
var isEdit = false;

codeInput.registerTemplate("syntax-highlighted",
	codeInput.templates.hljs(
		hljs,
		[
			new codeInput.plugins.Indent(true, 2)
		]
	)
);

function addEdit(id, idSN, idLG) {
	var el = document.getElementById(id);
	var texteara = el.getElementsByTagName('textarea')[0];
	var pre = el.getElementsByTagName("pre")[0];
	var code = pre.getElementsByTagName("code")[0];
	console.log(el.parentElement)
	texteara.addEventListener('focus', function() {
		$('#' + idSN).summernote('disable');
		summernoteEnabled = false;
	});

	texteara.addEventListener('blur', function() {
		if (!summernoteEnabled) {
			$('#' + idSN).summernote('enable');
			$('.note-btn[data-original-title="Edit"]').attr('disabled', true);
			summernoteEnabled = true;
		}
	});

	texteara.addEventListener('change', function() {
		checkLanguageDetection(code, idLG)
	});
}

var idCodeBlock = 1;
var idLanguge = 1;

$.extend($.summernote.plugins, {
	'codeBlock': function(context) {
		var ui = $.summernote.ui;

		// Tạo nút codeBlock
		context.memo('button.codeBlock', function() {
			var idSummerNote = context.layoutInfo.note[0].id;

			var button = ui.button({
				contents: '<svg style="width: 24px" viewBox="0 0 640 512"><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>',
				tooltip: 'Insert Code Block',
				click: function() {
					var selectedText = window.getSelection().toString();

					var code = '<div class="d-flex flex-column bg-secondary-subtle pt-2 pb-1 rounded"><p id="lauguge-' + idLanguge + '" class="align-self-end m-0 me-2">Ngon Ngu</p><code-input id="code-' + idCodeBlock + '" template="syntax-highlighted">' + selectedText + '</code-input></div><p><br/></p>';
					context.invoke('editor.pasteHTML', code);
					addEdit('code-' + idCodeBlock, idSummerNote, 'lauguge-' + idLanguge);

					$('pre code').each(function(i, block) {
						hljs.highlightElement(block);
					});
					idCodeBlock++;
					idLanguge++;
				}
			});
			return button.render();
		});

		// Tạo nút markDown
		context.memo('button.markdown', function() {
			var idSummerNote = context.layoutInfo.note[0].id;
			var button = ui.button({
				contents: '<svg style="width:30px;" viewBox="0 0 640 512"><path d="M593.8 59.1H46.2C20.7 59.1 0 79.8 0 105.2v301.5c0 25.5 20.7 46.2 46.2 46.2h547.7c25.5 0 46.2-20.7 46.1-46.1V105.2c0-25.4-20.7-46.1-46.2-46.1zM338.5 360.6H277v-120l-61.5 76.9-61.5-76.9v120H92.3V151.4h61.5l61.5 76.9 61.5-76.9h61.5v209.2zm135.3 3.1L381.5 256H443V151.4h61.5V256H566z"/></svg>',
				tooltip: 'MarkDown',
				click: function() {

					var content = $('#' + idSummerNote).summernote('code');
					var markdownContent = convertToMarkdown(content)
					$('#' + idSummerNote).summernote('reset');
					console.log(markdownContent)
					context.invoke('editor.pasteHTML', markdownContent);
					console.log(context);
					$('#btn-edit-' + idSummerNote).removeAttr("disabled");
					$('#btn-markdown-' + idSummerNote).attr('disabled', true);
					isEdit = true;
				}
			});
			var btnRender = button.render();
			btnRender.get(0).id = 'btn-markdown-' + idSummerNote;
			return btnRender;
		});

		// Tạo nút edit
		context.memo('button.edit', function() {
			var idSummerNote = context.layoutInfo.note[0].id;
			var button = ui.button({
				contents: '<svg style="width:20px;" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/></svg>',
				tooltip: 'Edit',
				click: function() {

					var content = $('#' + idSummerNote).summernote('code');
					// convertToHtml(markdownContent)

					var html = convertToHtml(content, idSummerNote);
					console.log(html)
					$('#' + idSummerNote).summernote('reset');

					context.invoke('editor.pasteHTML', html);
					$('#btn-markdown-' + idSummerNote).removeAttr("disabled");
					$('#btn-edit-' + idSummerNote).attr('disabled', true);
					isEdit = false;
				}
			});
			var btnRender = button.render();
			btnRender.get(0).id = 'btn-edit-' + idSummerNote;
			return btnRender;
		});
	}
});


// Hàm kiểm tra ngôn ngữ của Highlight.js
function checkLanguageDetection(code, id) {
	const result = hljs.highlightAuto(code.innerText);
	const message = result.language
		? result.language
		: "plaintext";

	// Kiểm tra phần tử trước khi thay đổi nội dung
	const resultElement = document.getElementById(id);
	if (resultElement) {
		resultElement.innerText = message;
		result.language ? $(code).attr("class", "hljs language-" + result.language) : $(code).attr("class", "hljs language-plaintext");
	} else {
		console.error("Không tìm thấy phần tử hiển thị kết quả.");
	}

	return result.language ? true : false;
}

// Khởi tạo Summernote với cấu hình tùy chọn
$(document).ready(function() {
	$('#summernote1').summernote({
		height: 300,
		toolbar: [
			['font', ['bold', 'italic', 'ul', 'ol', 'link', 'codeBlock', 'markdown', 'edit']]
		],
		callbacks: {
			onChange: function(contents) {
				setTimeout(() => {
					if (contents === '<p><br></p>') {
						$('#btn-markdown-summernote1').attr("disabled", true);
					} else {
						$('#btn-markdown-summernote1').removeAttr("disabled");
					}
				}, 100);
			}
		}
	});

	$('#btn-edit-summernote1').attr('disabled', true);
	$('#btn-markdown-summernote1').attr("disabled", true);

	let inputQuestionEdit = document.getElementById("edit-question");
	if (inputQuestionEdit != null) {

		let HTML = convertToHtml3(inputQuestionEdit.value, 'summernote1');
		$('#summernote1').summernote('code', '');
		$('#summernote1').summernote('pasteHTML', HTML);

		/*let currentContent = $('#summernote1').summernote("code");

		currentContent = currentContent.replace(/<p><br><\/p>/g, "");
		currentContent = currentContent.replace(/<p>\n<br><\/p>/g, "");
		console.log(currentContent)

		$('#summernote1').summernote('code', currentContent);*/

		inputQuestionEdit.remove();
	}
});