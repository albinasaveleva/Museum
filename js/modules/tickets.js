const tickets = () => {
    const tickets = document.querySelector('#tickets'),
        //tickets
        inputTicketTypeList = tickets.querySelectorAll('.ticket-type__input'),
        inputTicketAmountList = tickets.querySelectorAll('.ticket-amount__input'),
        ticketsTotalAmount = tickets.querySelector("#tickets__total-amount"),

        modal = document.querySelector('#modal_booking-tickets'),

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
    
    // const  clearInfo = () => {
    //     ticketDate = '',
    //     ticketTime = '',
    //     exhibitionType = '',
    //     ticketAmount = {
    //         basic : 0,
    //         senior : 0
    //     },
    //     totalAmountCount = 0;

    //     changeTotalAmount();
    //     clearPaymentInfo();
    //     clearCardInfo();
    //     clearBookingInfo();
        
    // };
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

    }

    const getCardInfo = () => {
        cardInfo.number = cardNumber.value;
        cardInfo.date = `${cardExpirationMonth.value} ${cardExpirationYear.value}`;
        cardInfo.cardholder= cardHolder.value;
        cardInfo.cvc = cardCVC.value;
    }
    // const clearCardInfo = () => {
    //     for (let key in cardInfo) {
    //         cardInfo[key] = null;
    //     }
    //     cardNumber.value = null;
    //     cardExpirationMonth.value = null;
    //     cardExpirationYear.value = null;
    //     cardHolder.value = null;
    //     cardCVC.value = null;

    //     cardNumber.textContent = "";
    //     cardExpirationMonth.textContent = "";
    //     cardExpirationYear.textContent = "";
    //     cardHolder.textContent = "";
    //     cardCVC.textContent = "";
    // }
    const sendData = () => {
        getCardInfo();
        let data = {
            ticketDate: ticketDate,
            ticketTime: ticketTime,
            ticketType: ticketType,
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
    //     // for (let key in data) {
    //     //     if (!data[key]) {
                
    //     //     }
    //     // }
        console.log(data)
    }

    document.addEventListener('change', (e) => {
        let target = e.target;
        if (target.matches('.ticket-type__input')) {
            ticketType = target.dataset.type;
        } else if (target.matches('#booking__input_date')) {
            ticketDate = target.value;
            paymentTicketDate.textContent = target.value;
        } else if (target.matches('#booking__input_time')) {
            ticketTime = target.value;
            paymentTicketTime.textContent = target.value;
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
                // paymentTotalAmount.textContent = totalAmount;
            }
               
        }
    })

}
export default tickets;