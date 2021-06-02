// functions containing fetch requests -- not currently working properly; just for testing purposes

var getDrink = function(){
    
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + $("#cocktail-submit").val() )
    .then(response=>response.json())
    .then(function(data){
        console.log(data);
        console.log(data.drinks[4].strInstructions);
        alert("request test - return ingredients: \n" + data.drinks[4].strInstructions);
    });
    

}

var getArtwork = function(){
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=1")
    .then(response=>response.json())
    .then(function(obj){
        console.log(obj);
        console.log(obj.objectIDs[3]);
        
    });
}

$("#cocktail-button").click(function(event){
    event.preventDefault();
    getDrink();
   //alert("cocktail gbutton pressed");
});

//to call the function containing a fetch request to art museum API 
$("#new-art-button").click(function(){
    alert("new art button pressed");
    getArtwork();
});




