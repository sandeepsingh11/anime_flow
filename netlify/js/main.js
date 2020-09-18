// read flowchart_mapping json
var flowchart;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        flowchart_obj = JSON.parse(this.responseText);
        flowchart = flowchart_obj.flowchart;

        startFlowchart();
    }
    else {
        flowchart = null;
    }
};

xmlhttp.open("GET", '../flowchart_mapping.json', true);
xmlhttp.send();





// global vars
var questionsChosen_arr = [];
var currentNodeIndex = 0;
var previousNodeIndex = -1;

var flowchartQuestionEle = document.getElementById("flowchart-question");
var flowchartChoicesContainerEle = document.getElementById("flowchart-choices-container");
var flowchartBackEle = document.getElementById("back");

// previous question logic
flowchartBackEle.addEventListener("click", function() {
    var prevNodeIndex = questionsChosen_arr.pop();
    
    if (prevNodeIndex !== undefined) {
        var prevNode = getNextNode(prevNodeIndex);

        if (prevNode.type === "q") {
            // if question type
            createChoices(prevNode);
        }
        else {
            // if answer type
            createAnswers(prevNode)
        }
    }
});





// start flowchart in front-end
function startFlowchart() {

    // create choices node
    createChoices(flowchart[0]);
}



// create choices nodes
function createChoices(currentNode) {
    
    // update global vals
    previousNodeIndex = getPreviousIndex(currentNodeIndex);
    currentNodeIndex = currentNode.head;
    // console.log(`prev:${previousNodeIndex}, current:${currentNodeIndex}`);

    // clear any existing choices first
    if (flowchartChoicesContainerEle.hasChildNodes()) {
        while (flowchartChoicesContainerEle.firstChild) {
            flowchartChoicesContainerEle.removeChild(flowchartChoicesContainerEle.lastChild);
        }
    }



    // change question
    flowchartQuestionEle.innerHTML = currentNode.body;


    // create choices nodes
    for (var i = 0; i < currentNode.tail.length; i++) {
        var spanNode = document.createElement("span");
        spanNode.setAttribute("class", "flowchart-choice");
        spanNode.setAttribute("data-choice-index", currentNode.tail[i].tail);
        var spanText = document.createTextNode(currentNode.tail[i].fur);
        spanNode.appendChild(spanText);

        spanNode.addEventListener("click", function(e) {
            var clickedEle = e.target;
            var choiceIndex = clickedEle.dataset.choiceIndex; // html attr
            
            

            var nextNode = getNextNode(choiceIndex);

            // update global arr
            questionsChosen_arr.push(currentNode.head);

            if (nextNode.type === "q") {
                // if question type
                createChoices(nextNode);
            }
            else {
                // if answer type
                createAnswers(nextNode)
            }
        });

        flowchartChoicesContainerEle.appendChild(spanNode);
    }
}



// create answer nodes
function createAnswers(answerNode) {

    // update global vals
    previousNodeIndex = getPreviousIndex(currentNodeIndex);
    currentNodeIndex = answerNode.head;


    
    // clear any existing choices first
    if (flowchartChoicesContainerEle.hasChildNodes()) {
        while (flowchartChoicesContainerEle.firstChild) {
            flowchartChoicesContainerEle.removeChild(flowchartChoicesContainerEle.lastChild);
        }
    }



    // change "question" text
    flowchartQuestionEle.innerHTML = "here are the results";


    // create nodes
    for (var i = 0; i < answerNode.tail.length; i++) {
        var spanNode = document.createElement("span");
        spanNode.setAttribute("class", "flowchart-choice");
        spanNode.setAttribute("data-answer-title", answerNode.tail[i]);
        var spanText = document.createTextNode(answerNode.tail[i]);
        spanNode.appendChild(spanText);

        spanNode.addEventListener("click", function(e) {
            var clickedEle = e.target;
            var animeTitle = clickedEle.dataset.answerTitle; // html attr
            
            

            // update global arr
            questionsChosen_arr.push(answerNode.head);



            // create the results
            createResults(animeTitle);
        });

        flowchartChoicesContainerEle.appendChild(spanNode);
    }
}



// create the results
function createResults(animeTitle) {

    // clear any existing choices first
    if (flowchartChoicesContainerEle.hasChildNodes()) {
        while (flowchartChoicesContainerEle.firstChild) {
            flowchartChoicesContainerEle.removeChild(flowchartChoicesContainerEle.lastChild);
        }
    }

    // get and display anime data
    jikanGetAnime(animeTitle);



    // change "question" text
    flowchartQuestionEle.innerHTML = animeTitle;
}



// get previous node
function getPreviousIndex(targetIndex) {
    for (var i = 0; i < flowchart.length; i++) {
        // flowchart index

        for (var j = 0; j < flowchart[i].tail.length; j++) {
            // tail index

            if (flowchart[i].tail[j].tail == targetIndex) {
                return flowchart[i].head;
            }
        }
    }

    return -1;
}



// get question node
function getNextNode(nodeIndex) {
    for (var i = 0; i < flowchart.length; i++) {
        if (flowchart[i].head == nodeIndex) {
            return flowchart[i];
        }
    }

    return -1;
}










// https://jikan.moe/
// Jikan API - search / get anime data
function jikanGetAnime(animeTitle) {

    // start "loading" animation
    var spinDivNode = document.createElement("div");
    spinDivNode.setAttribute("class", "spinner");

    flowchartChoicesContainerEle.append(spinDivNode);


    // https://jikan.docs.apiary.io/#reference/0/search
    fetch(`https://api.jikan.moe/v3/search/anime?q=${animeTitle}&limit=3`)
    .then(function (response) {
        return response.json();
    })
    .then(function (result) {

        // clear any existing choices first
        if (flowchartChoicesContainerEle.hasChildNodes()) {
            while (flowchartChoicesContainerEle.firstChild) {
                flowchartChoicesContainerEle.removeChild(flowchartChoicesContainerEle.lastChild);
            }
        }



        // create anime node(s)
        for (var i = 0; i < result.results.length; i++) {
            // anime container
            var animeNode = document.createElement("div");
            animeNode.setAttribute("class", "anime");



            // anchor and img nodes
            var anchorNode = document.createElement("a");
            anchorNode.setAttribute("href", result.results[i].url);
            anchorNode.setAttribute("target", "_blank");
            // target="_blank" vulnerability:
            // https://www.instagram.com/p/CDgmaJZoJcD/?igshid=1w6yamh3yyxbb
            anchorNode.setAttribute("rel", "noopener noreferrer");
            anchorNode.setAttribute("class", "anime-link");
            
            var imgNode = document.createElement("img");
            imgNode.setAttribute("src", result.results[i].image_url);
            imgNode.setAttribute("alt", `image of ${animeTitle}`);
            imgNode.setAttribute("class", "anime-image");
            
            anchorNode.appendChild(imgNode);



            // h3 node
            var h3Node = document.createElement("h3");
            h3Node.setAttribute("class", "anime-title");
            var h3Text = document.createTextNode(result.results[i].title);
            h3Node.appendChild(h3Text);
            




            animeNode.appendChild(anchorNode);
            animeNode.appendChild(h3Node);

            flowchartChoicesContainerEle.append(animeNode);
        }
    })
}