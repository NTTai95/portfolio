
var htmltest = `<p>code</p><p><br></p><div class="d-flex flex-column bg-secondary-subtle pt-2 pb-1 rounded"><p id="lauguge-1" class="align-self-end m-0 me-2">csharp</p><code-input id="code-1" template="syntax-highlighted" class="code-input_registered code-input_loaded" tabindex="-1" style="background-color: rgb(255, 255, 255);"><grammarly-extension data-grammarly-shadow-root="true" style="position: absolute; top: 0px; left: 0px; pointer-events: none;" class="dnXmp"></grammarly-extension><grammarly-extension data-grammarly-shadow-root="true" style="position: absolute; top: 0px; left: 0px; pointer-events: none;" class="dnXmp"></grammarly-extension><textarea placeholder="" spellcheck="false" tabindex="0" style="height: 100%; width: 100%;" aria-description="Code input field. Tab and Shift-Tab currently for indentation. Press Esc to enable keyboard navigation."></textarea><pre aria-hidden="true" tabindex="-1" inert="true"><code class="hljs language-csharp"><span class="hljs-function">function <span class="hljs-title">a</span>()</span>{
  <span class="hljs-keyword">let</span> a;
}
</code></pre><div class="code-input_dialog-container"><div class="code-input_keyboard-navigation-instructions">Tab and Shift-Tab currently for indentation. Press Esc to enable keyboard navigation.</div></div></code-input></div>`

const converter = new showdown.Converter();

// Hàm chuyển đổi HTML sang Markdown với các đoạn code
/*function convertToMarkdown(html) {
	console.log(html);
	const container = document.createElement("div");
	container.innerHTML = html;

	const preElements = container.querySelectorAll("pre");
	const codeElements = container.querySelectorAll("code");

	codeElements.forEach(element => {
		const newElement = document.createElement("p");
		newElement.innerHTML = element.innerHTML;
		element.replaceWith(newElement);
	});

	preElements.forEach(element => {
		const newElement = document.createElement("p");
		newElement.innerHTML = element.innerHTML;

		element.replaceWith(newElement);
	});
	container.querySelectorAll('code-input').forEach(tags => {
		tags.querySelector('div:last-child').remove()
	});

	const languageParagraphs = container.querySelectorAll("p[id^='lauguge-']");
	languageParagraphs.forEach(paragraph => {

		const languageContent = paragraph.innerText.trim();

		const markdownContent = `\`\`\`${languageContent}`;

		const newParagraph = document.createElement("span");
		newParagraph.innerText = markdownContent;

		paragraph.replaceWith(newParagraph);
	});

	const links = container.querySelectorAll("a");
	links.forEach(link => {
		link.outerHTML = `[${converter.makeMarkdown(link.innerHTML)}](${link.href})`;
	})

	const allElements = container.querySelectorAll("*");
	allElements.forEach(element => {
		Array.from(element.attributes).forEach(attr => element.removeAttribute(attr.name));
	});

	container.querySelectorAll('grammarly-extension').forEach(element => element.remove());
	container.querySelectorAll('textarea').forEach(element => element.remove());
	container.querySelectorAll('br').forEach(element => element.remove());

	var spans = container.querySelectorAll("span");

	spans.forEach(span => {
		const p = document.createElement('p');

		p.innerHTML = span.innerHTML;

		span.parentNode.replaceChild(p, span);
	});

	var pTags = container.querySelectorAll("p");

	pTags.forEach(p => {
		if (!p.textContent.trim()) {
			p.remove();
		}
	});

	pTags.forEach(p => {
		if (p.parentElement === container) {
			var ptwo = p.querySelectorAll('p');
			if (ptwo.length > 1) {
				const newP = document.createElement('p');
				ptwo.forEach(p2 => {
					newP.innerHTML += p2.innerHTML;
				})
				p.replaceWith(newP)
			}
		}
	});

	pTags.forEach(p => {
		if (p.parentElement === container) {
			const nestedP = p.querySelector('p');

			if (nestedP && nestedP.parentElement === p) {
				p.innerHTML = p.innerText;
			}
		}
	})

	const codeInputs = container.querySelectorAll("div:has(code-input)");
	codeInputs.forEach(code => {
		var codeInput = code.querySelector("code-input")
		const textContent = codeInput.textContent.trim();
		var lg = code.querySelector('p');
		var pNew = document.createElement('p');
		var markdowncode = lg.innerText + "\n" + textContent + "\n```";
		pNew.innerHTML = markdowncode;
		code.replaceWith(pNew);
	})
	var markDown = converter.makeMarkdown(container.innerHTML).replace(/\\/g, "");
	let regex = /(\*{1,2})\[(.+?)\]\((https?:\/\/[^\s)]+)\)\1/g;

	// Thay thế `*noidung*` hoặc `**noidung**` bên trong `[]`
	markDown = markDown.replace(regex, (match, asterisk, content, link) => {
		return `[${asterisk}${content}${asterisk}](${link})`;
	});

	return markDown;
}*/

