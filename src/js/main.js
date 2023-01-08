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





// hide "back" arrow when scroll past flowchart
var winHeight = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;


window.addEventListener("scroll", function() {
    var currentHeight = document.body.scrollTop 
    || document.documentElement.scrollTop;

    var backEle = document.getElementById("flowchart-back-container");
    if ( (currentHeight + 50) >= winHeight ) {
        backEle.style.display = "none";
    }
    else {
        backEle.style.display = "block";
    }
});





// keep track of flowchart ans
var questionsChosen_arr = [];





// main flowchart elements
var flowchartQuestionEle = document.getElementById("flowchart-question");
var flowchartChoicesContainerEle = document.getElementById("flowchart-choices-container");
var flowchartBackEle = document.getElementById("flowchart-back-container");

// previous question logic
flowchartBackEle.addEventListener("click", function() {
    var prevNodeIndex = questionsChosen_arr.pop();
    
    if (prevNodeIndex !== undefined) {
        var prevNode = getNextNode(prevNodeIndex);

        createNodes(prevNode, prevNode.type);
    }
});





// start flowchart in front-end
function startFlowchart() {

    // create choices node
    createNodes(flowchart[0], 'q');
}





function createNodes(currentNode, type) {

    // clear any existing choices first
    if (flowchartChoicesContainerEle.hasChildNodes()) {
        while (flowchartChoicesContainerEle.firstChild) {
            flowchartChoicesContainerEle.removeChild(flowchartChoicesContainerEle.lastChild);
        }
    }





    // change question text
    flowchartQuestionEle.innerHTML = (type === 'q') 
        ? currentNode.ques 
        : "here are the results";





    // create nodes

    // create choices nodes
    if (type === 'q') {
        for (var i = 0; i < currentNode.tails.length; i++) {
            var spanNode = document.createElement("span");
            spanNode.setAttribute("class", "button flowchart-button");
            spanNode.setAttribute("data-choice-index", currentNode.tails[i].tail);
            var spanText = document.createTextNode(currentNode.tails[i].ans);
            spanNode.appendChild(spanText);
    
            spanNode.addEventListener("click", function(e) {
                var clickedEle = e.target;
                var choiceIndex = clickedEle.dataset.choiceIndex; // html attr
                
                
    
                // update flowchart arr
                questionsChosen_arr.push(currentNode.head);
                
                
                
                // create new nodes for next question / answer
                var nextNode = getNextNode(choiceIndex);

                createNodes(nextNode, nextNode.type);
            });
    
            flowchartChoicesContainerEle.appendChild(spanNode);
    
            fadeIn(spanNode);
        }
    }

    // else create results nodes
    else {
        for (var i = 0; i < currentNode.tails.length; i++) {
            var spanNode = document.createElement("span");
            spanNode.setAttribute("class", "button flowchart-button");
            spanNode.setAttribute("data-answer-title", currentNode.tails[i]);
            var spanText = document.createTextNode(currentNode.tails[i]);
            spanNode.appendChild(spanText);
    
            spanNode.addEventListener("click", function(e) {
                var clickedEle = e.target;
                var animeTitle = clickedEle.dataset.answerTitle; // html attr
                
                
    
                // update flowchart arr
                questionsChosen_arr.push(currentNode.head);
    
    
    
                // create the result
                createResult(animeTitle);
            });
    
            flowchartChoicesContainerEle.appendChild(spanNode);
    
            fadeIn(spanNode);
        }
    }



    // node fade in animation
    function fadeIn(ele) {
        var opacity = 0;
        var id = setInterval(() => {
            if (ele.style.opacity == 1) {
                clearInterval(id);
            }
            else {
                opacity += 0.02;
                ele.style.opacity = opacity;
            }
        }, 10);
    }
}





// create the result
function createResult(animeTitle) {

    // clear any existing choices first
    if (flowchartChoicesContainerEle.hasChildNodes()) {
        while (flowchartChoicesContainerEle.firstChild) {
            flowchartChoicesContainerEle.removeChild(flowchartChoicesContainerEle.lastChild);
        }
    }



    // get and display anime data from Jikan API
    jikanGetAnime(animeTitle);



    // change "question" text
    flowchartQuestionEle.innerHTML = animeTitle;
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
    fetch(`https://api.jikan.moe/v4/anime?q=${animeTitle}&limit=3`)
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



        // create anime nodes
        for (var i = 0; i < result.data.length; i++) {
            // anime container
            var animeNode = document.createElement("div");
            animeNode.setAttribute("class", "anime");



            // anchor and img nodes
            var anchorNode = document.createElement("a");
            anchorNode.setAttribute("href", result.data[i].url);
            anchorNode.setAttribute("target", "_blank");
            // target="_blank" vulnerability:
            // https://www.instagram.com/p/CDgmaJZoJcD/?igshid=1w6yamh3yyxbb
            anchorNode.setAttribute("rel", "noopener noreferrer");
            anchorNode.setAttribute("class", "anime-link");
            
            var imgNode = document.createElement("img");
            imgNode.setAttribute("src", result.data[i].images.jpg.image_url);
            imgNode.setAttribute("alt", `image of ${animeTitle}`);
            imgNode.setAttribute("class", "anime-image");
            
            anchorNode.appendChild(imgNode);



            // anchor and p nodes
            var anchorNode2 = document.createElement("a");
            anchorNode2.setAttribute("href", result.data[i].url);
            anchorNode2.setAttribute("target", "_blank");
            anchorNode2.setAttribute("rel", "noopener noreferrer");
            anchorNode2.setAttribute("class", "anime-link");
            
            var pNode = document.createElement("p");
            pNode.setAttribute("class", "anime-title");
            var pText = document.createTextNode(result.data[i].title);
            pNode.appendChild(pText);

            anchorNode2.appendChild(pNode);
            




            animeNode.appendChild(anchorNode);
            animeNode.appendChild(anchorNode2);

            flowchartChoicesContainerEle.append(animeNode);
        }
    })
}