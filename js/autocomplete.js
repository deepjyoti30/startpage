function autocomplete(inp, passedValues, style) {
    var currentFocus;

    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var item, val = this.value;
        var parentContainer = document.getElementsByClassName('autocomplete-items-container')[0];
        
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) {
            parentContainer.style.paddingBottom = "0";
            return false;
        }
        currentFocus = -1;

        // Update some values of the parent container
        parentContainer.setAttribute("id", this.id + "-autocomplete-list");
        parentContainer.style.paddingBottom = "1rem";

        if(style["searchBackgroundColor"]) {
            parentContainer.style.backgroundColor = style["searchBackgroundColor"];
        }

        /*for each item in the array...*/
        Object.keys(passedValues).forEach((el, i, arr) => {

          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].toLowerCase().includes(val.toLowerCase())) {
            /*create a DIV element for each matching element:*/
            item = document.createElement("DIV");
            item.setAttribute("class", "autocomplete-item");
            // Add the url as an attribute
            item.setAttribute('url', passedValues[el]);

            if(style["searchBackgroundColor"]) {
                item.style.backgroundColor = style["searchBackgroundColor"];
            }

            if(style["searchColor"]) {
                item.style.color = style["searchColor"];
            }
            
            /*make the matching letters bold:*/
            item.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            item.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            item.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                item.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            parentContainer.appendChild(item);
          }
        })
    });

    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "-autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        }
        else if (e.keyCode == 38) {
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        }
        else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            if (currentFocus > -1) {
                e.preventDefault();
                /*and simulate a click on the "active" item:*/
                if (x) window.location = x[0].getAttribute('url');
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        document.getElementsByClassName("autocomplete-items-container")[0].innerHTML = "";
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}