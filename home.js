const quoteContainer = document.getElementById("quote-container"); 
const quoteText = document.getElementById("quote"); 
const authorText = document.getElementById("author"); 
const twitterBtn = document.getElementById("twitter"); 
const newQuoteBtn = document.getElementById("new-quote"); 
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show loading animation
function loading(){
    //hidden attribute hides elements 
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote
function newQuote (){
    // using math.floor and math.random grabs a random quote from your api 
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    // Check if author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else{
        authorText.textContent = quote.author;
    }
    // Check if quote is too long -- to determine its stlying
    if(quote.text.length > 100){
        quoteText.classList.add("long-quote")
    } else {
        quoteText.classList.remove("long-quote")
    }
    quoteText.textContent = quote.text;
}

// Get Quotes From API
async function getQuotes(){
    const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        //this const will not run until it has data into your variable (apiURL)
        const response = await fetch(apiURL)
        apiQuotes = await response.json();
        newQuote();
      // Catches any fallback errors  
    } catch (error) {
        // Catch Error Here
    }
}

// To tweet a quote
function tweetQuote (){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load RUN getQuotes function
// global
// getQuotes();
// loading();

// local
newQuote();