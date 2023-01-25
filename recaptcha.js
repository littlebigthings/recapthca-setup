// class to add google recaptcha into webflow forms
class ADDRECAPTCHA {
    constructor(sitekey, callBacks) {
        this.callBackFunctionArry = callBacks || [];
        this.sitekey = sitekey;
        this.allForms = document.querySelectorAll("[data-wrapper='form']");
        this.init();
    }

    init() {
        this.checkSitekey();
    }

    // check the site key
    checkSitekey() {
        if (this.sitekey == null) {
            throw new Error("Sitekey Error:sitekey can not be null, please add the correct sitekey.");
        }
        else if (this.sitekey.length <= 0) {
            throw new Error("Sitekey Error:please add the sitekey.");
        }
        else if (typeof (this.sitekey) == "number") {
            throw new Error("Sitekey Error:sitekey can not be a number, please add the sitekey.");
        }
        else {
            this.addAttributesToForm();
        }
    }

    // activate recaptcha on form
    addCaptcha(form) {
        if (form == undefined) return;
        let submitCta = form.querySelector("input[type='submit']");
        if (submitCta != null) {
            submitCta.classList.add("g-recaptcha");
            submitCta.setAttribute("data-sitekey", this.sitekey);
            submitCta.setAttribute("data-action", "submit");
            submitCta.addEventListener("click", () => {
                let token = grecaptcha.getResponse();
                if (token && token.length > 0) {
                    this.callBackFunctionArry.forEach(callback => {
                        callback(token, form);
                    })
                }
                form.requestSubmit(submitCta);
            })
        }
    }

    addAttributesToForm() {
        if (this.allForms.length > 0) {
            this.allForms.forEach(form => {
                this.addCaptcha(form)
            })
        }
    }
}

// add site key "" inside bouble quote.
new ADDRECAPTCHA("6LcOPyEkAAAAAKG8ED9p9-kRFgpSV3wiTim5mcUt", [onSubmit])

function onSubmit(token, form) {
    console.log(token);
    console.log(form);
}