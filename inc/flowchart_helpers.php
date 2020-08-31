<?php

$file_path = "./flowchart_mapping.json";
$file = fopen($file_path, "r");
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

function createNode() {}

function updateNode() {}

function deleteNode() {}