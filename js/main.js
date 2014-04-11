/*global document, window, XMLHttpRequest, console */

var header = document.getElementsByTagName("header")[0];

function clearHeader() {
    var height = window.getComputedStyle(header).height;
    document.getElementsByClassName("main")[0].style.marginTop = height;
    if (height) {
        return "Pushed by" + height;
    }
}
clearHeader();

function toggleClass(element, className) {
    if (!element || !className) {
        return;
    }
    var classString = element.className,
        nameIndex = classString.indexOf(className);
    if (nameIndex == -1) {
        classString += ' ' + className;
    } else {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
    }
    element.className = classString;
}

var fileContent,
    loadedText = false;

function loadText(elem) {
    if (loadedText === false) {
        var textFile = new XMLHttpRequest();
        textFile.open("GET", "../assets/load.txt", true);
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

function spaceChars() {
    var hHeight = window.getComputedStyle(header).height;
    hHeight = hHeight.substring(0, hHeight.length - 2); // Remove px
    var hSpan = document.querySelector("header h1 span"),
        shouldSpace = document.body.scrollTop > hHeight ? true : false,
        isSpaced = hSpan.className.indexOf("spaced");
    if (shouldSpace && isSpaced == -1) {
        hSpan.className += " spaced";
    } else if (!shouldSpace && isSpaced > -1) {
        hSpan.className = hSpan.className.substr(0, isSpaced) + hSpan.className.substr(isSpaced + hSpan.className.length);
    }
    return hHeight < document.body.scrollTop ? true : false;
}

window.addEventListener("scroll", spaceChars);
