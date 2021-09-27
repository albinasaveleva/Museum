const tickets = () => {
    const tickets = document.querySelector('#tickets'),
        inputsTicketType = tickets.querySelectorAll('.input-ticket-type'),
        operation = document.querySelectorAll('.operation'),
        totalAmount = tickets.querySelector("#total-amount-count"),
        ticketsButton = tickets.querySelector('#tickets-button'),
        modal = document.querySelector('#modal_booking-tickets'),
        bookingTicketsType = modal.querySelector('#booking-tickets-type'),
        bookingBasicTicketCount = modal.querySelector("#booking-basic-ticket-count"),
        bookingSeniorTicketCount = modal.querySelector("#booking-senior-ticket-count"),
        cardNumber = modal.querySelector('#card-number'),
        cardExpirationMonth = modal.querySelector('#expiration-month'),
        cardExpirationYear = modal.querySelector('#expiration-year'),
        cardHolder = modal.querySelector('#cardholder-name'),
        cardCVC = modal.querySelector('#card-cvc'),
        paymentTotalAmount = modal.querySelector('#payment__total-amount-count'),
        paymentButton = modal.querySelector('#payment__button');


    let ticketDate = '',
        ticketTime = '',
        exhibitionType = '',
        ticketCount = {
            basic : 0,
            senior : 0
        },
        totalAmountCount = 0,
        cardInfo = {
            number: null,
            date: null,
            cardholder: null,
            cvc: null
        };
    
    const  clearInfo = () => {
        exhibitionType = '',
        ticketCount = {
            basic : 0,
            senior : 0
        },
        totalAmountCount = 0;
        changeTotalAmount();
        clearPaymentInfo();
        
    };
    const changeTotalAmount = () => {
        for (let key in ticketCount) {
            if (key === 'basic') {
                totalAmountCount += ticketCount[key] * 20;
            } else if (key === 'senior') {
                totalAmountCount += ticketCount[key] * 10;
            }
        }
        totalAmount.textContent = totalAmountCount;
    }
    operation.forEach(item => {
        item.addEventListener('click', () => {
            let input = item.parentElement.querySelector('input');
            if (item.dataset.type === 'minus') {
                input.stepDown();
                ticketCount[input.dataset.type] = +input.value;
            } else if (item.dataset.type === 'plus') {
                input.stepUp();
                ticketCount[input.dataset.type] = +input.value;
            }
            changeTotalAmount();
        })
    })
    inputsTicketType.forEach(item => {
        item.addEventListener('change', () => {
            ticketsType = item.dataset.type;
        })
    })
    const openModal = () => {
        if (exhibitionType) {
            bookingTicketsType.querySelectorAll('option').forEach(item => {
                if (item.dataset && item.dataset.type === exhibitionType) {
                    item.selected = true;
                }
            })
        }
        if (totalAmountCount) {
            getBookingInfo();
            getPaymentInfo();
            getCardInfo();
        }
    }

    const getBookingInfo = () => {
        modal.querySelectorAll('.booking-ticket-count').forEach(item => {
            if (item.dataset.type === 'basic') {
                item.value = ticketCount.basic;
                item.textContent = ticketCount.basic;
            } else if ( item.dataset.type === 'senior') {
                item.value = ticketCount.senior;
                item.textContent = ticketCount.senior;
            }
        })
    }
    const clearBookingInfo = () => {

    }

    const getPaymentInfo = () => {
        modal.querySelectorAll('.payment__type-item').forEach(item => {
            if (item.dataset.type === 'basic') {
                item.querySelector('.payment__type-count').value = ticketCount.basic;
                item.querySelector('.payment__type-count').textContent = ticketCount.basic;
                item.querySelector('.payment__total-type-amount').value = ticketCount.basic * 20;
                item.querySelector('.payment__total-type-amount').textContent = ticketCount.basic * 20;
            } else if ( item.dataset.type === 'senior') {
                item.querySelector('.payment__type-count').value = ticketCount.senior;
                item.querySelector('.payment__type-count').textContent = ticketCount.senior;
                item.querySelector('.payment__total-type-amount').value = ticketCount.senior * 10;
                item.querySelector('.payment__total-type-amount').textContent = ticketCount.senior * 10;
            }
        })
        paymentTotalAmount.textContent = totalAmountCount;

    }
    const clearPaymentInfo = () => {

        clearCardInfo();
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

        cardNumber.textContent = "";
        cardExpirationMonth.textContent = "";
        cardExpirationYear.textContent = "";
        cardHolder.textContent = "";
        cardCVC.textContent = "";
    }
    const sendData = () => {
        let data = {
            date: ticketDate,
            time: ticketTime,
            exhibition: exhibitionType,
            basic: ticketCount.basic,
            senior: ticketCount.senior,
            total: totalAmountCount,
            card: {
                number: cardInfo.number,
                date: cardInfo.date,
                cardholder: cardInfo.cardholder,
                cvc: cardInfo.cvc
            }
        }
        // for (let key in data) {
        //     if (!data[key]) {
                
        //     }
        // }
        console.log(data)
    }
    ticketsButton.addEventListener('click', openModal);
    paymentButton.addEventListener('click', sendData);

}
export default tickets;