function convertToMarkdown(html) {
	console.log(html);

	const container = document.createElement("div");
	container.innerHTML = html;

	// Helper functions
	const replaceElementsWithTag = (selector, newTag) => {
		container.querySelectorAll(selector).forEach(element => {
			const newElement = document.createElement(newTag);
			newElement.innerHTML = element.innerHTML;
			element.replaceWith(newElement);
		});
	};

	const removeElements = (selector) => {
		container.querySelectorAll(selector).forEach(element => element.remove());
	};

	const removeAllAttributes = () => {
		container.querySelectorAll("*").forEach(element => {
			Array.from(element.attributes).forEach(attr => element.removeAttribute(attr.name));
		});
	};

	const convertLinksToMarkdown = () => {
		container.querySelectorAll("a").forEach(link => {
			link.outerHTML = `[${converter.makeMarkdown(link.innerHTML)}](${link.href})`;
		});
	};

	const processLanguageParagraphs = () => {
		container.querySelectorAll("p[id^='lauguge-']").forEach(paragraph => {
			const languageContent = paragraph.innerText.trim();
			const markdownContent = `\`\`\`${languageContent}`;
			const newParagraph = document.createElement("span");
			newParagraph.innerText = markdownContent;
			paragraph.replaceWith(newParagraph);
		});
	};

	const mergeNestedParagraphs = () => {
		container.querySelectorAll("p").forEach(p => {
			if (p.parentElement === container) {
				const nestedP = p.querySelector("p");
				if (nestedP) {
					p.innerHTML = p.innerText;
				}
			}
		});
	};

	const processCodeInputs = () => {
		container.querySelectorAll("div:has(code-input)").forEach(code => {
			const codeInput = code.querySelector("code-input");
			if (codeInput) {
				const textContent = codeInput.textContent.trim();
				const language = code.querySelector("p")?.innerText || "";
				const markdownCode = `${language}\n${textContent}\n\`\`\``;

				// Tạo phần tử mới chứa nội dung Markdown
				const newParagraph = document.createElement("p");
				newParagraph.innerHTML = markdownCode;

				// Thay thế phần tử gốc
				code.replaceWith(newParagraph);
			}
		});
	};


	// Process HTML
	replaceElementsWithTag("code", "p");
	replaceElementsWithTag("pre", "p");
	removeElements("code-input div:last-child");
	processLanguageParagraphs();
	convertLinksToMarkdown();
	removeAllAttributes();
	removeElements("grammarly-extension, textarea, br");
	replaceElementsWithTag("span", "p");
	removeElements("p:empty");
	mergeNestedParagraphs();
	processCodeInputs();

	// Convert container HTML to Markdown
	let markdown = converter.makeMarkdown(container.innerHTML).replace(/\\/g, "");
	const regex = /(\*{1,2})\[(.+?)\]\((https?:\/\/[^\s)]+)\)\1/g;

	markdown = markdown.replace(regex, (match, asterisk, content, link) => {
		return `[${asterisk}${content}${asterisk}](${link})`;
	});

	console.log(markdown)

	return markdown;
}


var idLanguge = 1;
var idCodeBlock = 1;

