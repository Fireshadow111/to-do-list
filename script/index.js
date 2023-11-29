let input = document.getElementById('input');
let addButton = document.getElementById('add');
let sortButton = document.getElementById('sort');


function validation() {

    let inputV = input.value.trim();

    if (inputV !== '' && inputV.length > 3 && inputV[0] === inputV[0].toUpperCase()) {
   
        alert('Valid input');
    } else {
        alert('Invalid input');
    }
}

addButton.addEventListener('click', validation);


