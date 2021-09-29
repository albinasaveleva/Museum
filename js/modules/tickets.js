const tickets = () => {
    const tickets = document.querySelector('#tickets'),
        //tickets
        inputTicketTypeList = tickets.querySelectorAll('.ticket-type__input'),
        inputTicketAmountList = tickets.querySelectorAll('.ticket-amount__input'),
        ticketsTotalAmount = tickets.querySelector("#tickets__total-amount"),

        modal = document.querySelector('#modal_booking-tickets'),
        modalClose = modal.querySelector("#modal__close_booking-tickets"),

        //booking
        booking = modal.querySelector('.booking'),
        bookingInputDate = booking.querySelector('#booking__input_date'),
        bookingInputTime = booking.querySelector('#booking__input_time'),
        bookingInputName = booking.querySelector('#booking__input_name'),
        bookingInputEmail = booking.querySelector('#booking__input_email'),
        bookingInputPhone = booking.querySelector('#booking__input_phone'),
        bookingTicketType = booking.querySelector('#booking__ticket-type'),   
        bookingInputTicketAmountList = booking.querySelectorAll('.ticket-amount__input'),

        //payment
        payment = modal.querySelector('.payment'),
        paymentTicketTime = payment.querySelector('#payment__ticket-time'),
        paymentTicketType = payment.querySelector('#payment__ticket-type'),
        paymentTicketDate = payment.querySelector('#payment__ticket-date'),
        paymentTicketAmountItemList = payment.querySelectorAll('.payment__ticket-amount-item'),
        paymentTotalAmount = payment.querySelector('#payment__total-amount'),
        
        //card
        cardNumber = payment.querySelector('#card-number'),
        cardExpirationMonth = payment.querySelector('#expiration-month'),
        cardExpirationYear = payment.querySelector('#expiration-year'),
        cardHolder = payment.querySelector('#cardholder-name'),
        cardCVC = payment.querySelector('#card-cvc');

    let ticketDate = '',
        ticketTime = '',
        ticketType = '',
        ticketName = '',
        ticketEmail = '',
        ticketPhone = '',
        ticketAmount = {
            basic : 0,
            senior : 0
        },
        basicAmountCount = 20,
        seniorAmountCount = 10,
        totalAmount = 0,
        cardInfo = {
            number: null,
            date: null,
            cardholder: null,
            cvc: null
        };
    
    const  clearInfo = () => {
        ticketDate = '';
        ticketTime = '';
        ticketType = '';
        ticketName = '';
        ticketEmail = '';
        ticketPhone = '';
        ticketAmount = {
            basic : 0,
            senior : 0
        };
        totalAmount = 0;
        cardInfo = {
            number: null,
            date: null,
            cardholder: null,
            cvc: null
        };
        clearTicketsInfo();
        clearPaymentInfo();
        clearCardInfo();
        clearBookingInfo();
        
    };

    const changeTotalAmount = () => {
        let basicAmount = 0,
            seniorAmount = 0;

        for (let key in ticketAmount) {
            if (key === 'basic') {
                basicAmount = ticketAmount[key] * basicAmountCount;
            } else if (key === 'senior') {
                seniorAmount += ticketAmount[key] * seniorAmountCount;
            }
        }
        totalAmount = basicAmount + seniorAmount;
    }
    const clearTicketsInfo = () => {
        inputTicketTypeList.forEach(item => {
            if (item.checked) {
                item.checked = false;
            }
        })
        inputTicketAmountList.forEach(item => {
            item.value = 0;
        })
        ticketsTotalAmount.textContent = '0';
    }

    const getBookingInfo = () => {
        bookingInputTicketAmountList.forEach(item => {
            if (item.dataset.type === 'basic') {
                item.value = ticketAmount.basic;
                item.textContent = ticketAmount.basic;
            } else if ( item.dataset.type === 'senior') {
                item.value = ticketAmount.senior;
                item.textContent = ticketAmount.senior;
            }
        })
    }
    const clearBookingInfo = () => {
        bookingInputDate.value = '';
        bookingInputTime.value = '';
        bookingInputName.value = '';
        bookingInputEmail.value = '';
        bookingInputPhone.value = '';
        bookingTicketType.value = '';
        bookingInputTicketAmountList.forEach(item => {
            item.value = 0;
        })
    }

    const getPaymentInfo = () => {
        paymentTicketAmountItemList.forEach(item => {
            if (item.dataset.type === 'basic') {
                item.querySelector('.payment__ticket-amount-count').textContent = ticketAmount.basic;
                item.querySelector('.payment__ticket-amount').textContent = ticketAmount.basic * basicAmountCount;
            } else if ( item.dataset.type === 'senior') {
                item.querySelector('.payment__ticket-amount-count').textContent = ticketAmount.senior;
                item.querySelector('.payment__ticket-amount').textContent = ticketAmount.senior * seniorAmountCount;
            }
        })
        paymentTotalAmount.textContent = totalAmount;
    }
    const clearPaymentInfo = () => {
        paymentTicketTime.textContent = '';
        paymentTicketType.textContent = '';
        paymentTicketDate.textContent = '';
        paymentTicketAmountItemList.forEach(item => {
            item.querySelector('.payment__ticket-amount-count').textContent = 0;
            item.querySelector('.payment__ticket-amount').textContent = 0;
        })
        paymentTotalAmount.textContent = 0;
    }

    const getCardInfo = () => {
        cardInfo.number = cardNumber.value;
        cardInfo.date = `${cardExpirationMonth.value} ${cardExpirationYear.value}`;
        cardInfo.cardholder= cardHolder.value;
        cardInfo.cvc = cardCVC.value;
    }
    const clearCardInfo = () => {
        for (let key in cardInfo) {
            cardInfo[key] = null;
        }
        cardNumber.value = null;
        cardExpirationMonth.value = null;
        cardExpirationYear.value = null;
        cardHolder.value = null;
        cardCVC.value = null;
    }
    const openModal = () => {
        clearTicketsInfo();
        if (ticketType) {
            bookingTicketType.querySelectorAll('option').forEach(item => {
                if (item.dataset && item.dataset.type === ticketType) {
                    item.selected = true;
                }
            });
            paymentTicketType.textContent = `${ticketType.slice(0, 1).toUpperCase()}${ticketType.slice(1)} exhibition`;
        }
        if (totalAmount) {
            getBookingInfo();
            getPaymentInfo();
        }
        modal.classList.add('modal_open');
        document.body.style.overflowY = 'hidden';
    }
    const closeModal = () => {
        modal.classList.remove('modal_open');
        document.body.style.overflowY = '';
        clearInfo();
    }

    const sendData = () => {
        getCardInfo();
        let data = {
            ticketDate: ticketDate,
            ticketTime: ticketTime,
            ticketType: ticketType,
            ticketName: ticketName,
            ticketEmail: ticketEmail,
            ticketPhone: ticketPhone,
            basicAmount: ticketAmount.basic,
            seniorAmount: ticketAmount.senior,
            totalAmount: totalAmount,
            card: {
                number: cardInfo.number,
                date: cardInfo.date,
                cardholder: cardInfo.cardholder,
                cvc: cardInfo.cvc
            }
        }
        console.log(data)
        closeModal();
        clearInfo();
    }
    const validationForm = () => {
        const form = modal.querySelector('#booking-form');

        const dateValidation = () => {
            const inputDate = form.querySelector('#booking__input_date');
            if (inputDate.value) {
                inputDate.nextElementSibling.style.display = 'none';
            } else {
                inputDate.nextElementSibling.style.display = '';
            }

            let currentDate = new Date();
            let minYear = currentDate.getFullYear(),
                minMonth = '',
                minDate = '';

            if ((currentDate.getMonth() + 1) < 10) {
                minMonth = `0${currentDate.getMonth() + 1}`;
            } else {
                minMonth = currentDate.getMonth() + 1;
            }
            if ((currentDate.getDate() + 1) < 10) {
                minDate = `0${currentDate.getDate()}`;
            } else {
                minDate = currentDate.getDate();
            }

            inputDate.min = `${minYear}-${minMonth}-${minDate}`;
        }
        dateValidation();

        const timeValidation = () => {
            const inputTime = form.querySelector('#booking__input_time');
            if (inputTime.value) {
                inputTime.nextElementSibling.style.display = 'none';
            } else {
                inputTime.nextElementSibling.style.display = '';
            }
        }
        timeValidation();

    }
    validationForm();
    
    const formateDate = (date) => {
        let fullDate = new Date(date);
        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augest', 'September', 'October', 'November', 'December'];
        
        return `${weekDays[fullDate.getDay()]}, ${months[fullDate.getMonth()]} ${fullDate.getDate()}`;
    }
    const formateTime = (time) => {
        return `${time.slice(0, 2)} : ${time.slice(3, 5)}`
    }

    document.addEventListener('change', (e) => {
        let target = e.target;
        if (target.matches('.ticket-type__input')) {
            ticketType = target.dataset.type;
        } else if (target.matches('#booking__input_date')) {
            validationForm();
            ticketDate = target.value;
            paymentTicketDate.textContent = formateDate(target.value);
        } else if (target.matches('#booking__input_time')) {
            validationForm();
            ticketTime = target.value;
            paymentTicketTime.textContent = formateTime(target.value);
        } else if (target.matches('#booking__input_name')) {
            ticketName = target.value;
        } else if (target.matches('#booking__input_email')) {
            ticketEmail = target.value;
        } else if (target.matches('#booking__input_phone')) {
            ticketPhone = target.value;
        } else if (target.matches('#booking__ticket-type')) {
            ticketType = target.value;
            paymentTicketType.textContent = `${ticketType.slice(0, 1).toUpperCase()}${ticketType.slice(1)} exhibition`;
        }
    })
    document.addEventListener('click', (e) => {
        let target = e.target;
        if (target.matches('#tickets__button')) {
            openModal();
        } else if (target.matches('#payment__button')) {
            sendData();
        } else if (target.matches("#modal__close_booking-tickets")) {
            closeModal();
        } else if (target.matches('.operation')) {
            let input = target.parentElement.querySelector('input');
            if (target.dataset.type === 'minus') {
                input.stepDown();
                ticketAmount[input.dataset.type] = +input.value;
                changeTotalAmount();
            } else if (target.dataset.type === 'plus') {
                input.stepUp();
                ticketAmount[input.dataset.type] = +input.value;
                changeTotalAmount();
            }

            if (input.dataset.section === 'tickets') {
                ticketsTotalAmount.textContent = totalAmount;
            } else if (input.dataset.section ===  'modal_booking-tickets') {
                getPaymentInfo();
            }
        }
    })

}
export default tickets;