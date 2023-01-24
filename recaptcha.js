let allForms = document.querySelectorAll("[data-wrapper='form']");
let TOKEN = null;
function captchaValidation(form) {
    if (form == undefined) return;
    let submitCta = form.querySelector("input[type='submit']");
    submitCta.classList.add("g-recaptcha");
    submitCta.setAttribute("data-callback","onSubmit");
    submitCta.setAttribute("data-sitekey","6LcOPyEkAAAAAKG8ED9p9-kRFgpSV3wiTim5mcUt");
    submitCta.setAttribute("data-action","submit");
    submitCta.addEventListener("click",()=>{
        if(TOKEN!=null){
            form.requestSubmit(submitCta);
        }else{
            form.requestSubmit(submitCta)
        }
    })
}

if (allForms.length > 0) {
    allForms.forEach(form => {
        captchaValidation(form)
    })
}

function onSubmit(token) {
    TOKEN = token;
}