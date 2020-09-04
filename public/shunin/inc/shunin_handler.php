<?php

include_once("./flowchart_helpers.php");



// print_r($_POST);


$head = $type = $body = $tailCount = NULL;
$tails = [];

if (isset($_POST["head"])) {
    $head = $_POST["head"];
}

if (isset($_POST["type"])) {
    $type = $_POST["type"];
}

if (isset($_POST["body"])) {
    $body = $_POST["body"];
}

if (isset($_POST["tail-count"])) {
    $tailCount = $_POST["tail-count"];

    for ($i = 1; $i <= $tailCount; $i++) {
        array_push($tails, $_POST["tail-" . $i]);
    }
}

createNode($head, $type, $body, $tails);