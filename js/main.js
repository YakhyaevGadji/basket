const dataCarts = document.querySelectorAll('[data-cart]');
const cartWrapper = document.querySelector('.cart-wrapper');
const cardsBody = document.querySelectorAll('.basket__parent');
const parent = document.querySelector('.mb-5');
const emptyBasket = document.querySelector('[data-cart-empty]');

parent.addEventListener('click', counterPlus);
parent.addEventListener('click', counterMinus);

let tasks = [];

dataCarts.forEach((dataCart) => {
    dataCart.addEventListener('click', addTask);
});

checkBasketInEmptyAndCalc();

//Создание Html разметки в карзине
function addTask(event) {
    const cart = event.target.closest('.card');
    
    const taskElements = {
        id: cart.dataset.id,
        srcImg: cart.querySelector('.product-img').getAttribute('src'),
        title: cart.querySelector('.item-title').textContent,
        itemsInBox: cart.querySelector('[data-items-in-box]').textContent,
        counter: cart.querySelector('[data-counter]').textContent,
        weight: cart.querySelector('.price__weight').textContent,
        price: cart.querySelector('.price__currency').textContent
    }
    
    cartWrapper.insertAdjacentHTML('beforeend', taskHtml(taskElements));

    
    tasks.push(taskElements);

    const serchTask = cartWrapper.querySelector(`${taskElements.id}`);

    if(serchTask) {
        console.log(true);
    }else {
        console.log(false);
    }

    checkBasketInEmptyAndCalc();
};

//Html разметка карточки
function taskHtml(taskElements) {
    const taskHTML = `<div class="cart-item" data-id="${taskElements.id}">
        <div class="cart-item__top">
            <div class="cart-item__img">
                <img src="${taskElements.srcImg}" alt="">
            </div>
            <div class="cart-item__desc">
            <div class="cart-item__title">${taskElements.title}</div>
            <div class="cart-item__weight">${taskElements.itemsInBox} / ${taskElements.weight}</div>

                <div class="cart-item__details">

                    <div class="items items--small counter-wrapper">
                        <div class="items__control" data-action="minus">-</div>
                        <div class="items__current" data-counter="">${taskElements.counter}</div>
                        <div class="items__control" data-action="plus">+</div>
                    </div>

                    <div class="price">
                        <div class="price__currency">${taskElements.price}</div>
                    </div>

                </div>

            </div>
        </div>
    </div>`;

    return taskHTML;
}

//убавление счетика карточек
function counterPlus(event) {
    const buttonPlus = event.target.dataset.action;

    if(buttonPlus === 'plus') {
        const counterWrapper = event.target.closest('.counter-wrapper');
        const counter = counterWrapper.querySelector('[data-counter]');
        counter.textContent++;
    }
    checkBasketInEmptyAndCalc()
}

//добавление счеткчика в карзине
function counterMinus(event) {
    const buttonPlus = event.target.dataset.action;

    if(buttonPlus === 'minus') {
        const counterWrapper = event.target.closest('.counter-wrapper');
        const counter = counterWrapper.querySelector('[data-counter]');

        if(counter.textContent > 1) {
            counter.textContent--;
        }else if(Number(counter.textContent) === 1 && counterWrapper.closest('.cart-wrapper')) {
            counterWrapper.closest('.cart-item').remove();

            const cartItem = counterWrapper.closest('.cart-item').dataset.id;
    
            const index = tasks.findIndex((task) => {
                if(+task.id === +cartItem) {
                    return true;
                }
            });
        
            tasks.splice(index, 1);

            
        }
        checkBasketInEmptyAndCalc();
    }
}
function checkBasketInEmptyAndCalc() {
    const delivery = document.querySelector('.delivery');
    const order = document.querySelector('#order-form');
    const priceCurrency = cartWrapper.querySelectorAll('.price__currency');
    const totalPrice = document.querySelector('.total-price');

    let currency = 0;
    priceCurrency.forEach((item) => {
        const taskPrice = item.textContent;
        const taskCounter = item.closest('.cart-item').querySelector('[data-counter]');
        const deliveryCost = document.querySelector('.delivery-cost');

        currency += parseInt(taskPrice) * taskCounter.textContent;
        
        if(currency > 600) {
            deliveryCost.textContent = 'бесплатно';
            deliveryCost.classList.add('free');
        }else {
            deliveryCost.textContent = '200 ₽';
            deliveryCost.classList.remove('free');
        }
    });

    totalPrice.textContent = currency;

    if(cartWrapper.children.length >= 1) {
        emptyBasket.classList.add('none');
        delivery.classList.remove('none');
        order.classList.remove('none');
        
    }else {
        order.classList.add('none');
        emptyBasket.classList.remove('none');
        delivery.classList.add('none');
    }
}
