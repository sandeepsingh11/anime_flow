(function() {
    // read flowchart_mapping json
    var flowchart;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            flowchart_obj = JSON.parse(this.responseText);
            flowchart = flowchart_obj.flowchart;
            // console.log(anime_db.flowchart[0].head);
        }
        else {
            flowchart = null;
        }
    };

    xmlhttp.open("GET", '../../flowchart_mapping.json', true);
    xmlhttp.send(); 





    // select handler
    var selectEle = document.getElementById("head");

    selectEle.addEventListener("change", function(e) {
        // get selected option
        for (var i = 0; i < selectEle.options.length; i++) {
            if (selectEle.options[i].selected === true) {
                // option's value = node's head value
                var head = selectEle.options[i].value;
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
        var headHeadEle = document.getElementById("head-head");
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

})();


function readFlowchart() {
    var anime_db = "asjdnskajn";

    // read flowchart_mapping json
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            anime_db = JSON.parse(this.responseText);
            // console.log(anime_db.flowchart[0].head);
            // return anime_db;
        }
        else {
            return null;
        }

        // console.log(anime_db);  
        return anime_db;
    };

    xmlhttp.open("GET", '../../flowchart_mapping.json', true);
    xmlhttp.send(); 
}