function convertToHtml(markDown, idSN) {
	console.log("MarkDown: " + markDown)
	var divMian = document.createElement('div');
	divMian.innerHTML = markDown;
	var html = converter.makeHtml(divMian.innerText);
	html = html.replace(/<code>/g, "```");
	html = html.replace(/<\/code>/g, "```");

	divMian.innerHTML = html;

	console.log(divMian)

	var Ptags = divMian.querySelectorAll('p');
	Ptags.forEach(p => {

		if (p.innerText.includes('```')) {
			// Lặp qua tất cả các cặp ``` trong p
			var codeText = p.innerText.replace(/```/g, '')
			codeText = codeText.substring(codeText.indexOf(' ') + 1);

			var code = '<p> <br/> </p><div class="d-flex flex-column bg-secondary-subtle pt-2 pb-1 rounded">' +
				'<p id="lauguge-' + idLanguge + '" class="align-self-end m-0 me-2">Textplant</p>' +
				'<code-input id="code-' + idCodeBlock + '" template="syntax-highlighted">' + formatCodeWithJsBeautify(codeText) + '</code-input>' +
				'</div><p> <br/> </p>';
			p.outerHTML = code;  // Thêm vào nội dung chính
			console.log("Div Main: " + divMian.innerHTML)

			addEdit2('code-' + idCodeBlock, idSN, 'lauguge-' + idLanguge);
			$('pre code').each(function(i, block) {
				hljs.highlightElement(block);
			});
			idCodeBlock++;
			idLanguge++;

		} else if (p.innerText.includes("[")) {
			// Xử lý các trường hợp khác nếu cần
		}
	});
	return divMian.innerHTML;
}

function addEdit2(id, idSN, idLG) {
	setTimeout(() => {
		var el = document.getElementById(id);
		console.log(el);
		var texteara = el.getElementsByTagName('textarea')[0];
		var pre = el.getElementsByTagName("pre")[0];
		var code = pre.getElementsByTagName("code")[0];
		checkLanguageDetection(code, idLG)
		console.log(el.parentElement)
		texteara.addEventListener('focus', function() {
			$('#' + idSN).summernote('disable');
			summernoteEnabled = false;
			isEdit = true;
		});

		texteara.addEventListener('blur', function() {
			if (!summernoteEnabled) {
				$('#' + idSN).summernote('enable');
				$('#btn-edit-' + idSN).attr('disabled', true);
				summernoteEnabled = true;
				isEdit = false;
			}
		});

		texteara.addEventListener('change', function() {
			checkLanguageDetection(code, idLG)
		});
	}, 200);
}

function formatCodeWithJsBeautify(code) {
	// Kiểm tra xem js-beautify có được tải lên chưa
	if (typeof js_beautify === 'undefined') {
		console.error('js-beautify is not loaded!');
		return;
	}

	// Định dạng mã nguồn sử dụng js-beautify
	const formattedCode = js_beautify(code, {
		indent_size: 2,   // Khoảng cách thụt lề
		space_in_empty_paren: true, // Thêm khoảng trắng trong dấu ngoặc trống
		max_preserve_newlines: 2    // Số dòng trống tối đa được giữ lại
	});

	return formattedCode;
}

function markdownToHTML(markDown) {
	console.log("MarkDown: " + markDown)
	var divMian = document.createElement('div');
	markDown = markDown.replace(/```(.*?)```/gs, "\n\n```$1```\n\n");
	divMian.innerHTML = markDown;
	var html = converter.makeHtml(divMian.innerText);
	html = html.replace(/<code>/g, "```");
	html = html.replace(/<\/code>/g, "```");

	divMian.innerHTML = html;

	var Ptags = divMian.querySelectorAll('p');
	Ptags.forEach(p => {

		if (p.innerText.includes('```')) {
			var codeText = p.innerText.replace(/```/g, '')
			codeText = codeText.substring(codeText.indexOf(' ') + 1);

			var code = '<div class="overflow-auto" style="max-height: 400px;"><code-input class="w-100 m-0" template="syntax-highlighted" disabled>' + formatCodeWithJsBeautify(codeText) + '</code-input></div>';


			p.outerHTML = code;  // Thêm vào nội dung chính
			console.log("Div Main: " + divMian.innerHTML)

		} else if (p.innerText.includes("[")) {
			// Xử lý các trường hợp khác nếu cần
		}
	});

	$('pre code').each(function(i, block) {
		hljs.highlightElement(block);
	});

	return divMian.innerHTML;
}


function convertToMarkdown2(html) {
	console.log(html);
	const container = document.createElement("div");
	container.innerHTML = html;
	// Helper functions
	const replaceElementsWithTag = (selector, newTag) => {
		container.querySelectorAll(selector).forEach(element => {
			const newElement = document.createElement(newTag);
			newElement.innerHTML = element.innerHTML;
			element.replaceWith(newElement);
		});
	};
	const removeElements = (selector) => {
		container.querySelectorAll(selector).forEach(element => element.remove());
	};
	const removeAllAttributes = () => {
		container.querySelectorAll("*").forEach(element => {
			Array.from(element.attributes).forEach(attr => element.removeAttribute(attr.name));
		});
	};
	const convertLinksToMarkdown = () => {
		container.querySelectorAll("a").forEach(link => {
			link.outerHTML = `[${converter.makeMarkdown(link.innerHTML)}](${link.href})`;
		});
	};

	const mergeNestedParagraphs = () => {
		container.querySelectorAll("p").forEach(p => {
			if (p.parentElement === container) {
				const nestedP = p.querySelector("p");
				if (nestedP) {
					p.innerHTML = p.innerText;
				}
			}
		});
	};

	const processCodeInputs = () => {
		container.querySelectorAll("div:has(code-input)").forEach(code => {
			const codeInput = code.querySelector("code-input");
			if (codeInput) {
				const textContent = codeInput.textContent.trim();
				const markdownCode = `\n\`\`\`${textContent}\n\`\`\``;

				// Tạo phần tử mới chứa nội dung Markdown
				const newParagraph = document.createElement("p");
				newParagraph.innerHTML = markdownCode;

				// Thay thế phần tử gốc
				code.replaceWith(newParagraph);
			}
		});
	};

	replaceElementsWithTag("code", "p");
	replaceElementsWithTag("pre", "p");
	removeElements("code-input div:last-child");
	convertLinksToMarkdown();
	removeAllAttributes();
	replaceElementsWithTag("span", "p");
	removeElements("p:empty");
	mergeNestedParagraphs();
	processCodeInputs();

	let markdown = converter.makeMarkdown(container.innerHTML).replace(/\\/g, "");
	const regex = /(\*{1,2})\[(.+?)\]\((https?:\/\/[^\s)]+)\)\1/g;

	markdown = markdown.replace(regex, (match, asterisk, content, link) => { return `[${asterisk}${content}${asterisk}](${link})`; });

	console.log(markdown)

	return markdown;
}

function convertToHtml2(markDown, idSN) {
	console.log("MarkDown: " + markDown)
	var divMian = document.createElement('div');
	divMian.innerHTML = markDown;
	var html = converter.makeHtml(divMian.innerText);
	html = html.replace(/<code>/g, "```");
	html = html.replace(/<\/code>/g, "```");

	divMian.innerHTML = html;

	console.log(divMian)

	var Ptags = divMian.querySelectorAll('p');
	Ptags.forEach(p => {

		if (p.innerText.includes('```')) {
			// Lặp qua tất cả các cặp ``` trong p
			var codeText = p.innerText.replace(/```/g, '')

			var code = '<p> <br/> </p><div class="d-flex flex-column bg-secondary-subtle pt-2 pb-1 rounded">' +
				'<p id="lauguge-' + idLanguge + '" class="align-self-end m-0 me-2">Textplant</p>' +
				'<code-input id="code-' + idCodeBlock + '" template="syntax-highlighted">' + formatCodeWithJsBeautify(codeText) + '</code-input>' +
				'</div><p> <br/> </p>';
			p.outerHTML = code;  // Thêm vào nội dung chính
			console.log("Div Main: " + divMian.innerHTML)

			addEdit2('code-' + idCodeBlock, idSN, 'lauguge-' + idLanguge);
			$('pre code').each(function(i, block) {
				hljs.highlightElement(block);
			});
			idCodeBlock++;
			idLanguge++;

		} else if (p.innerText.includes("[")) {
			// Xử lý các trường hợp khác nếu cần
		}
	});
	return divMian.innerHTML;
}

function convertToHtml3(markDown, idSN) {
	console.log("MarkDown: " + markDown)
	var divMian = document.createElement('div');
	divMian.innerHTML = markDown;
	var html = converter.makeHtml(divMian.innerText);
	html = html.replace(/<code>/g, "```");
	html = html.replace(/<\/code>/g, "```");

	divMian.innerHTML = html;

	console.log(divMian)


	const matches = divMian.innerHTML.match(/```(.*?)```/gs);
	console.log(matches)

	if (matches) {
		matches.forEach(match => {
			// Lặp qua tất cả các cặp ``` trong p
			var codeText = match.replace(/```/g, '');
			codeText = codeText.substring(codeText.indexOf(' ') + 1);

			var code = '<p> <br/> </p><div class="d-flex flex-column bg-secondary-subtle pt-2 pb-1 rounded">' +
				'<p id="lauguge-' + idLanguge + '" class="align-self-end m-0 me-2">Textplant</p>' +
				'<code-input id="code-' + idCodeBlock + '" template="syntax-highlighted">' + formatCodeWithJsBeautify(codeText) + '</code-input>' +
				'</div><p> <br/> </p>';

			console.log("Div Main: " + divMian.innerHTML)
			divMian.innerHTML = divMian.innerHTML.replace(match, code);
			addEdit2('code-' + idCodeBlock, idSN, 'lauguge-' + idLanguge);
			$('pre code').each(function(i, block) {
				hljs.highlightElement(block);
			});
			idCodeBlock++;
			idLanguge++;
		});
	}

	return divMian.innerHTML;
}