const formEl = document.getElementById('madlib-form');

formEl.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(formEl);

    console.log(formData.get('input-1'));
    const spanEls = document.querySelectorAll('.input-value');

    spanEls.forEach(span => {
        span.innerHTML = formData.get(span.dataset.input);
    });
});