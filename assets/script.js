
// this button will call the function containing a fetch request when to the cocktail API when pressed -- for now, holding an alert() for testing
$("#cocktail-button").click(function(){
   // getDrink();
    alert("cocktail button pressed");
});

//to call the function containing a fetch request to art museum API 
$("#new-art-button").click(function(){
    alert("new art button pressed");
});



/* 

function to send fetch request goes below  
var getDrink = function(){
    fetch("www.thecocktaildb.com/api/json/v1/1/search.php?s=" + $("").val() );
}

*/