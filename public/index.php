<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Anime Finder</title>
</head>
<body>
    <?php

    require_once("inc/search_db.php");
    
    $animeData = searchByTitle("Hanasaku Iroha");
    print_r($animeData);

    $tagsResult = searchByTags(["female protagonist", "slice of life", "rural", "comedy"]);
    ?>

    <ul>

    <?php

    foreach ($tagsResult as $anime) {
        ?> <li><?php echo $anime ?></li> <?php
    }
    
    ?>

    </ul>

    <?php

    ?>
</body>
</html>