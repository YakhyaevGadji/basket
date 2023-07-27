const dataCarts = document.querySelectorAll('[data-cart]');
const cartWrapper = document.querySelector('.cart-wrapper');
const cardsBody = document.querySelectorAll('.basket__parent');
const parent = document.querySelector('.mb-5');
const emptyBasket = document.querySelector('[data-cart-empty]');

parent.addEventListener('click', counterPlus);
parent.addEventListener('click', counterMinus);


dataCarts.forEach((dataCart) => {
    dataCart.addEventListener('click', addTask);
});

checkBasketInEmpty();

//Создание Html разметки в карзине
function addTask(event) {
    const cart = event.target.closest('.card');
    
    const taskElements = {
        id: cart.dataset.id,
        srcImg: cart.querySelector('.product-img').getAttribute('src'),
        title: cart.querySelector('.item-title').textContent,
        itemsInBox: cart.querySelector('[data-items-in-box').textContent,
        counter: cart.querySelector('[data-counter]').textContent,
        weight: cart.querySelector('.price__weight').textContent,
        price: cart.querySelector('.price__currency').textContent
    }
    
    cartWrapper.insertAdjacentHTML('beforeend', taskHtml(taskElements));

    checkBasketInEmpty();
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
            
            checkBasketInEmpty();
        }
    }
}
function checkBasketInEmpty() {
    if(cartWrapper.children.length >= 1) {
        emptyBasket.classList.add('none');
        console.log(true);
    }else {
        emptyBasket.classList.remove('none');
    }
}