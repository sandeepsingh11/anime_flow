<?php

$file_path = "../../flowchart_mapping.json";
$file = fopen($file_path, "c+");
$file_read = fread($file, filesize($file_path));
$content_json = json_decode($file_read);

function checkHeads() {
    global $content_json;

    $uniqueHeads = [];
    for ($i = 0; $i < sizeof($content_json->flowchart); $i++) {

        foreach ($uniqueHeads as $head) {
            if ($content_json->flowchart[$i]->head === $head) {
                echo "Duplicate! $head";
            }
        }

        array_push($uniqueHeads, $content_json->flowchart[$i]->head);
    }
}

function checkHeadless() {}

function getNodes() {
    global $content_json;
    
    $nodes = [];
    foreach ($content_json->flowchart as $node) {

        // get only "question" nodes
        if ($node->type === "q") {
            array_push($nodes, ["head"=> $node->head, "body"=> $node->body]);
        }
    }


    return $nodes;
}

function structureNode($head, $type, $body, $tail) {
    $tailStructure = '';

    if ($type === 'question') {
        for ($i = 0; $i < sizeof($tail); $i++) {
            $tailStructure .= '{
                        "fur": "' . $tail[$i]["fur"] . '",
                        "tail": ' . $tail[$i]["tail"] . '  
                    }';
    
            $tailStructure .= ( $i === (sizeof($tail) - 1) ) ? '' : ',';
        }
    }
    else {
        for ($i = 0; $i < sizeof($tail); $i++) {
            $tailStructure .= '"' . $tail[$i] . '"';
    
            $tailStructure .= ( $i === (sizeof($tail) - 1) ) ? '' : ',';
        }
    }


    $structure = 
    '{
            "head": ' . $head . ', 
            "type": "' . $type . '", 
            "body": "' . $body . '", 
            "tail": [
                ' . $tailStructure . '
            ]
        }
    ';

    return $structure;
}

function createNode($head, $type, $body, $tail = []) {
    global $file;

    // go to end of json flowchart array
    fseek($file, -10, SEEK_END);

    fwrite($file, ",\n\t\t");

    $newNode = structureNode($head, $type, $body, $tail);

    fwrite($file, $newNode);
    fwrite($file, "]\n}");

}

function updateNode() {}

function deleteNode() {}