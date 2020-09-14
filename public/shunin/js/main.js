(function() {
    // read flowchart_mapping json
    var flowchart;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            flowchart_obj = JSON.parse(this.responseText);
            flowchart = flowchart_obj.flowchart;

            populatePreHead();
        }
        else {
            flowchart = null;
        }
    };

    xmlhttp.open("GET", '../../flowchart_mapping.json', true);
    xmlhttp.send();









    
    // populate pre-head select element
    var preHeadEle = document.getElementById("pre-head");
    
    function populatePreHead() {
        var preHead_arr = [];
    
        for (var i = 0; i < flowchart.length; i++) {
            if (flowchart[i].type === "q") {
                var tempNode_obj = {head: flowchart[i].head, body: flowchart[i].body};
                preHead_arr.push(tempNode_obj);
    
    
                var optionNode = document.createElement("option");
                optionNode.setAttribute("value", flowchart[i].head);
                var optionText = document.createTextNode(flowchart[i].body);
                optionNode.appendChild(optionText);
    
                preHeadEle.appendChild(optionNode);
            }
        }
    }










    // pre-head select event handler
    preHeadEle.addEventListener("change", function() {
        // get selected option
        for (var i = 0; i < preHeadEle.options.length; i++) {
            if (preHeadEle.options[i].selected === true) {
                // option's value = node's head value
                var head = preHeadEle.options[i].value;
                break;
            }
        }


        // get according node's tail values
        var tails = [];
        for (var i = 0; i < flowchart.length; i++) {
            // flowchart index
            
            if (flowchart[i].head == head) {
                for (var j = 0; j < flowchart[i].tail.length; j++) {
                    // tail index
    
                    var tailObj = {fur: flowchart[i].tail[j].fur, tail: flowchart[i].tail[j].tail};
    
                    // save tail values
                    tails.push(tailObj);
                }

                break;
            }
        }


        // write tail vals back to form
        var headHeadEle = document.getElementById("head");
        // check for existing values and remove them
        if (headHeadEle.hasChildNodes()) {
            while (headHeadEle.firstChild) {
                headHeadEle.removeChild(headHeadEle.lastChild);
            }
        }


        // add new vals
        for (var i = 0; i < tails.length; i++) {
            var optionNode = document.createElement("option");
            optionNode.setAttribute("value", tails[i].tail);
            var optionText = document.createTextNode(tails[i].fur);
            optionNode.appendChild(optionText);

            headHeadEle.appendChild(optionNode);
        }
    });










    // check radio answer
    var radioTypeEle_arr = document.getElementsByName("type");
    radioTypeEle_arr[0].addEventListener("change", radioHandler);
    radioTypeEle_arr[1].addEventListener("change", radioHandler);
    var nodeBodyEle = document.getElementById("body-container");
    
    function radioHandler() {
        for (var i = 0; i < radioTypeEle_arr.length; i++) {
            if (radioTypeEle_arr[i].checked === true) {
                // selected radio

                if (radioTypeEle_arr[i].value === "q") {
                    nodeBodyEle.style.display = "block";
                }
                else {
                    nodeBodyEle.style.display = "none";
                }
            }
        }
    }
    










    // add / remove tail node logic
    var tailAddEle = document.getElementById("tail-add");
    var tailParent = document.getElementById("tails");
    var tailCountEle = document.getElementById("tail-count");
    var tailEleId = 1; // id increment
    var k = 1; // tail counter

    
    // add element -> on click, add new input node
    tailAddEle.addEventListener("click", function() {
        // update tail count
        tailCountEle.setAttribute("value", ++k);


        var divNode = document.createElement("div");
        divNode.setAttribute("class", "tail-container");

        var textInputNode = document.createElement("input");
        textInputNode.setAttribute("type", "text");
        textInputNode.setAttribute("name", "tail-text-" + ++tailEleId);
        textInputNode.setAttribute("id", "tail-text-" + tailEleId);
        textInputNode.setAttribute("class", "tail-text");
        
        var numInputNode = document.createElement("input");
        numInputNode.setAttribute("type", "number");
        numInputNode.setAttribute("name", "tail-num-" + tailEleId);
        numInputNode.setAttribute("id", "tail-num-" + tailEleId);
        numInputNode.setAttribute("class", "tail-num");
        
        var spanNode = document.createElement("span");
        spanNode.setAttribute("class", "button");
        spanNode.setAttribute("id", "tail-delete-" + tailEleId);
        spanNode.setAttribute("class", "tail-delete");
        var spanText = document.createTextNode("-");
        spanNode.appendChild(spanText);
        
        // add listener for the delete node button
        spanNode.addEventListener("click", function(e) {
            var clickedEle = e.target;
            var tailId = clickedEle.getAttribute("id");

            var tailNum = '';
            // get single or double digit
            if (tailId.charAt(tailId.length - 2) === "-") {
                tailNum = tailId.charAt(tailId.length - 1);
            }
            else {
                tailNum = tailId.charAt(tailId.length - 2) + tailId.charAt(tailId.length - 1);
            }

            var tailArr = document.getElementsByClassName("tail-container");
            


            for (var i = 0; i < tailArr.length; i++) {
                var currentTailId = tailArr[i].children[0].getAttribute("id");
                
                var currentTailNum = '';
                // get single or double digit
                if (currentTailId.charAt(currentTailId.length - 2) === "-") {
                    currentTailNum = currentTailId.charAt(currentTailId.length - 1);
                }
                else {
                    currentTailNum = currentTailId.charAt(currentTailId.length - 2) + currentTailId.charAt(currentTailId.length - 1);
                }



                if (currentTailNum === tailNum) {
                    // matched id num; delete targeted node
                    tailArr[i].remove();
                    k--;

                    // update tail count
                    tailCountEle.setAttribute("value", k);

                    break;
                }
            }
        });


        divNode.appendChild(textInputNode);
        divNode.appendChild(numInputNode);
        divNode.appendChild(spanNode);



        tailParent.insertBefore(divNode, tailParent.childNodes[tailParent.childElementCount + 3]);
    })
})();