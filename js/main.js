const dataCarts = document.querySelectorAll('[data-cart]');
const cartWrapper = document.querySelector('.cart-wrapper');
const cardsBody = document.querySelectorAll('.basket__parent');



dataCarts.forEach((dataCart) => {
    dataCart.addEventListener('click', addTask);
});


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
};

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

