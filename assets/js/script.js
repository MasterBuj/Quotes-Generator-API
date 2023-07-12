// MARK Global
const quoteText = document.querySelector(".quote"),
    quoteBtn = document.querySelector(".newQuote"),
    quoteBtnInner = document.querySelector(".newQuote > iconify-icon"),
    authorName = document.querySelector(".author .name");

// MARK Fetch quotes
quoteBtn.addEventListener("click", () => {
    quoteBtn.classList.add("loading");
    quoteBtnInner.removeAttribute("icon")
    quoteBtnInner.setAttribute("icon", "eos-icons:arrow-rotate")
    fetch("http://api.quotable.io/random")
        .then(response => response.json())
        .then(result => {
            quoteText.innerText = result.content;
            authorName.innerText = result.author;
            quoteBtn.classList.remove("loading");
            quoteBtnInner.removeAttribute("icon")
            quoteBtnInner.setAttribute("icon", "dashicons:image-rotate")
        })
});

// MARK Speak quote
const synth = speechSynthesis,
    speakBtn = document.querySelector(".speak");
speakBtn.addEventListener("click", () => {
    if (!quoteBtn.classList.contains("loading")) {
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(() => {
            !synth.speaking ? speakBtn.classList.remove("active") : speakBtn.classList.add("active");
        }, 10);
    }
});

// MARK Copy quote
document.querySelector(".copy").addEventListener("click", () => {
    navigator.clipboard.writeText(`"${quoteText.innerText}" by ${authorName.innerText}`);
});

// MARK Tweet quote
document.querySelector(".twitter").addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
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
// document.getElementById("download-btn").addEventListener("click", function () {
//     var divToDownload = document.getElementById("div-to-download");

//     var serializer = new XMLSerializer();
//     var svgMarkup = serializer.serializeToString(divToDownload);

//     var blob = new Blob([svgMarkup], { type: "image/svg+xml" });

//     var link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.download = "download.svg";
//     link.click();

//     URL.revokeObjectURL(link.href);
// });








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
        document.getElementById("content").style.background = color;
    }
});

// MARK Color for Font
Coloris.setInstance('.font-color', {
    theme: 'polaroid',
    formatToggle: true,
    onChange: (color) => {
        document.getElementById("content").style.color = color;

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
