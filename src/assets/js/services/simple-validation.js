function sValidation() {
    const valInput = document.querySelectorAll('.__req');
    const exError = document.querySelectorAll('.input_no_valid');
    let result = false;
    if (exError) {
        exError.forEach(element => {
            element.remove();
        });
    }
    valInput.forEach(function (elem) {
        const error = document.createElement('span');
        error.classList.add('input_no_valid');
        error.innerText = 'Please fill out this field';

        elem.classList.remove('no_valid');
        if (elem.type == 'checkbox') {
            if (elem.checked == false) {
                elem.classList.add('no_valid');
                result = false;
            } else result = true;
        }
        if (elem.type != 'checkbox') {
            if (elem.value.length == 0) {
                elem.classList.add('no_valid');
                elem.parentElement.append(error);
                result = false;
            } else result = true;
        }
    });

    return result;
}

export default sValidation;