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


    // get vals from tail choice(s)
    for ($i = 1; $i <= $tailCount; $i++) {
        
        // if text input was filled
        if ( (isset($_POST["tail-text-" . $i])) && ($_POST["tail-text-" . $i] !== "") ) {

            $tailObj = [
                "fur"=> $_POST["tail-text-" . $i], 
                "tail"=>-1
            ];

            array_push($tails, $tailObj); 
        }

        // if number input was filled
        else if ( (isset($_POST["tail-num-" . $i])) && ($_POST["tail-num-" . $i] !== "") ) {

            $tailNumber = $_POST["tail-num-" . $i];

            foreach ($content_json->flowchart as $node) {
                // node index

                if ($node->type === "q") {
                    for ($j = 0; $j < sizeof($node->tail); $j++) {
                        // tail index

                        if ($node->tail[$j]->tail == $tailNumber) {
                            $tailObj = [
                                "fur"=> $node->tail[$j]->fur, 
                                "tail"=> $tailNumber
                            ];

                            array_push($tails, $tailObj); 
                        }
                    }
                }
            }
        }

        // if input[i] was deleted, go to next (by increasing the limit var)
        else {
            $tailCount++;
        }

    }
}

// print_r($tails);

createNode($head, $type, $body, $tails);