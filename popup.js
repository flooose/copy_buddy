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

function save_options() {
    var copyFields = {};
    copyFields.type0 = document.getElementById('type0').textContent;
    copyFields.type1 = document.getElementById('type1').textContent;
    copyFields.type2 = document.getElementById('type2').textContent;
    copyFields.type3 = document.getElementById('type3').textContent;

    chrome.storage.sync.set({
        copyFields: copyFields
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function startApp(){
    let input = document.getElementById('copy-input');
    let type0 = document.getElementById('type0');
    let type1 = document.getElementById('type1');
    let type2 = document.getElementById('type2');
    let type3 = document.getElementById('type3');
    const copyFields = chrome.storage.sync.get(null, function({ copyFields }) {
        type0.textContent = copyFields.type0;
        type1.textContent = copyFields.type1;
        type2.textContent = copyFields.type2;
        type3.textContent = copyFields.type3;
    });

    input.addEventListener('keypress', function(event){
        if (event.keyCode === 13) {
            if(this.value !== "") {
                let dataFor = this.getAttribute('data-for');
                if( dataFor !== undefined) {
                    let element = document.getElementById(dataFor)
                    element.textContent = this.value;
                    save_options();
                    element.setAttribute('style', "display: block");
                    this.value="";
                }
            }
        }
    });

    [type0, type1, type2, type3].forEach(function(type){
        type.addEventListener('click', function(event) {
            var range = document.createRange();
            range.selectNode(type);
            window.getSelection().addRange(range);

            try {
                var successful = document.execCommand('copy');
                var msg = successful ? 'successful' : 'unsuccessful';
                console.log('Cutting text command was ' + msg);
            } catch(err) {
                console.log('Oops, unable to cut');
            }
        }.bind(this));
        type.addEventListener('dblclick', function(event) {
            let input = document.getElementById('copy-input');
            let target = event.target;

            input.value = target.textContent;
            input.focus();
            input.setAttribute('data-for', target.id);
            target.setAttribute('style', "display: none");

        }.bind(this));
    });
}


document.addEventListener("DOMContentLoaded", startApp);
