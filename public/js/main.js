// console.log("here");


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
var currentNodeIndex = 0;
var previousNodeIndex = -1;

var flowchartQuestionEle = document.getElementById("flowchart-question");
var flowchartChoicesContainerEle = document.getElementById("flowchart-choices-container");
var flowchartBackEle = document.getElementById("flowchart-back");

flowchartBackEle.addEventListener("click", function() {
    var prevQuestionNode = getQuestionNode(previousNodeIndex);
    createChoices(prevQuestionNode);
});





// start flowchart in front-end
function startFlowchart() {
    flowchartQuestionEle.innerHTML = flowchart[0].body;
    
    
    // create choices node
    createChoices(flowchart[0]);
}



// create choices nodes
function createChoices(currentNode) {
    
    // update global vals
    previousNodeIndex = getPreviousIndex(currentNodeIndex);
    currentNodeIndex = currentNode.head;
    console.log(`prev:${previousNodeIndex}, current:${currentNodeIndex}`);

    // clear any existing choices first
    if (flowchartChoicesContainerEle.hasChildNodes()) {
        while (flowchartChoicesContainerEle.firstChild) {
            flowchartChoicesContainerEle.removeChild(flowchartChoicesContainerEle.lastChild);
        }
    }


    // create nodes
    for (var i = 0; i < currentNode.tail.length; i++) {
        var spanNode = document.createElement("span");
        spanNode.setAttribute("class", "flowchart-choice");
        spanNode.setAttribute("data-choice-index", currentNode.tail[i].tail);
        var spanText = document.createTextNode(currentNode.tail[i].fur);
        spanNode.appendChild(spanText);

        spanNode.addEventListener("click", function(e) {
            var clickedEle = e.target;
            var choiceIndex = clickedEle.dataset.choiceIndex; // html attr
            
            
            var nextQuestionNode = getQuestionNode(choiceIndex);
            createChoices(nextQuestionNode);
        });

        flowchartChoicesContainerEle.appendChild(spanNode);
    }
}



// get previous node =================== MAYBE JUST MAKE A "QUESTIONS CHOSEN" ARRAY LMAO
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
function getQuestionNode(nodeIndex) {
    for (var i = 0; i < flowchart.length; i++) {
        if (flowchart[i].head == nodeIndex) {
            return flowchart[i];
        }
    }

    return -1;
}