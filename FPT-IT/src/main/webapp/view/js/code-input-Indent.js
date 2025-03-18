codeInput.plugins.Indent = class extends codeInput.Plugin {
    bracketPairs = {};
    indentation = "\t";
    indentationNumChars = 1;
    tabIndentationEnabled = !0;
    escTabToChangeFocus = !0;
    escJustPressed = !1;
    constructor(a = !1, b = 4, c = { "(": ")", "[": "]", "{": "}" }, d = !0) {
        if ((super([]), (this.bracketPairs = c), a)) {
            this.indentation = "";
            for (let a = 0; a < b; a++) this.indentation += " ";
            this.indentationNumChars = b;
        }
        this.escTabToChangeFocus = !0;
    }
    disableTabIndentation() {
        this.tabIndentationEnabled = !1;
    }
    enableTabIndentation() {
        this.tabIndentationEnabled = !0;
    }
    afterElementsAdded(a) {
        let b = a.textareaElement;
            b.addEventListener("keydown", (b) => {
                this.checkTab(a, b), this.checkEnter(a, b), this.checkBackspace(a, b);
            }),
            b.addEventListener("beforeinput", (b) => {
                this.checkCloseBracket(a, b);
            });
        let c = document.createElement("pre");
        c.setAttribute("aria-hidden", "true");
        let d = document.createElement("span");
        if (a.template.preElementStyled) c.appendChild(d), c.classList.add("code-input_autocomplete_test-indentation-width"), a.appendChild(c);
        else {
            let b = document.createElement("code");
            b.appendChild(d), b.classList.add("code-input_autocomplete_test-indentation-width"), c.appendChild(b), a.appendChild(c);
        }
        d.innerHTML = a.escapeHtml(this.indentation);
        let e = d.offsetWidth;
        a.removeChild(c), (a.pluginData.indent = { indentationWidthPx: e });
    }
    checkTab(a, b) {
        var c = Math.max;
        if (this.tabIndentationEnabled) {
            if (this.escTabToChangeFocus) {
                if ("Escape" == b.key) return (this.escJustPressed = !0), void a.setKeyboardNavInstructions("Tab and Shift-Tab currently for keyboard navigation. Type to return to indentation.", !1);
                if ("Tab" != b.key) return "Shift" == b.key ? void 0 : (a.setKeyboardNavInstructions("Tab and Shift-Tab currently for indentation. Press Esc to enable keyboard navigation.", !1), void (this.escJustPressed = !1));
                if (!this.enableTabIndentation || this.escJustPressed) return a.setKeyboardNavInstructions("", !1), void (this.escJustPressed = !1);
            } else if ("Tab" != b.key) return;
            let d = a.textareaElement;
            if ((b.preventDefault(), !b.shiftKey && d.selectionStart == d.selectionEnd)) document.execCommand("insertText", !1, this.indentation);
            else {
                let e = d.value.split("\n"),
                    f = 0,
                    g = d.selectionStart,
                    h = d.selectionEnd;
                for (let a = 0; a < e.length; a++)
                    ((g <= f + e[a].length && h >= f + 1) || (g == h && g <= f + e[a].length + 1 && h >= f)) &&
                        (b.shiftKey
                            ? e[a].substring(0, this.indentationNumChars) == this.indentation &&
                              ((d.selectionStart = f),
                              (d.selectionEnd = f + this.indentationNumChars),
                              document.execCommand("delete", !1, ""),
                              g > f && (g = c(g - this.indentationNumChars, f)),
                              (h -= this.indentationNumChars),
                              (f -= this.indentationNumChars))
                            : ((d.selectionStart = f),
                              (d.selectionEnd = f),
                              document.execCommand("insertText", !1, this.indentation),
                              g > f && (g += this.indentationNumChars),
                              (h += this.indentationNumChars),
                              (f += this.indentationNumChars))),
                        (f += e[a].length + 1);
                (d.selectionStart = g), (d.selectionEnd = h), b.shiftKey ? a.scrollBy(-a.pluginData.indent.indentationWidthPx, 0) : a.scrollBy(a.pluginData.indent.indentationWidthPx, 0);
            }
            a.value = d.value;
        }
    }
    checkEnter(a, b) {
        if ("Enter" != b.key) return;
        b.preventDefault();
        let c = a.textareaElement,
            d = c.value.split("\n"),
            e = 0,
            f = d.length - 1,
            g = "",
            h = 0;
        for (let g = 0; g < d.length; g++)
            if (((e += d[g].length + 1), c.selectionEnd <= e)) {
                f = g;
                break;
            }
        let j = d[f].length - (e - c.selectionEnd) + 1;
        for (let c = 0; c < j && d[f].substring(c, c + this.indentationNumChars) == this.indentation; c += this.indentationNumChars) h++;
        let k = "";
        j != d[f].length && ((k = d[f].substring(j)), (d[f] = d[f].substring(0, j)));
        let l = !1,
            m = "";
        if (null != this.bracketPairs)
            for (let a in this.bracketPairs)
                if (d[f][d[f].length - 1] == a) {
                    let b = this.bracketPairs[a];
                    if (0 < k.length && k[0] == b) {
                        l = !0;
                        for (let a = 0; a < h + 1; a++) m += this.indentation;
                    } else h++;
                    break;
                } else {
                    let b = this.bracketPairs[a];
                    if (0 < k.length && k[0] == b) {
                        h--;
                        break;
                    }
                }
        for (let c = 0; c < h; c++) g += this.indentation;
        let n = c.selectionStart;
        l && (document.execCommand("insertText", !1, "\n" + m), (h += 1)), document.execCommand("insertText", !1, "\n" + g), (c.selectionStart = n + h * this.indentationNumChars + 1), (c.selectionEnd = c.selectionStart);
        let o = +getComputedStyle(c).paddingTop.replace("px", ""),
            p = +getComputedStyle(c).lineHeight.replace("px", ""),
            q = +getComputedStyle(a).height.replace("px", "");
        f * p + 2 * p + o >= c.scrollTop + q && a.scrollBy(0, +getComputedStyle(c).lineHeight.replace("px", "")), (a.value = c.value);
    }
    checkBackspace(a, b) {
        if ("Backspace" == b.key && 1 != this.indentationNumChars) {
            let c = a.textareaElement;
            c.selectionStart == c.selectionEnd &&
                a.value.substring(c.selectionStart - this.indentationNumChars, c.selectionStart) == this.indentation &&
                ((c.selectionStart -= this.indentationNumChars), b.preventDefault(), document.execCommand("delete", !1, ""));
        }
    }
    checkCloseBracket(a, b) {
        if (a.textareaElement.selectionStart == a.textareaElement.selectionEnd)
            for (let c in this.bracketPairs) {
                let d = this.bracketPairs[c];
                b.data == d &&
                    a.value.substring(a.textareaElement.selectionStart - this.indentationNumChars, a.textareaElement.selectionStart) == this.indentation &&
                    ((a.textareaElement.selectionStart -= this.indentationNumChars), document.execCommand("delete", !1, ""));
            }
    }
};
