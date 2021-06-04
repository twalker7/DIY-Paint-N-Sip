//Response to "Drink Me" button click
$("#cocktail-button").click(function(event){
    event.preventDefault();
    //For Testing:
        //alert("cocktail button pressed");
    clearRecipe();
    getDrink();
});

//Response to "Inspire Me" button click
$("#new-art-button").click(function(){
    event.preventDefault();
    //For Testing:
        //alert("cocktail button pressed");
    clearArt();
    getArtwork();
});

//Function to remove all content from recipe box so it can be replaced
function clearRecipe() {
    $("#random-cocktail-name").empty();
    $("#ingredients-list").empty();
    $("#recipe-steps").empty();
    $("#drink-name-title").empty();
    $("#ingredients-title").empty();
    $("#recipe-title").empty();
}

//Function to remove all content from art box so it can be replaced
function clearArt() {
    $("#painting").empty();
}

//Function to select a random drink from Cocktail API
function getDrink(){
    //Fill drink box with "stand-by" gif for user's entertainment
    $("#random-cocktail-name").append('<iframe src="https://giphy.com/embed/d90nFNtgGnvjiGBN4Z" height="200" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/drunkhistory-comedy-central-drunk-history-d90nFNtgGnvjiGBN4Z"></a></p>');
    //Use dropdown liquor selection to fetch url of drinks that feature that liquor
    fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + $("#liquor-list").val() )
    .then(response=>response.json())
    .then(function(data){
        //For Testing:
            //console.log(data);
        //Select random number based on array length
        var randIndex = Math.floor(Math.random() * data.drinks.length); 
        //For Testing:
            //console.log("random index", randIndex)
        //Use random number to find drink ID 
        var randomDrinkID = data.drinks[randIndex].idDrink;
        console.log("random drink id", randomDrinkID)
        //Use drink ID to fetch url for all information about selected cocktail
        fetch("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + randomDrinkID )
        .then(response=>response.json())
        .then(function(data) {
            //Remove "stand-by" gif with clear function
            clearRecipe();
            //Send drink name from API to HTML
            $("#drink-name-title").append("Drink Name:");
            $("#random-cocktail-name").append(data.drinks[0].strDrink);
            //Send drink instructions from API to HTML
            $("#recipe-title").append("Instructions: </br>");
            $("#recipe-steps").append(data.drinks[0].strInstructions);
            //Send drink ingredients from API to HTML
            $("#ingredients-title").append("Ingredients: </br>");
            //For loop to check every ingredient listed in API
            for (var i = 1; i < 16; i++) {
                //For Testing:
                    //console.log(data.drinks[0])
                //Make a string that includes this loop's i value
                var meas1 = ("data.drinks[0].strMeasure" + i);
                var ing1 = ("data.drinks[0].strIngredient" + i);
                //Convert string to script
                var measurement = eval(meas1);
                var ingredient = eval(ing1);
                //For Testing:
                    //console.log(meas1);
                    //console.log(ing1);
                    //console.log(measurement);
                    //console.log(ingredient);
                //If statement to only display ingredients with content in API
                if (measurement == null || measurement == " " || ingredient == null || ingredient == " ") {
                    
                } else {
                $("#ingredients-list").append(measurement + " - " + ingredient + "</br>");    
                }
            }
            
            
        });
    });
}

function getArtwork(){
    //Fill art box with "stand-by" gif for user's entertainment
    $("#painting").append('<iframe src="https://giphy.com/embed/LzCREPXRTqtdC" height="200" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/spongebob-LzCREPXRTqtdC"></a></p>');
    //Fetch url for full list of art in API
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects")
    .then(response=>response.json())
    .then(function(obj){
        //For Testing:
            //console.log(obj);
        var artrandIndex = Math.floor(Math.random() * obj.objectIDs.length);
        //alert("request test - return art ID:" + obj.objectIDs[artrandIndex]);
        //Select random number based on array length
        console.log("ID number: " , obj.objectIDs[artrandIndex]);
        //Use random number to select artwork ID
        var randomArtID = obj.objectIDs[artrandIndex];
        //Use artwork ID to fetch url for all information about selected art
        fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + randomArtID )
        .then(response=>response.json())
        .then(function(obj) {
            //Find image link
            var artImage = obj.primaryImage;
            //For Testing:
                //console.log("Image link: ", artImage);
            //If statement to move ignore artwork with no image
            if (artImage === "") {
                clearArt();
                getArtwork(); 
            } else {
                clearArt();
                $("#painting").append('<img class="artwork-image" src="' + artImage +'"></img>'); 
            }
            
        });
    });
}




