<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shunin | Anime Finder</title>
</head>
<body>
    <?php

    require_once("./inc/flowchart_helpers.php");
    checkHeads();

    ?>

    <form action="./inc/shunin_handler.php" method="post">
        <h2 class="form-title">Create Node</h2>

        <div class="input-container">
            <label for="pre-head">What question does this connect to?</label>
            <select name="pre-head" id="pre-head">
                <option value="NULL"></option>

                <?php

                $nodes = getNodes();
                foreach ($nodes as $node) {
                    ?>

                    <option value="<?php echo $node["head"] ?>"><?php echo $node["body"] ?></option>

                    <?php
                }
                ?> 

            </select>
        </div>

        <div class="input-container">
            <label for="head">What question exactly?</label>

            <select name="head" id="head"></select>
        </div>

        <div class="input-container">
            <label>Type of node:</label>
            
            <input type="radio" name="type" id="question" value="question">
            <label for="question">Question</label>

            <input type="radio" name="type" id="answer" value="answer">
            <label for="question">Answer</label>
        </div>

        <div class="input-container" id="body-container" style="display: none;">
            <label for="body">What's the question?</label>

            <input type="text" name="body" id="body">
        </div>

        <div class="input-container" id="tails">
            <label for="tail">What are the answers?</label>

            <div class="tail-container">
                <input type="text" name="tail-1" id="tail-1">
                <span class="button" id="tail-delete-1">-</span>
            </div>
            
            <span class="button" id="tail-add">+</span>

            <input type="hidden" name="tail-count" id="tail-count" value="1">
        </div>

        <input type="submit" name="node-create" value="Create">
    </form>

    <?php
    // $tailObj = [ 
    //     [
    //         "fur"=> "rural",
    //         "tail"=> 36
    //     ],
    //     [
    //         "fur"=> "city",
    //         "tail"=> 77
    //     ]
    // ];
    // $tailObj = ["Slam Dunk", "One Outs", "Naruto"];
    // createNode(69, "a", "testingu", $tailObj);

    ?>




    <script src="./js/main.js"></script>
</body>
</html>