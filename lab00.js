'use strict';

function reduceString(str){
    if(str.length < 2)
        console.log('')
    else
        console.log(str[0]+str[1]+str[str.length-2]+str[str.length-1])

}

const stringArray = ['antonio', 'è', 'down'];

stringArray.forEach(reduceString);
