// MARK Global
const quoteText = document.querySelector(".quote"),
    authorName = document.querySelector(".author .name"),
    quoteBtn = document.querySelector(".newQuote"),
    quoteBtnInner = document.querySelector(".newQuote > iconify-icon"),
    quoteArea = document.getElementById("quote-area"),
    quote = `"${quoteText.innerText}" by ${authorName.innerText}`;

// MARK Fetch quotes

window.addEventListener("load", () => {
    fetchQuote();
});

quoteBtn.addEventListener("click", fetchQuote);

function fetchQuote() {
    quoteBtn.classList.add("loading");
    quoteBtnInner.removeAttribute("icon")
    quoteBtnInner.setAttribute("icon", "eos-icons:arrow-rotate")
    fetch("http://api.quotable.io/quotes/random?maxLength=115")
        .then(response => response.json())
        .then(result => {
            quoteText.innerText = result[0].content;
            authorName.innerText = result[0].author;
            const authorNameInfo = authorName.innerText.replace(/\s/g, "-");
            fetch("http://api.quotable.io/search/authors?query=" + authorNameInfo)
                .then(response => response.json())
                .then(authorInfo => {
                    console.log(authorInfo)
                    document.getElementById("info-name").innerText = authorInfo.results[0].name;
                    document.getElementById("info-desc").innerText = authorInfo.results[0].description;
                    document.querySelector("#info-link > a").setAttribute("href", authorInfo.results[0].link);
                })

            quoteBtn.classList.remove("loading");
            quoteBtnInner.removeAttribute("icon")
            quoteBtnInner.setAttribute("icon", "dashicons:image-rotate")
        })
};

function fetchAuthor(params) {

}


// MARK Speak quote
const synth = speechSynthesis,
    speakQuoteBtn = document.querySelector(".speak");

speakQuoteBtn.addEventListener("click", () => {
    let voices = window.speechSynthesis.getVoices();

    if (synth.speaking)
        return synth.cancel();

    if (!"speechSynthesis" in window || voices.length == 0)
        return alert("Sorry, your device or browser doesn't support text to speech!");


    if (!quoteBtn.classList.contains("loading")) {
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);

        setInterval(() => {
            !synth.speaking ? speakQuoteBtn.classList.remove("active") : speakQuoteBtn.classList.add("active");
        }, 10);

    }

});

// MARK Copy quote
document.querySelector(".copy").addEventListener("click", () => {
    var hiddenClipboard = document.getElementById("_hiddenClipboard_");
    if (!hiddenClipboard) {
        var textarea = document.createElement("textarea");
        textarea.style.position = "absolute";
        textarea.style.top = "-9999px";
        textarea.id = "_hiddenClipboard_";
        textarea.readOnly = true;
        textarea.value = quote;
        document.body.appendChild(textarea);
        hiddenClipboard = document.getElementById("_hiddenClipboard_");
    }
    hiddenClipboard.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
});


// MARK Title key listener
const quoteTitle = document.getElementById("quoteTitle");
const titleInput = document.getElementById("title-input");
titleInput.addEventListener("keyup", () => {
    if (quoteTitle.innerText == "")
        return quoteTitle.innerText = "Quote of the Day";
    quoteTitle.innerText = titleInput.value;
});

titleInput.addEventListener("focusout", () => {
    if (quoteTitle.innerText == "")
        return quoteTitle.innerText = "Quote of the Day";
});

// MARK Download as Div
document.querySelector(".download").addEventListener("click", function () {
    html2canvas(quoteArea, {
        scale: 15,
        useCORS: true,
        backgroundColor: null
    }).then(canvas => {
        canvas.toBlob(blob => saveAs(blob, `quote by ${authorName.innerText}`));
    });

});

// MARK Config tools
// Coloris init
Coloris({
    el: '.coloris',
    swatches: [
        '#264653',
        '#2a9d8f',
        '#e9c46a',
        '#f4a261',
        '#e76f51',
        '#d62828',
        '#023e8a',
        '#0077b6',
        '#0096c7',
        '#00b4d8',
        '#48cae4'
    ]
});
// MARK Color for bg
Coloris.setInstance('.bg-color', {
    theme: 'polaroid',
    formatToggle: true,
    onChange: (color) => {
        document.getElementById("quote-area").style.background = color;
    }
});

// MARK Color for Font
Coloris.setInstance('.font-color', {
    theme: 'polaroid',
    formatToggle: true,
    onChange: (color) => {
        document.getElementById("quote-area").style.color = color;

    }
});

// MARK Color for Title
Coloris.setInstance('.title-color', {
    theme: 'polaroid',
    formatToggle: true,
    onChange: (color) => {
        document.getElementById("quoteTitle").style.color = color;

    }
});
