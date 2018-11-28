
var timeValue = 0;
var remainingMines = 0;
var interval;
var minesLaid = false;
let options = { columns: 1, rows: 1, mines: 1 };
var mineLocations = [];

function buildGrid() {
    // Fetch grid and clear out old elements, reset title text
    var grid = document.getElementById("minefield");
    grid.innerHTML = "";

    var titleText = document.getElementById("titleMessage");
    titleText.innerHTML = "Minesweeper";
    titleText.classList.remove("win_text");
    titleText.classList.remove("lose_text");

    setDifficulty(options);

    //reset mines
    minesLaid = false;
    mineLocations = [];
    remainingMines = options.mines;
    updateMineCount();

    // Build DOM Grid
    var tile;
    for (var x = 0; x < options.columns * options.rows; x++) {
        tile = createTile(x);
        grid.appendChild(tile);
    }
    
    var style = window.getComputedStyle(tile);
    var width = parseInt(style.width.slice(0, -2));
    var height = parseInt(style.height.slice(0, -2));    
    grid.style.width = (options.columns * width) + "px";
    grid.style.height = (options.rows * height) + "px";
}

function createTile(x) {
    var tile = document.createElement("div");

    tile.classList.add("tile");
    tile.classList.add("hidden");
    
    tile.id = x;

    tile.addEventListener("auxclick", function(e) { e.preventDefault(); }); // Middle Click
    tile.addEventListener("contextmenu", function (e) { e.preventDefault(); }); // Right Click
    tile.addEventListener("mousedown", handleTileDown); // All Clicks
    tile.addEventListener("mouseover", handleTileDown); // All Clicks
    tile.addEventListener("mouseout", handleTileOut);
    tile.addEventListener("mouseup", handleTileUp ); // All Clicks

    return tile;
}

function layMines(firstTileIndex) {
    //get an array of ids that matches the number of tiles on the screen
    var tilesArray = Array.from(Array(options.columns * options.rows).keys());
    
    //remove the currently clicked and adjacent tiles to ensure that the clicked tile will be blank
    var idsToRemove = getAdjacentTiles(parseInt(firstTileIndex));
    tilesArray.splice(tilesArray.indexOf(parseInt(firstTileIndex)), 1);

    for (var x = 0; x < idsToRemove.length; x++){
        tilesArray.splice(tilesArray.indexOf(idsToRemove[x]), 1);
    }

    //shuffle the array of ids and then take the first n ids for the number of mines
    var shuffled = tilesArray.sort(function () { return .5 - Math.random() });
    mineLocations = shuffled.slice(0, options.mines);
    
    console.log(mineLocations);

    minesLaid = true;
}

function startGame(firstTileIndex) {
    layMines(firstTileIndex);
    startTimer();
}

function resetGame() {
    buildGrid();
    stopTimer(true);
}

function smileyDown() {
    var smiley = document.getElementById("smiley");
    smiley.classList.remove("face_lose");
    smiley.classList.remove("face_win");
    smiley.classList.add("face_down");
}

function smileyUp() {
    var smiley = document.getElementById("smiley");
    smiley.classList.remove("face_down");
}

function handleTileDown(event) {

    if (event.which == 1) {
        event.preventDefault();
        event.target.classList.remove("hidden");
        smiley.classList.add("face_limbo");
    }
    if (event.which == 2 || event.which == 3) {
        event.preventDefault();
        smiley.classList.add("face_limbo");
    }
        
}

function handleTileOut(event) {
    if (!event.target.classList.contains("revealed")) {
        event.target.classList.add("hidden");
    }
    smiley.classList.remove("face_limbo");
}

function handleTileUp(event) {
    smiley.classList.remove("face_limbo");
    // Left Click
    if (event.which === 1) {
        if (!minesLaid) {
            startGame(event.target.id);
        }
        revealTile(event.target);
    }

    // Middle Click
    else if (event.which === 2) {
        //Check if the number of adjacent flags is the same as the number of adjacent mines
        var adjacentTiles = getAdjacentTiles(parseInt(event.target.id));
        var adjacentMineCount = 0;
        var adjacentFlagCount = 0;
        for (var i = 0; i < adjacentTiles.length; i++) {
            if(document.getElementById(adjacentTiles[i]).classList.contains("flag")){
                adjacentFlagCount++;
            }
            if (mineLocations.indexOf(adjacentTiles[i]) > -1) {
                adjacentMineCount++;
            }
        }
        if (adjacentFlagCount === adjacentMineCount) {
            for (var i = 0; i < adjacentTiles.length; i++) {
                revealTile(document.getElementById(adjacentTiles[i]));
            }
        }
    }

    // Right Click, if not revealed apply flag
    else if (event.which === 3 && !event.target.classList.contains("revealed")) {
        if (event.target.classList.toggle("flag")) {
            remainingMines--;
        } else {
            remainingMines++;
        }
        updateMineCount();
    }
}

