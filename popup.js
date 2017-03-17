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
function setStorage(callback){
    chrome.storage.local.get(null, callback);
}
function saveElementToCopyElements(element) {
    let copyElements;
    setStorage(function(storage) {
        if (!storage.copyElements){
            copyElements = [];
        } else {
            copyElements = storage.copyElements;
        }
        copyElements.push(element);

        myCopyElements = copyElements;
        chrome.storage.local.set({
            copyElements: copyElements
        }, function() {
            createElementWithText(element, copyElements.length - 1);
        }.bind(this));
    });
}

function updateElement(text, id, element) {
    let copyElements;
    setStorage(function(storage) {
        let index = parseInt(id);
        storage.copyElements[index] = text;

        let myElement = element;

        chrome.storage.local.set({
            copyElements: storage.copyElements
        }, function() {
            myElement.textContent = text;
            chrome.storage.local.get(null, function (result) {
                console.log('blub',result)
            });
        });
    }.bind(this));
}

function createElementWithText(text, id) {
    let container = document.getElementById('container');
    let newDiv = document.createElement('div');
    let newP = document.createElement('p');

    newP.textContent = text;
    newP.setAttribute("id", id);
    newDiv.appendChild(newP);
    container.appendChild(newDiv);
debugger;
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
        status.textContent = '';
    }, 750);
    newP.addEventListener('click', function(event) {
        var range = document.createRange();
        range.selectNode(event.target);
        window.getSelection().addRange(range);

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Cutting text command was ' + msg);
        } catch(err) {
            console.log('Oops, unable to cut');
        }
    });
    newP.addEventListener('dblclick', function(event) {
        let input = document.getElementById('copy-input');
        let target = event.target;

        input.value = target.textContent;
        input.focus();
        input.setAttribute('data-for', target.id);
        target.setAttribute('style', "display: none");

    }.bind(this));
}

function startApp(){
    let input = document.getElementById('copy-input');
    /* let type0 = document.getElementById('type0');
     * let type1 = document.getElementById('type1');
     * let type2 = document.getElementById('type2');
     * let type3 = document.getElementById('type3');
     * const copyFields = chrome.storage.sync.get(null, function({ copyFields }) {
     *     type0.textContent = copyFields.type0;
     *     type1.textContent = copyFields.type1;
     *     type2.textContent = copyFields.type2;
     *     type3.textContent = copyFields.type3;
     * });
     */
    chrome.storage.local.get(null, function(storage) {
        if (storage.copyElements){
            storage.copyElements.forEach(function(text, index){
                createElementWithText(text, index);
            });
        }
    });

    input.addEventListener('keypress', function(event){
        if (event.keyCode === 13) {
            if(event.shiftKey) {
                return;
            }
            let dataFor = this.getAttribute('data-for');
            event.preventDefault();
            if( dataFor != null ) {
                let element = document.getElementById(dataFor)
                updateElement(this.value, dataFor, element);
                element.setAttribute('style', "display: block");
                this.value="";
            } else {
                saveElementToCopyElements(this.value)
                //element.setAttribute('style', "display: block");
                this.value="";
            }
        }
    });

}


document.addEventListener("DOMContentLoaded", startApp);
