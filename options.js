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
    copyFields.type0 = document.getElementById('type0').value;
    copyFields.type1 = document.getElementById('type1').value;
    copyFields.type2 = document.getElementById('type2').value;
    copyFields.type3 = document.getElementById('type3').value;

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

function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    const copyFields = chrome.storage.sync.get(null, function({ copyFields }) {
        document.getElementById('type0').value = copyFields.type0;
        document.getElementById('type1').value = copyFields.type1;
        document.getElementById('type2').value = copyFields.type2;
        document.getElementById('type3').value = copyFields.type3;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('save').addEventListener('click', save_options);