function setDifficulty(options) {
    var difficultySelector = document.getElementById("difficulty");
    var difficulty = difficultySelector.selectedIndex;
    //Easy - 9x9 grid, 10 mines.
    if (difficulty == 0) {
        options.columns = 9;
        options.rows = 9;
        options.mines = 10;
    }
    //Medium - 16x16 grid, 40 mines.
    else if (difficulty == 1) {
        options.columns = 16;
        options.rows = 16;
        options.mines = 40;
    }
    //Hard - 30x16 grid, 99 mines.
    else if (difficulty == 2) {
        options.columns = 30;
        options.rows = 16;
        options.mines = 99;
    }
}

/* Timer */
function startTimer() {
    interval = window.setInterval(onTimerTick, 1000);
}

function stopTimer(isReset) {
    window.clearInterval(interval);
    if (isReset) {
        timeValue = 0;
    }
    updateTimer();
}

function onTimerTick() {
    timeValue++;
    updateTimer();
}

function updateTimer() {
    document.getElementById("timer").innerHTML = timeValue;
}

function updateMineCount() {
    document.getElementById("mineCount").innerHTML = remainingMines;
}

function getAdjacentTiles(id) {
    var minArray = 0;
    var maxArray = options.rows * options.columns;

    var adjacentTileArrayLocation = [];
    
    if(id % options.columns !== 0){        
        adjacentTileArrayLocation.push(id - 1);
        adjacentTileArrayLocation.push(id + options.columns - 1);
        adjacentTileArrayLocation.push(id - options.columns - 1);
    }

    if (id % options.columns !== options.columns-1) {
        adjacentTileArrayLocation.push(id + 1);
        adjacentTileArrayLocation.push(id + options.columns + 1);
        adjacentTileArrayLocation.push(id - options.columns + 1);
    }

    adjacentTileArrayLocation.push(id - options.columns);
    adjacentTileArrayLocation.push(id + options.columns);

    return adjacentTileArrayLocation.filter(x => x >= minArray && x < maxArray);
}

function revealTile(clickedTile) {
    //Do nothing to flagged or revealed tiles
    if (clickedTile.classList.contains("flag") || clickedTile.classList.contains("revealed")) {
        return;
    }
    //Mark this tile as revealed
    clickedTile.classList.add("revealed");
    clickedTile.classList.remove("hidden");
    
    //Check if the clicked tile was a mine
    if (mineLocations.indexOf(parseInt(clickedTile.id)) > -1) {
        //Enter lose state
        clickedTile.classList.add("mine_hit");
        document.getElementById("smiley").classList.add("face_lose");
        stopTimer();

        var titleText = document.getElementById("titleMessage");
        titleText.innerHTML = "You Lose.";
        titleText.classList.add("lose_text");

        var flags = document.getElementsByClassName("flag");

        for (var i = 0; i < flags.length; i++) {
            if (mineLocations.indexOf(parseInt(flags[i].id)) === -1) {
                flags[i].classList.add("mine_marked")
            }
        }
        for (var i = 0; i < mineLocations.length; i++) {
            if (!document.getElementById(mineLocations[i]).classList.contains("flag")) {
                document.getElementById(mineLocations[i]).classList.add("mine");
            }
        }
        return;
    }

    //Check adjacent tiles for a mine
    var adjacentTiles = getAdjacentTiles(parseInt(clickedTile.id));
    var adjacentMineCount = 0;
    for (var i = 0; i < adjacentTiles.length; i++) {
        if (mineLocations.indexOf(adjacentTiles[i]) > -1) {
            adjacentMineCount++;
        }
    }

    //Number tiles for mine if none reveal adjacent tiles
    if (adjacentMineCount > 0) {
        clickedTile.classList.add("tile_" + adjacentMineCount);
    } else {
        for (var i = 0; i < adjacentTiles.length; i++) {
            revealTile(document.getElementById(adjacentTiles[i]));
        }
    }

    //Check if the number of hidden tiles remaining == number of mines
    if(mineLocations.length === document.getElementsByClassName("hidden").length){
        //Enter win state
        document.getElementById("smiley").classList.add("face_win");
        stopTimer();

        var titleText = document.getElementById("titleMessage");
        titleText.innerHTML = "You Win!!!";
        titleText.classList.add("win_text");
    }

}