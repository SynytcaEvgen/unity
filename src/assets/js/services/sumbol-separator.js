function onlyNubmerInput(intext) {
  let jin = document.querySelectorAll(intext);
  for (let i = 0; i < jin.length; i++) {
    jin[i].addEventListener('input', function(e){
     this.value = this.value.replace(/[^0-9]/g, "");
    });
  };
};

function onlyLetterInput(intext) {
  let jin = document.querySelectorAll(intext);
  for (let i = 0; i < jin.length; i++) {
    jin[i].addEventListener('input', function(e){
     this.value = this.value.replace(/\d/g, "");
     this.value = this.value.replace(/[.*_~`+;₴$₽'":%#@!*?^$-=<>№{}()|[\]\\]/g, "");
    });
  };
};

export {onlyNubmerInput, onlyLetterInput};
