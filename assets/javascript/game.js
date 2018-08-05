

    
// Crystal Collector Game  //
const CrystalCollector = function() {

    // Variables for the game
    
    let   currentPage   = 0;  
    const numCrystals   = 4;
    let   crystalValues = new Array(numCrystals);
    
    // Variables for the user
    let numWins = 0, numLosses = 0;
    let targetSum, TotalSum;


    /*  Start a new game */
    this.startNewGame = function() {
        // Reset variables
        targetSum  = 0;
        TotalSum = 0;

        // Assign a value between 1 and 12 to each crystal
        for (let i = 0; i < numCrystals; i++) {
            crystalValues[i] = randomInteger(1, 12);

            // Take a linear combination
            targetSum += randomInteger(1, 6) * crystalValues[i];
        }

        // Ensure that the target sum is between 19 and 120
        while (targetSum < 19 || targetSum > 120) {
            targetSum = 0;

            for (let i = 0; i < numCrystals; i++) {
                targetSum += randomInteger(1, 6) * crystalValues[i];
            }
        }

        // Display to the browser
        displayCurrentPage();
        displayNumWins();
        displayNumLosses();
        displayTargetSum();
        displayTotalSum();
    }

    
    // Display functions 
    function displayCurrentPage() {
        $(".page").css({"display": "none"});
        $(`.page:nth-of-type(${currentPage + 1})`).css({"display": "block"});
    }

    this.displayScoreBox = function(scoreBoxOn) {
        $("#scoreBox_background, #scoreBox").css({"display": (scoreBoxOn ? "block" : "none")});
    }

    function displayNumWins() {
        $("#numWins").text(numWins);
    }

    function displayNumLosses() {
        $("#numLosses").text(numLosses);
    }

    function displayTargetSum() {
        $("#targetSum").text(targetSum);
    }

    function displayTotalSum() {
        $("#TotalSum").text(TotalSum);
    }


    // Set (update) functions 
    this.updatePage = function(changeBy) {
        currentPage = (currentPage + changeBy + numPages) % numPages;

        displayCurrentPage();
    }

    function updateNumWins(changeBy) {
        numWins += changeBy;
    }

    function updateNumLosses(changeBy) {
        numLosses += changeBy;
    }


    // Generate a random number between a and b
    function randomInteger(a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a;
    }
    
    this.collectCrystal = function(index) {
        // Update the total sum
        TotalSum += crystalValues[index];

        displayTotalSum();

        if (TotalSum < targetSum) {
            return;

        } else if (TotalSum === targetSum) {
            updateNumWins(1);
            
            $("#outputMessage").html("Congratulations! You Won!<br>Click anywhere to continue.");
            $("#scoreBox").css({
                
            });

            this.displayScoreBox(true);
            
            this.startNewGame(1);
      

        } else {
            updateNumLosses(1);

            $("#outputMessage").html("You lose!<br>Click anywhere to continue.");
            $("#scoreBox").css({

            });

            this.displayScoreBox(true);
            
            this.startNewGame();
            
        }
    }
}



// Start a new game when the page loads 
let game;

$(document).ready(function() {
    game = new CrystalCollector();

    game.startNewGame();

    // Game mechanics
    $(".crystals").on("click", function() {
        game.collectCrystal($(".crystals").index(this));
    });

    // Scorebox
    $("#scoreBox_background, #scoreBox").on("click", function() {
        game.displayScoreBox(false);
    });
});