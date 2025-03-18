var codeInput = {
    observedAttributes: ["value", "placeholder", "language", "lang", "template"],
    textareaSyncAttributes: [
        "value",
        "min",
        "max",
        "type",
        "pattern",
        "autocomplete",
        "autocorrect",
        "autofocus",
        "cols",
        "dirname",
        "disabled",
        "form",
        "maxlength",
        "minlength",
        "name",
        "placeholder",
        "readonly",
        "required",
        "rows",
        "spellcheck",
        "wrap",
    ],
    textareaSyncEvents: ["change", "selectionchange", "invalid", "input"],
    usedTemplates: {},
    defaultTemplate: void 0,
    templateNotYetRegisteredQueue: {},
    registerTemplate: function (a, b) {
        if (!("string" == typeof a || a instanceof String)) throw TypeError(`code-input: Name of template "${a}" must be a string.`);
        if (!("function" == typeof b.highlight || b.highlight instanceof Function))
            throw TypeError(
                `code-input: Template for "${a}" invalid, because the highlight function provided is not a function; it is "${b.highlight}". Please make sure you use one of the constructors in codeInput.templates, and that you provide the correct arguments.`
            );
        if (!("boolean" == typeof b.includeCodeInputInHighlightFunc || b.includeCodeInputInHighlightFunc instanceof Boolean))
            throw TypeError(
                `code-input: Template for "${a}" invalid, because the includeCodeInputInHighlightFunc value provided is not a true or false; it is "${b.includeCodeInputInHighlightFunc}". Please make sure you use one of the constructors in codeInput.templates, and that you provide the correct arguments.`
            );
        if (!("boolean" == typeof b.preElementStyled || b.preElementStyled instanceof Boolean))
            throw TypeError(
                `code-input: Template for "${a}" invalid, because the preElementStyled value provided is not a true or false; it is "${b.preElementStyled}". Please make sure you use one of the constructors in codeInput.templates, and that you provide the correct arguments.`
            );
        if (!("boolean" == typeof b.isCode || b.isCode instanceof Boolean))
            throw TypeError(
                `code-input: Template for "${a}" invalid, because the isCode value provided is not a true or false; it is "${b.isCode}". Please make sure you use one of the constructors in codeInput.templates, and that you provide the correct arguments.`
            );
        if (!Array.isArray(b.plugins))
            throw TypeError(
                `code-input: Template for "${a}" invalid, because the plugin array provided is not an array; it is "${b.plugins}". Please make sure you use one of the constructors in codeInput.templates, and that you provide the correct arguments.`
            );
        if (
            (b.plugins.forEach((c, d) => {
                if (!(c instanceof codeInput.Plugin))
                    throw TypeError(
                        `code-input: Template for "${a}" invalid, because the plugin provided at index ${d} is not valid; it is "${b.plugins[d]}". Please make sure you use one of the constructors in codeInput.templates, and that you provide the correct arguments.`
                    );
            }),
            (codeInput.usedTemplates[a] = b),
            a in codeInput.templateNotYetRegisteredQueue)
        ) {
            for (let c in codeInput.templateNotYetRegisteredQueue[a])
                (elem = codeInput.templateNotYetRegisteredQueue[a][c]),
                    (elem.template = b),
                    codeInput.runOnceWindowLoaded(
                        function (a) {
                            a.connectedCallback();
                        }.bind(null, elem),
                        elem
                    );
            console.log(`code-input: template: Added existing elements with template ${a}`);
        }
        if (null == codeInput.defaultTemplate) {
            if (((codeInput.defaultTemplate = a), void 0 in codeInput.templateNotYetRegisteredQueue))
                for (let a in codeInput.templateNotYetRegisteredQueue[void 0])
                    (elem = codeInput.templateNotYetRegisteredQueue[void 0][a]),
                        (elem.template = b),
                        codeInput.runOnceWindowLoaded(
                            function (a) {
                                a.connectedCallback();
                            }.bind(null, elem),
                            elem
                        );
            console.log(`code-input: template: Set template ${a} as default`);
        }
        console.log(`code-input: template: Created template ${a}`);
    },
    Template: class {
        constructor(a = function () {}, b = !0, c = !0, d = !1, e = []) {
            (this.highlight = a), (this.preElementStyled = b), (this.isCode = c), (this.includeCodeInputInHighlightFunc = d), (this.plugins = e);
        }
        highlight = function () {};
        preElementStyled = !0;
        isCode = !0;
        includeCodeInputInHighlightFunc = !1;
        plugins = [];
    },
    templates: {
        prism(a, b = []) {
            return new codeInput.Template(a.highlightElement, !0, !0, !1, b);
        },
        hljs(a, b = []) {
            return new codeInput.Template(
                function (b) {
                    b.removeAttribute("data-highlighted"), a.highlightElement(b);
                },
                !1,
                !0,
                !1,
                b
            );
        },
        characterLimit(a) {
            return {
                highlight: function (a, b, c = []) {
                    let d = +b.getAttribute("data-character-limit"),
                        e = b.escapeHtml(b.value.slice(0, d)),
                        f = b.escapeHtml(b.value.slice(d));
                    (a.innerHTML = `${e}<mark class="overflow">${f}</mark>`), 0 < f.length && (a.innerHTML += ` <mark class="overflow-msg">${b.getAttribute("data-overflow-msg") || "(Character limit reached)"}</mark>`);
                },
                includeCodeInputInHighlightFunc: !0,
                preElementStyled: !0,
                isCode: !1,
                plugins: a,
            };
        },
        rainbowText(a = ["red", "orangered", "orange", "goldenrod", "gold", "green", "darkgreen", "navy", "blue", "magenta"], b = "", c = []) {
            return {
                highlight: function (a, b) {
                    let c = [],
                        d = b.value.split(b.template.delimiter);
                    for (let e = 0; e < d.length; e++) c.push(`<span style="color: ${b.template.rainbowColors[e % b.template.rainbowColors.length]}">${b.escapeHtml(d[e])}</span>`);
                    a.innerHTML = c.join(b.template.delimiter);
                },
                includeCodeInputInHighlightFunc: !0,
                preElementStyled: !0,
                isCode: !1,
                rainbowColors: a,
                delimiter: b,
                plugins: c,
            };
        },
        character_limit() {
            return this.characterLimit([]);
        },
        rainbow_text(a = ["red", "orangered", "orange", "goldenrod", "gold", "green", "darkgreen", "navy", "blue", "magenta"], b = "", c = []) {
            return this.rainbowText(a, b, c);
        },
        custom(a = function () {}, b = !0, c = !0, d = !1, e = []) {
            return { highlight: a, includeCodeInputInHighlightFunc: d, preElementStyled: b, isCode: c, plugins: e };
        },
    },
    plugins: new Proxy(
        {},
        {
            get(a, b) {
                if (a[b] == null)
                    throw ReferenceError(
                        `code-input: Plugin '${b}' is not defined. Please ensure you import the necessary files from the plugins folder in the WebCoder49/code-input repository, in the <head> of your HTML, before the plugin is instatiated.`
                    );
                return a[b];
            },
        }
    ),
    Plugin: class {
        constructor(a) {
            console.log("code-input: plugin: Created plugin"),
                a.forEach((a) => {
                    codeInput.observedAttributes.push(a);
                });
        }
        beforeHighlight() {}
        afterHighlight() {}
        beforeElementsAdded() {}
        afterElementsAdded() {}
        attributeChanged() {}
    },
    CodeInput: class extends HTMLElement {
        constructor() {
            super();
        }
        textareaElement = null;
        preElement = null;
        codeElement = null;
        dialogContainerElement = null;
        static formAssociated = !0;
        boundEventCallbacks = {};
        pluginEvt(a, b) {
            for (let c in this.template.plugins) {
                let d = this.template.plugins[c];
                a in d && (b === void 0 ? d[a](this) : d[a](this, ...b));
            }
        }
        needsHighlight = !1;
        handleEventsFromTextarea = !0;
        originalAriaDescription;
        scheduleHighlight() {
            this.needsHighlight = !0;
        }
        animateFrame() {
            this.needsHighlight && (this.update(), (this.needsHighlight = !1)), window.requestAnimationFrame(this.animateFrame.bind(this));
        }
        update() {
            let a = this.codeElement,
                b = this.value;
            (b += "\n"),
                (a.innerHTML = this.escapeHtml(b)),
                this.pluginEvt("beforeHighlight"),
                this.template.includeCodeInputInHighlightFunc ? this.template.highlight(a, this) : this.template.highlight(a),
                this.syncSize(),
                this.textareaElement === document.activeElement && ((this.handleEventsFromTextarea = !1), this.textareaElement.blur(), this.textareaElement.focus(), (this.handleEventsFromTextarea = !0)),
                this.pluginEvt("afterHighlight");
        }
        syncSize() {
            // this.template.preElementStyled
            //     ? ((this.style.backgroundColor = getComputedStyle(this.preElement).backgroundColor),
            //       (this.textareaElement.style.height = getComputedStyle(this.preElement).height),
            //       (this.textareaElement.style.width = getComputedStyle(this.preElement).width))
            //     : 
                ((this.style.backgroundColor = getComputedStyle(this.codeElement).backgroundColor),
                  (this.textareaElement.style.height = '100%'),
                  (this.textareaElement.style.width = '100%'));
        }
        setKeyboardNavInstructions(a, b) {
            (this.dialogContainerElement.querySelector(".code-input_keyboard-navigation-instructions").innerText = a),
                b ? this.textareaElement.setAttribute("aria-description", this.originalAriaDescription + ". " + a) : this.textareaElement.setAttribute("aria-description", a);
        }
        escapeHtml(a) {
            return a.replace(/&/g, "&amp;").replace(/</g, "&lt;");
        }
        unescapeHtml(a) {
            return a.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
        }
        getTemplate() {
            let a;
            return (
                (a = null == this.getAttribute("template") ? codeInput.defaultTemplate : this.getAttribute("template")),
                a in codeInput.usedTemplates ? codeInput.usedTemplates[a] : (a in codeInput.templateNotYetRegisteredQueue || (codeInput.templateNotYetRegisteredQueue[a] = []), void codeInput.templateNotYetRegisteredQueue[a].push(this))
            );
        }
        setup() {
            if (null != this.textareaElement) return;
            this.classList.add("code-input_registered"), this.template.preElementStyled && this.classList.add("code-input_pre-element-styled"), this.pluginEvt("beforeElementsAdded");
            let a = this.getAttribute("language") || this.getAttribute("lang"),
                b = this.getAttribute("placeholder") || this.getAttribute("language") || this.getAttribute("lang") || "",
                c = this.unescapeHtml(this.innerHTML) || this.getAttribute("value") || "";
            this.initialValue = c;
            let d = document.createElement("textarea");
            (d.placeholder = b),
                "" != c && (d.value = c),
                (d.innerHTML = this.innerHTML),
                d.setAttribute("spellcheck", "false"),
                d.setAttribute("tabindex", this.getAttribute("tabindex") || 0),
                this.setAttribute("tabindex", -1),
                (this.originalAriaDescription = this.getAttribute("aria-description") || "Code input field"),
                this.addEventListener("mousedown", () => {
                    this.classList.add("code-input_mouse-focused");
                }),
                d.addEventListener("blur", () => {
                    this.handleEventsFromTextarea && this.classList.remove("code-input_mouse-focused");
                }),
                (this.innerHTML = "");
            for (let a, b = 0; b < this.attributes.length; b++) (a = this.attributes[b].name), (codeInput.textareaSyncAttributes.includes(a) || "aria-" == a.substring(0, 5)) && d.setAttribute(a, this.getAttribute(a));
            d.addEventListener("input", () => {
                this.value = this.textareaElement.value;
            }),
                (this.textareaElement = d),
                this.append(d);
            let e = document.createElement("code"),
                f = document.createElement("pre");
            f.setAttribute("aria-hidden", "true"),
                f.setAttribute("tabindex", "-1"),
                f.setAttribute("inert", !0),
                (this.preElement = f),
                (this.codeElement = e),
                f.append(e),
                this.append(f),
                this.template.isCode && a != null && "" != a && e.classList.add("language-" + a.toLowerCase());
            let g = document.createElement("div");
            g.classList.add("code-input_dialog-container"), this.append(g), (this.dialogContainerElement = g);
            let h = document.createElement("div");
            h.classList.add("code-input_keyboard-navigation-instructions"), g.append(h), this.pluginEvt("afterElementsAdded"), this.dispatchEvent(new CustomEvent("code-input_load")), (this.value = c), this.animateFrame();
            const i = new ResizeObserver(() => {
                this.syncSize();
            });
            i.observe(this);
        }
        escape_html(a) {
            return this.escapeHtml(a);
        }
        get_template() {
            return this.getTemplate();
        }
        connectedCallback() {
            (this.template = this.getTemplate()),
                this.template != null &&
                    (this.classList.add("code-input_registered"),
                    codeInput.runOnceWindowLoaded(() => {
                        this.setup(), this.classList.add("code-input_loaded");
                    }, this)),
                (this.mutationObserver = new MutationObserver(this.mutationObserverCallback.bind(this))),
                this.mutationObserver.observe(this, { attributes: !0, attributeOldValue: !0 });
        }
        mutationObserverCallback(a) {
            for (const b of a)
                if ("attributes" === b.type) {
                    for (let a = 0; a < codeInput.observedAttributes.length; a++)
                        if (b.attributeName == codeInput.observedAttributes[a]) return this.attributeChangedCallback(b.attributeName, b.oldValue, super.getAttribute(b.attributeName));
                    if ("aria-" == b.attributeName.substring(0, 5)) return this.attributeChangedCallback(b.attributeName, b.oldValue, super.getAttribute(b.attributeName));
                }
        }
        disconnectedCallback() {
            this.mutationObserver.disconnect();
        }
        attributeChangedCallback(a, b, c) {
            if (this.isConnected)
                switch ((this.pluginEvt("attributeChanged", [a, b, c]), a)) {
                    case "value":
                        this.value = c;
                        break;
                    case "template":
                        (this.template = codeInput.usedTemplates[c || codeInput.defaultTemplate]),
                            this.template.preElementStyled ? this.classList.add("code-input_pre-element-styled") : this.classList.remove("code-input_pre-element-styled"),
                            this.scheduleHighlight();
                        break;
                    case "lang":
                    case "language":
                        let d = this.codeElement,
                            e = this.textareaElement;
                        if (null != c && ((c = c.toLowerCase()), d.classList.contains(`language-${c}`))) break;
                        null !== b && ((b = b.toLowerCase()), d.classList.remove("language-" + b), d.parentElement.classList.remove("language-" + b)),
                            d.classList.remove("language-none"),
                            d.parentElement.classList.remove("language-none"),
                            null != c && "" != c && d.classList.add("language-" + c),
                            e.placeholder == b && (e.placeholder = c),
                            this.scheduleHighlight();
                        break;
                    default:
                        codeInput.textareaSyncAttributes.includes(a) || "aria-" == a.substring(0, 5)
                            ? null == c || null == c
                                ? this.textareaElement.removeAttribute(a)
                                : this.textareaElement.setAttribute(a, c)
                            : codeInput.textareaSyncAttributes.regexp.forEach((b) => {
                                  a.match(b) && (null == c ? this.textareaElement.removeAttribute(a) : this.textareaElement.setAttribute(a, c));
                              });
                }
        }
        addEventListener(a, b, c = void 0) {
            let d = function (a) {
                "function" == typeof b ? b(a) : b && b.handleEvent && b.handleEvent(a);
            }.bind(this);
            if (((this.boundEventCallbacks[b] = d), codeInput.textareaSyncEvents.includes(a))) {
                let e = function (a) {
                    this.handleEventsFromTextarea && d(a);
                }.bind(this);
                (this.boundEventCallbacks[b] = e),
                    void 0 === c
                        ? null == this.textareaElement
                            ? this.addEventListener("code-input_load", () => {
                                  this.textareaElement.addEventListener(a, d);
                              })
                            : this.textareaElement.addEventListener(a, e)
                        : null == this.textareaElement
                        ? this.addEventListener("code-input_load", () => {
                              this.textareaElement.addEventListener(a, d, c);
                          })
                        : this.textareaElement.addEventListener(a, e, c);
            } else void 0 === c ? super.addEventListener(a, d) : super.addEventListener(a, d, c);
        }
        removeEventListener(a, b, c = void 0) {
            let d = this.boundEventCallbacks[b];
            codeInput.textareaSyncEvents.includes(a)
                ? c === void 0
                    ? null == this.textareaElement
                        ? this.addEventListener("code-input_load", () => {
                              this.textareaElement.removeEventListener(a, d);
                          })
                        : this.textareaElement.removeEventListener(a, d)
                    : null == this.textareaElement
                    ? this.addEventListener("code-input_load", () => {
                          this.textareaElement.removeEventListener(a, d, c);
                      })
                    : this.textareaElement.removeEventListener(a, d, c)
                : c === void 0
                ? super.removeEventListener(a, d)
                : super.removeEventListener(a, d, c);
        }
        get value() {
            return this.textareaElement.value;
        }
        set value(a) {
            return (null === a || void 0 === a) && (a = ""), (this.textareaElement.value = a), this.scheduleHighlight(), a;
        }
        get placeholder() {
            return this.getAttribute("placeholder");
        }
        set placeholder(a) {
            return this.setAttribute("placeholder", a);
        }
        get validity() {
            return this.textareaElement.validity;
        }
        get validationMessage() {
            return this.textareaElement.validationMessage;
        }
        setCustomValidity(a) {
            return this.textareaElement.setCustomValidity(a);
        }
        checkValidity() {
            return this.textareaElement.checkValidity();
        }
        reportValidity() {
            return this.textareaElement.reportValidity();
        }
        pluginData = {};
        formResetCallback() {
            this.value = this.initialValue;
        }
    },
    runOnceWindowLoaded(a) {
        "complete" == document.readyState ? a() : window.addEventListener("load", a);
    },
};
customElements.define("code-input", codeInput.CodeInput);
