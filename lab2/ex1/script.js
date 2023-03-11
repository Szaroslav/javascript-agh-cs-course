const f = () => {
    for (let i = 0; i < 4; i++) print(prompt('Type something'));
};

const print = x => {
    console.log(`${x} : ${typeof x}`);
};

// console.log('Text 1');
// window.alert('Text 2');
// document.write('Text 3');

// f();

document.querySelector("input[type='button']").addEventListener('click', () => {
    print(document.forms[0].elements[0].value);
    print(document.forms[0].elements[1].value);
});
