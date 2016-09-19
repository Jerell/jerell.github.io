//  I've been told having global variables is bad but it's useful to be able to call these functions from the console as I work on them so I'll leave the globals for now and wrap them up in a function or something later.


// -- here I add space to the first .item so none of it is hidden behind the header -- //
var header = document.getElementsByTagName("header")[0];

function clearHeader() {
    var height = window.getComputedStyle(header).height;
    document.getElementsByTagName("main")[0].style.marginTop = height;
    if (height) {
        return "Pushed by" + height;
    }
}
clearHeader();
// -- End header spacing -- //


// -- AJAX -- //
var fileContent,
    loadedText = false;

function loadText(elem) {
    if (loadedText === false) {
        var textFile = new XMLHttpRequest();
        textFile.open("GET", "assets/load.txt", true);
        textFile.onreadystatechange = function () {
            if (textFile.readyState === 4 && textFile.status === 200) {
                fileContent = textFile.responseText;
                window.setTimeout(function () {
                    elem.innerHTML = fileContent;
                }, 50);
            }
        };
        textFile.send();
    }
    loadedText = true;
}

document.getElementById("loadText").addEventListener("click", function () {
    loadText(this);
});
// -- End AJAX -- //


// -- flashy text spacing -- //
function spaceChars() {
    var hHeight = window.getComputedStyle(header).height;  // grab the height of the header element
    hHeight = hHeight.substring(0, hHeight.length - 2); // Remove 'px' from the value
    var hSpan = document.querySelector("header h1 span"),  //select the span tag in the header
        shouldSpace = window.pageYOffset > hHeight ? true : false,  // shouldSpace if window scrolls further than header height
        isSpaced = hSpan.className.indexOf("spaced");  // check if the letters are already spaced
    if (shouldSpace && isSpaced == -1) {
        hSpan.className += " spaced";
    } else if (!shouldSpace && isSpaced > -1) {
        hSpan.className = hSpan.className.substr(0, isSpaced) + hSpan.className.substr(isSpaced + hSpan.className.length);
    }
    header.children[0].blur();
    return shouldSpace;
}

window.addEventListener("scroll", spaceChars);
//Safari's being a pleb
// -- End flashy text spacing -- //


// -- Info tabs (jQuery)-- //
$('.info').click(function(event){
    $(this).toggleClass('open');
    setTimeout(function(){
        $(event.target).children().toggleClass('show')
        console.log("tada");
    }, 200);
});
// -- End info tabs -- //