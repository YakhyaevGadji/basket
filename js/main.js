const dataActions = document.querySelectorAll('[data-action]');

function forDataAction() {
    dataActions.forEach((dataAction) => {
        dataAction.addEventListener('click', addCounterPlus);
        dataAction.addEventListener('click', addCounterMinus);
    });
}
forDataAction();

function addCounterPlus(event) {
    const action = event.target.dataset.action;

    if(action === 'plus') {
        const counterWrapper = event.target.closest('.counter-wrapper');
        const wrapperChildren = counterWrapper.querySelector('[data-counter]');

        wrapperChildren.textContent++;
    }
}

function addCounterMinus(event) {
    const action = event.target.dataset.action;

    if(action === 'minus') {
        const counterWrapper = event.target.closest('.counter-wrapper');
        const wrapperChildren = counterWrapper.querySelector('[data-counter]');

        if(wrapperChildren.textContent > 1) {
            wrapperChildren.textContent--;
        }else if(counterWrapper.closest('.cart-wrapper') && Number(wrapperChildren.textContent) === 1) {
            counterWrapper.closest('.cart-item').remove();
        }
    }
}