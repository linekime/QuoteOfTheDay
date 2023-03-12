const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoading(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() {
    showLoading();
    // pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check if author is blank and replace with unknown
    if(!quote.author){
        authorText.textContent = "unknown";
    } else {
        authorText.textContent = quote.author;
    }

    // check quotelength to determine styling
    if(quote.text.length >120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // set quote, hide loader
    quoteText.textContent = quote.text;
    hideLoading();
}

// Get Quotes from API
async function getQuotes() {
    showLoading();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        // getting json as a response and turning the response into api object. pass it to global variable
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        alert(error)
        // Catch Error Here
    }
}

// Tweet Quote
function tweetQuote() {
    //use back-ticks (under esc): let us pass in variable
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// event listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)


// On Load
getQuotes();
