import Swiper from 'swiper/bundle';
import intlTelInput from 'intl-tel-input';
import { onlyNubmerInput } from './services/sumbol-separator';
import sValidation from './services/simple-validation';

import 'swiper/css';
import 'intl-tel-input/build/css/intlTelInput.css';

window.addEventListener('DOMContentLoaded', init);

function init() {

    // __corect style dispatch block
    const dispatchItem = document.querySelectorAll('.dispatch__item');

    if (dispatchItem) {
        if (dispatchItem.length % 3 == 2) {
            dispatchItem[dispatchItem.length - 1].classList.add('last_two');
            dispatchItem[dispatchItem.length - 2].classList.add('last_two');
        }
        if (dispatchItem.length % 3 == 1) {
            dispatchItem[dispatchItem.length - 1].classList.add('last_one');
        }
    }

    // __corect style dispatch block

    // swiper
    const swiper = new Swiper('.slider_time_bg', {
        autoplay: {
            delay: 4500,
        },
        speed: 1200,
        loop: true

    });
    // swiper

    const inputPhone = document.querySelector(".phone_input");
    intlTelInput(inputPhone, {
        separateDialCode: true,
    });

    onlyNubmerInput('.only_number');
    const formBtn = document.querySelector('.submit_form');
    if (formBtn) {
        formBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sValidation();
            if (sValidation()) {
                alert('We will contact you ASAP');
                formBtn.form.reset();
            };
        });
    };
    

    


}