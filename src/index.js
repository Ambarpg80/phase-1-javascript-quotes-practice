
fetch('http://localhost:3000/quotes')
.then(res => res.json())
.then(quotes => showQuotes(quotes))
function getLikes(){
fetch('http://localhost:3000/likes') 
.then(res => res.json())
.then(likes => {showLikes(likes)
    // const likeBtn = document.querySelector('.btn-success');
    // likeBtn.addEventListener("click", ()=>likeAQuote(likes))
})
}
getLikes()

/* ================= SHOW QUOTES IN DB ================= */
function showQuotes(quotes){
    const ul = document.getElementById('quote-list')
    for(let quote of quotes){
        const li = document.createElement('li')
        li.className = 'quote-card'
        li.innerHTML = `<blockquote class="blockquote">
            <p class="mb-0">${quote.quote}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
            <br>
            <button class='btn-success'>Likes: <span>0</span></button>
            <button class='btn-danger'>Delete</button>
            </blockquote>`
        ul.append(li)
        const deleteBtn = li.querySelector('button.btn-danger');
        deleteBtn.addEventListener("click", ()=>{
            li.remove();
            deleteAQuote(quote)})
        const likeBtn = li.querySelector('.btn-success');
        likeBtn.addEventListener("click", ()=>likeAQuote(quote))
}
}

/* ================= POST A NEW QUOTE ================= */

const form = document.querySelector('#new-quote-form');
const newQuote = document.querySelector('#new-quote');
const author = document.querySelector('#author');

form.addEventListener('submit' ,(e)=>{
    e.preventDefault();
    fetch('http://localhost:3000/quotes', { // ADD QUOTE TO DB
        method : "POST",
        headers : {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
        },
        body : JSON.stringify({
        "quote" : newQuote.value,
        "author" : author.value
        })
    })
    .then(res => res.json())
    .then(quotes => addAQuote(quotes)) 
})

function addAQuote(quotes){
    const ul = document.getElementById('quote-list')
    for(let quote in quotes){
        const li = document.createElement('li')
        li.className = 'quote-card'
        li.innerHTML = `<blockquote class="blockquote">
            <p class="mb-0">${newQuote.value}</p>
            <footer class="blockquote-footer">${author.value}</footer>
            <br>
            <button class='btn-success'>Likes: <span>0</span></button>
            <button class='btn-danger'>Delete</button>
            </blockquote>`
        ul.append(li)
    }
}

/* ================= DELETE A QUOTE ================= */

function deleteAQuote(quote){
fetch(`http://localhost:3000/quotes/${quote.id}`, {     // DELETE QUOTE FROM DB
    method : "DELETE",
    headers : {
	"Content-Type" : "application/json"
	}

})
.then(res => res.json())
}


/* ================= LIKE A QUOTE ================= */

const date = Date.now();

function showLikes(likes){
    
    let likeSpan = document.querySelectorAll('span');
   // console.log(likeSpan)
    likes.forEach(like => {
        
       let  i = like.quoteId -1
        if(like.id){
        likeSpan.forEach(span => likeSpan[i].innerText = 1)    
        }
        else{likeSpan.forEach(span => likeSpan[i].innerText = 0)  }
    } )
}

function likeAQuote(quote){
    
    let likeSpan = document.querySelectorAll('span');
    let  i = quote.id -1
 
        if(likeSpan[i].innerText == 0){

            fetch('http://localhost:3000/likes',{ // ADD LIKE TO DB
                method : "POST",
                headers : {
                "Content-Type" : "application/json",
                "Accept" : "application/json"
                },
                body : JSON.stringify({
                   "quoteId": quote.id,
                    "createdAt": date
                })
            })
            .then(res => res.json())
            .then(() => getLikes())
        
        }
       else{likeSpan[i].innerText++}
    }



