window.addEventListener("DOMContentLoaded", function() {
	let tagMarkDown = document.querySelectorAll(".showMarkDown");
	tagMarkDown.forEach(el => {
		showMarkDown(el, el.innerText);
		console.log(el);
	});
});

function showMarkDown(el, markdown) {
	el.innerHTML = markdownToHTML(markdown);
}





