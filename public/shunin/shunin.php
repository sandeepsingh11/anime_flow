<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shunin | Anime Finder</title>

    <link rel="stylesheet" href="./style/css/normalize.css">
    <link rel="stylesheet" href="./style/css/main.css">
</head>
<body>

    <div id="form-container">
        <form action="./inc/shunin_handler.php" method="post" id="form-create">
            <h2 class="form-title">Create Node</h2>
    
    
            <!-- pre-head -->
            <div class="input-container">
                <label for="pre-head">What question does this connect to?</label>
                
                <select name="pre-head" id="pre-head">
                    <option value="NULL"></option>
                </select>
            </div>
    
    
            <!-- head -->
            <div class="input-container">
                <label for="head">What question exactly?</label>
    
                <select name="head" id="head"></select>
            </div>
    
    
            <!-- type -->
            <div class="input-container">
                <label>Type of node:</label>
                
                <div class="radio-container">
                    <input type="radio" name="type" id="question" value="q">
                    <label for="question">Question</label>
        
                    <input type="radio" name="type" id="answer" value="a">
                    <label for="answer">Answer</label>
                </div>
            </div>
    
    
            <!-- body -->
            <div class="input-container" id="body-container" style="display: none;">
                <label for="body">What's the question?</label>
    
                <input type="text" name="body" id="body">
            </div>
    
    
            <!-- tails -->
            <div class="input-container" id="tails">
                <label>What are the choices?</label>
                <label class="hint"><em>Enter a title or an existing tail number</em></label>
    
                <span id="tail-add">+</span>
    
                <div class="tail-container">
                    <input type="text" name="tail-text-1" id="tail-text-1" class="tail-text"><input type="number" name="tail-num-1" id="tail-num-1" class="tail-num"><span class="tail-delete" id="tail-delete-1">-</span>
                </div>
    
                <input type="hidden" name="tail-count" id="tail-count" value="1">
            </div>
    
    
    
            <input type="submit" name="node-create" value="Create">
        </form>
    </div>





    <script src="./js/main.js"></script>
</body>
</html>