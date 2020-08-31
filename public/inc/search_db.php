<?php

$filepath = "../anime-offline-database.json";
$file = fopen($filepath, "r");
$fileContent = fread($file, filesize($filepath));
$fileContent_Obj = json_decode($fileContent);


function searchByTitle($title) {
    global $fileContent_Obj;

    $anime_title = $title;
    $i = 0;
    $found = false;
    while ( (!$found) && ($i < sizeof($fileContent_Obj->data)) ) {
        if ($fileContent_Obj->data[$i]->title === $anime_title) {
            $animeObj = $fileContent_Obj->data[$i];
            $found = true;

            return $animeObj;
        }
        else {
            $i++;
        }
    }

    return "Could not find $title";
}

function searchByTag($tag) {
    global $fileContent_Obj;

    $i = 0;
    $found = false;
    $animesArr = [];
    while ( $i < sizeof($fileContent_Obj->data) ) {
        
        for ($j = 0; $j < sizeof($fileContent_Obj->data[$i]->tags); $j++) {
            if ($fileContent_Obj->data[$i]->tags[$j] === $tag) {
                array_push($animesArr, $fileContent_Obj->data[$i]->title);
                $found = true;
                break;
            }
        }

        $i++;
    }

    return $found ? $animesArr : "d";
}

function searchByTags($tags = []) {
    global $fileContent_Obj;

    $i = 0;
    $found = false;
    $animesArr = [];
    while ( $i < sizeof($fileContent_Obj->data) ) {
        // anime index
        $match = 0;
        
        for ($j = 0; $j < sizeof($fileContent_Obj->data[$i]->tags); $j++) {
            // tags index
            
            foreach ($tags as $tag) {
                if ($fileContent_Obj->data[$i]->tags[$j] === $tag) {
                    $match++;
                }
            }

            if ($match === sizeof($tags)) {
                array_push($animesArr, $fileContent_Obj->data[$i]->title);
                $found = true;
                // echo $fileContent_Obj->data[$i]->title;
                break;
            }
        }

        $i++;
    }

    return $found ? $animesArr : "d";
}