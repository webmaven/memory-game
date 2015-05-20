function GameCtrl($scope) {
    $scope.score = 0;
    $scope.level = 1;
    $scope.toBeFound = 0;
    $scope.found = 0;
    $scope.wrong = 0;
    $scope.scoreBonus = 10;
    $scope.scorePenalty = 20;
    $scope.initRows = 3;
    $scope.initCols = 3;
    $scope.maxRows = 6;
    $scope.maxCols = 6;
    $scope.rows = $scope.initRows;
    $scope.cols = $scope.initCols;
    $scope.showGrid = true;
    $scope.disableButton = false;
    $scope.grid = new Array();
    
    $scope.beginLevel = function(){
        $scope.revealGrid();
        window.setTimeout(function() {
            $scope.$apply($scope.concealGrid);
        }, 4000);
        //$timeout($scope.concealGrid, 5000);
    };

    $scope.newGrid = function() {
        $scope.disableButton = false;
        $scope.toBeFound = 0;
        $scope.wrong = 0;
        for (r=0;r<$scope.rows;r++) {
            $scope.grid[r]=new Array();
            for (c=0;c<$scope.cols;c++) {
                var isMarked = Math.random() >= 0.6;
                if (isMarked){$scope.toBeFound++}
                $scope.grid[r][c]={"marked": isMarked, "chosen": false, "win": false, "lose": false, "disabled": false};
            }
        }
    };

    $scope.revealGrid = function() {
        $scope.disableButton = true;
        for (var r = 0; r < $scope.grid.length; r++){
            var row = $scope.grid[r];
            for (var c = 0; c < row.length; c++) {
                var cell = row[c];
                cell.disabled = true;
                if (cell.marked) {
                    cell.win = true;
                }
            }
        }
        $scope.showGrid = false;
    };

    $scope.concealGrid = function() {
        for (var r = 0; r < $scope.grid.length; r++){
            var row = $scope.grid[r];
            for (var c = 0; c < row.length; c++) {
                var cell = row[c];
                cell.disabled = false;
                if (!cell.chosen){
                    cell.win = false;
                    cell.lose = false;
                }
            }
        }
        $scope.showGrid = true;
    };



    $scope.checkCell = function(cell) {
        if (!cell.chosen) {
            cell.chosen = true;
            if (cell.marked) {
                cell.win = true;
                cell.lose = false;
                $scope.found++;
                $scope.score += $scope.scoreBonus;
            }
            else {
                cell.win = false;
                cell.lose = true;
                $scope.wrong++;
                $scope.score -= $scope.scorePenalty;
            }
        }
        // You found them all
        if ($scope.found == $scope.toBeFound) {
            // No mistakes, go to next level
            if ($scope.wrong == 0){
                $scope.nextLevel();
            }
            // Some mistakes, repeat level
            else {
                $scope.sameLevel();
            }
        }
    };

    $scope.nextLevel = function() {
        $scope.grid = new Array();
        $scope.found = 0;
        $scope.toBeFound = 0;
        // Both rows and columns are maxed out
        if (($scope.rows == $scope.maxRows) && ($scope.cols == $scope.maxCols)) {
            alert("You won the game!");
            $scope.reset();
        }
        else {
            // Rows are maxed out, add a column
            if (($scope.rows == $scope.maxRows) && !($scope.cols == $scope.maxCols)){
            $scope.cols++;
            }   
            // Columns are maxed out, add a row
            else if (!($scope.rows == $scope.maxRows) && ($scope.cols == $scope.maxCols)){
            $scope.rows++;
            }
            // Neither rows nor columns are maxed out, increase one randomly
            else {
                if (Math.random() >= 0.5) {
                    $scope.rows++;
                }
                else {
                    $scope.cols++;
                }
            }
            // After enlarging the grid, proceed to next level
            $scope.level++;
            $scope.newGrid();
        }
    };

    $scope.sameLevel = function() {
        $scope.grid = new Array();
        $scope.found = 0;
        $scope.toBeFound = 0;
        $scope.newGrid();
    };

    $scope.reset = function() {
        $scope.cols = 3;
        $scope.rows = 3;
        $scope.level = 1;
        $scope.score = 0;
        $scope.newGrid();
    };
    $scope.newGrid();
}

