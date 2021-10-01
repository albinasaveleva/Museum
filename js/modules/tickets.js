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
        let currentDate = new Date(),
            currentHours = currentDate.getHours(),
            currentMinutes = currentDate.getMinutes();

        const addMinDateValue = () => {
            let minYear = currentDate.getFullYear(),
            minMonth = currentDate.getMonth(),
            minDate = currentDate.getDate();
        
        const checkLastDay = () => {
            if (new Date(Date.now()).getMonth() === new Date(Date.now() + 86400000).getMonth()) {
                return true;
            } else {
                return false;
            }
        }
        const formateDate = () => {
            if (currentHours >= 18 || 
                (currentHours === 17 && currentMinutes >= 30)) {
                if (checkLastDay()) {
                    minDate++; 
                } else {
                    minDate = 1;
                    minMonth++;
                }
            }
            if ((minMonth + 1) < 10) {
                minMonth = `0${minMonth + 1}`;
            }
            if ((minDate) < 10) {
                minDate = `0${minDate}`;
            }
        }
        formateDate();
        
        bookingInputDate.min = `${minYear}-${minMonth}-${minDate}`;
        }

        addMinDateValue();
        const addTimePoints = () => {
            const addOption = (value) => {
                if (value < 10) {
                    value = `0${value}`;
                } else {
                    value = value.toString();
                }
                if (value.length > 2) {
                    value = `${value.slice(0, 2)}:30`;
                } else {
                    value = `${value.slice(0, 2)}:00`;
                }

                let option = document.createElement('option');
                option.value = value;
                option.textContent = value;
                bookingInputTime.append(option);
            }

            if (currentHours >= 18 || 
            (currentHours === 17 && currentMinutes >= 30)) {
                for (let i = 9; i <= 18; i += 0.5) {
                    let value = i;
                    addOption(value);
                }
            } else if (currentHours === 17 && currentMinutes < 30) {
                let value = '17:30';
                addOption(value);
            } else if (currentHours < 9) {
                for (let i = 9; i <= 18; i += 0.5) {
                    let value = i;
                    addOption(value);
                }
            }else{
                if (currentMinutes < 30) {
                    for (let i = currentHours + 0.5; i <= 17; i += 0.5) {
                        let value = i;
                        addOption(value);
                    }
                } else {
                    for (let i = currentHours + 1; i <= 17; i += 0.5) {
                        let value = i;
                        addOption(value);
                    }
                }
            }   
        }     
        addTimePoints();

        if (ticketAmount) {
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
        // if (totalAmount) {
            getBookingInfo();
            getPaymentInfo();
        // }
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
        const dateValidation = () => {
            if (bookingInputDate.value) {
                bookingInputDate.nextElementSibling.style.display = 'none';
            } else {
                bookingInputDate.nextElementSibling.style.display = '';
            } 
        }
        dateValidation();
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
    const slider = () => {
        const ticketsImage = tickets.querySelector('.tickets__image');

        const addSlides = (images) => {
            images.forEach(item => {
                let img = document.createElement('img');
                img.src = `assets/image/tickets/${item}`;
                img.alt = item;
                ticketsImage.append(img);
            })
        }

        const autoSlider = () => {
            let opacityCount = 0;

            ticketsImage.prepend(ticketsImage.children[ticketsImage.children.length - 1]);
            const animateVisible = () => {
                requestAnimationFrame(animateVisible);
                if (opacityCount < 1) {
                    opacityCount += 0.005;
                    ticketsImage.children[0].style.opacity = opacityCount;
                }
            };
            animateVisible()
        }

        fetch("js/json/tickets.json")
            .then(response => response.json())
            .then(result => addSlides(result))
            .then(() => {
                autoSlider();
                setInterval(autoSlider, 30000);
            })
    }
    slider();

    document.addEventListener('change', (e) => {
        let target = e.target;
        if (target.matches('.ticket-type__input')) {
            ticketType = target.dataset.type;
        } else if (target.matches('#booking__input_date')) {
            validationForm();
            ticketDate = target.value;
            paymentTicketDate.textContent = formateDate(target.value);
        } else if (target.matches('#booking__input_time')) {
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