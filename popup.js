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

var startApp = function(){
    type0 = document.getElementById('type0');
    type1 = document.getElementById('type1');
    type2 = document.getElementById('type2');
    type3 = document.getElementById('type3');
    const copyFields = chrome.storage.sync.get(null, function({ copyFields }) {
        type0.textContent = copyFields.type0;
        type1.textContent = copyFields.type1;
        type2.textContent = copyFields.type2;
        type3.textContent = copyFields.type3;
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
    });
}


document.addEventListener("DOMContentLoaded", startApp);
