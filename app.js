// Add DOM selectors to target input and UL movie list
const inp = document.querySelector("input");
const myMovieList = document.querySelector("ul");
const addMovieButton = document.getElementById("addMovieButton")
const fil = document.getElementById("filter")
const history = document.getElementById("movieHistoryCard")
var newTable = document.createElement("table");
newTable.style="width:100%"
var movies = {}








// Example of a simple function that clears the input after a user types something in
function clearInput() {
    inp.value = "";
}

function clearMovies() {
    // To delete all children of the <ul></ul> (meaning all <li>'s)..we can wipe out the <ul>'s innerHTML
    myMovieList.innerHTML = '';
}

// This function is executed when the user clicks [ADD MOVIE] button.
function addMovie() {
    // Step 1: Get value of input
    var userTypedText = inp.value;
    // Step 2: Create an empty <li></li>
    var li = document.createElement("li"); // <li></li>

    
        
    
    // Step 3: Prepare the text we will insert INTO that li ^...example: Harry Potter
    var textToInsert = document.createTextNode(userTypedText);
    
    //Alert User if input is blank
    
    if (userTypedText == ""){
        
        alert("Cannot add blank")
        
    } else{
        
        // Step 4: Insert text into li
        // <li>Harry Potter </li>
        
        
        li.appendChild(textToInsert);
        
        
        // Step 5: Insert the <li>Harry Potter</li> INTO the <ul>
        myMovieList.appendChild(li);
        

        
        if(movies.hasOwnProperty(userTypedText)) {
            movies[userTypedText] = movies[userTypedText] + 1;
            newTable.innerHTML = createHistoryTable().replace(/,/g, '');
        } else{
            var newDict = {[userTypedText]:1}
            Object.assign(movies,newDict)
            newTable.innerHTML = createHistoryTable().replace(/,/g, '');

        }

        
        if (Object.keys(movies).length == 1){
            Object.assign(movies,newDict)
            history.appendChild(newTable)  
            newTable.innerHTML = createHistoryTable().replace(/,/g, ''); 
            
        }    
        
        

    }
    

    // Step 6: Call the clearInput function to clear the input field
    clearInput();
}


function filterList() {
    const filter = fil.value.toLowerCase()
    var movieItem = myMovieList.getElementsByTagName('li')
    for (i = 0; i < movieItem.length; i++) {

        var text = movieItem[i].textContent.toLowerCase();
        if (text.includes(filter)){
            movieItem[i].style.display = '';
        } else {
            movieItem[i].style.display = 'none'
        }
    }
}

function createHistoryTable(){
    return`<tr><th>Title</th><th>Watched</th></tr> ${
            Object.entries(movies)
                .map(([key, value]) => `<tr><td>${key}</td> <td>${value}</td></tr>  `)
        }`
}


addMovieButton.addEventListener("click",addMovie);
fil.addEventListener("input",filterList);

