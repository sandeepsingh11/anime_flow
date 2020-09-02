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
    $tailObj = ["Slam Dunk", "One Outs", "Naruto"];
    createNode(69, "a", "testingu", $tailObj);

    ?>
</body>
</html>