<?php

$file_path = "../../../flowchart_mapping.json";
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

function findMaxTail() {
    global $content_json;
    $max = 0;

    foreach ($content_json->flowchart as $node) {
        // flowchart index

        for ($i = 0; $i < sizeof($node->tail); $i++) {
            // tail index

            // if node's type = question && node's current tail index > max
            if ( ($node->type == "q") && ($node->tail[$i]->tail > $max) ) {
                $max = $node->tail[$i]->tail;
            }
        }
    }


    return $max;
}

function structureNode($head, $type, $body, $tail) {
    $tailStructure = '';
    
    if ($type === 'q') {
        $tailMax = findMaxTail();

        for ($i = 0; $i < sizeof($tail); $i++) {
            $tailStructure .= '{
                    "fur": "' . $tail[$i] . '",
                    "tail": ' . ++$tailMax . '  
                }';
    
            $tailStructure .= ( $i === (sizeof($tail) - 1) ) ? '' : ',
                ';
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
    fwrite($file, "]\n} ");

    fclose($file);

    header("Location: ../shunin.php?ok=node_created!");
    exit();
}

function updateNode() {}

function deleteNode() {}