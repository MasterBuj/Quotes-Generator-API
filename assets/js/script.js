const quoteText = document.querySelector(".quote"),
    quoteBtn = document.querySelector(".newQuote"),
    quoteBtnInner = document.querySelector(".newQuote > i"),
    authorName = document.querySelector(".name"),
    speechBtn = document.querySelector(".speech"),
    copyBtn = document.querySelector(".copy"),
    twitterBtn = document.querySelector(".twitter"),
    synth = speechSynthesis;


quoteBtn.addEventListener("click", () => {
    quoteBtn.classList.add("loading");
    quoteBtnInner.classList.remove('fas', 'fa-sync-alt')
    quoteBtnInner.classList.add('fas', 'fa-sync', 'fa-spin')
    fetch("http://api.quotable.io/random")
        .then(response => response.json())
        .then(result => {
            quoteText.innerText = result.content;
            authorName.innerText = result.author;
            quoteBtn.classList.remove("loading");
            quoteBtnInner.classList.remove('fas', 'fa-sync', 'fa-spin')
            quoteBtnInner.classList.add('fas', 'fa-sync-alt')
        })
});



speechBtn.addEventListener("click", () => {
    if (!quoteBtn.classList.contains("loading")) {
        let utterance = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorName.innerText}`);
        synth.speak(utterance);
        setInterval(() => {
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quoteText.innerText);
});

twitterBtn.addEventListener("click", () => {
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
    window.open(tweetUrl, "_blank");
});



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

Coloris.setInstance('.bg-color', {
    theme: 'polaroid',
    formatToggle: true,
    onChange: (color) => {
        document.getElementById("content").style.background = color;
    }
});

Coloris.setInstance('.font-color', {
    theme: 'polaroid',
    formatToggle: true,
    onChange: (color) => {
        document.getElementById("content").style.color = color;

    }
});

Coloris.setInstance('.title-color', {
    theme: 'polaroid',
    formatToggle: true,
    onChange: (color) => {
        document.getElementById("title").style.color = color;

    }
});
