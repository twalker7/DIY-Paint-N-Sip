// functions containing fetch requests -- not currently working properly; just for testing purposes

var getDrink = function(){
    
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + $("#liquor-list").val() )
    .then(response=>response.json())
    .then(function(data){

       
        console.log(data);
        console.log(data.drinks[4].strInstructions);
        var randIndex = Math.floor(Math.random() * data.drinks.length); 
        alert("request test - return instructions: \n" + data.drinks[randIndex].idDrink);
        var randomDrinkID = data.drinks[randIndex].idDrink;
        fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + randomDrinkID )
        .then(response=>response.json())
        .then(function(data) {
            alert("your drink name:" + data.drinks[0].strDrink + 
            "\ningredient: " + data.drinks[0].strMeasure1 + "- " + data.drinks[0].strIngredient1);
        });
    });
    

}

var getArtwork = function(){
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects")
    .then(response=>response.json())
    .then(function(obj){
        console.log(obj);
        console.log(obj.objectIDs[3]);
        var artrandIndex = Math.floor(Math.random() * obj.objectIDs.length);
        alert("request test - return art ID:" + obj.objectIDs[artrandIndex]);
        var randomArtID = obj.objectIDs[artrandIndex];
        fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + randomArtID )
        .then(response=>response.json())
        .then(function(obj) {
            alert("your art name:" + obj.objectName);

        });

    });
}

$("#cocktail-button").click(function(event){
    event.preventDefault();
    clearRecipe();
    getDrink();
   //alert("cocktail gbutton pressed");
});

//to call the function containing a fetch request to art museum API 
$("#new-art-button").click(function(){
    event.preventDefault();
    clearArt();
    getArtwork();
});

function clearRecipe() {
    $("#random-cocktail-name").empty();
    $("#ingredients-list").empty();
    $("#recipe-steps").empty();
}

function clearArt() {
    $("#painting").empty();
}


