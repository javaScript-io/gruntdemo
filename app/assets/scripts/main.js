(function($doc){
    'use strict';

    $doc.addEventListener('DOMContentLoaded', function(){
        var myDiv = $doc.getElementById('testdiv'),
            myText = $doc.createTextNode('Hi, everybody - this is some dynamic content!');

        myDiv.appendChild(myText);
    });
}(document));
