/* Copyright 2017 Christopher Floess

 *   This file is part of Data Trove.

 *   Data Trove is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.

 *   Data Trove is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 */

document.addEventListener("DOMContentLoaded", startApp);

function startApp(){
    let input = document.getElementById("copy-input");
    let usageMessage = "Click to copy, double-click to edit";

    input.addEventListener("keypress", function(event){
        if (event.keyCode === 13) {
            if(event.shiftKey) {
                return;
            }
            let dataFor = this.getAttribute("data-for");
            event.preventDefault();
            if( dataFor != null ) {
                let element = document.getElementById(dataFor);
                updateElement(this.value, dataFor, element);
                element.setAttribute("style", "display: block");
                this.value="";
            } else {
                saveElementToCopyElements(this.value);
                this.value="";
            }
        }
    });
    input.addEventListener("focus", function(){
        setStatus("Enter to Save, Shift-Enter for new line");
    });
    input.addEventListener("blur", function(){
        setStatus(usageMessage);
    });

    chrome.storage.local.get(null, function(storage) {
        if (storage.copyElements && storage.copyElements.length != 0){
            setStatus(usageMessage);
            storage.copyElements.forEach(function(text, index){
                createElementWithText(text, index);
            });
        }
    });
}

function updateElement(text, id, element) {
    chrome.storage.local.get(null, function(storage) {
        let index = parseInt(id);

        if(text.length == 0) {
            storage.copyElements.splice(index, 1);
        } else {
            storage.copyElements[index] = text;
        }

        let myElement = element;

        chrome.storage.local.set({
            copyElements: storage.copyElements
        }, function() {
            myElement.textContent = text;
        });
    });
}

function saveElementToCopyElements(text) {
    let copyElements;
    chrome.storage.local.get(null, function(storage) {
        if (!storage.copyElements){
            copyElements = [];
        } else {
            copyElements = storage.copyElements;
        }

        if(text.length != 0) {
            copyElements.push(text);
        }

        chrome.storage.local.set({
            copyElements: copyElements
        }, function() {
            createElementWithText(text, copyElements.length - 1);
        }.bind(this));
    });
}

var timer = 0;
var delay = 200;
var prevent = false;

function createElementWithText(text, id) {
    let container = document.getElementById("container");
    let newDiv = document.createElement("div");
    let newP = document.createElement("p");

    newP.textContent = text;
    newP.setAttribute("id", id);
    newDiv.appendChild(newP);
    container.appendChild(newDiv);

    newP.addEventListener("click", function(event) {
        timer = setTimeout(function() {
            if (!prevent) {
                var range = document.createRange();
                range.selectNode(event.target);
                window.getSelection().addRange(range);
                try {
                    document.execCommand("copy");
                    setStatus("\"" + newP.textContent + "\" copied to clipboard");
                    setTimeout(window.close, 500);
                } catch(err) {
                    console.log("Oops, unable to cut");
                }
            }
            prevent = false;
        }, delay);

    });
    newP.addEventListener("dblclick", function(event) {
        clearTimeout(timer);
        prevent = true;
        let input = document.getElementById("copy-input");
        let target = event.target;
        input.value = target.textContent;
        input.focus();
        input.setAttribute("data-for", target.id);
        target.setAttribute("style", "display: none");

    }.bind(this));
}


function setStatus(text) {
    let status = document.getElementById("status");
    status.textContent = text;
}
