const result = document.querySelector('.result');
const textArea = document.querySelector('[name="text"]');
const calculateBtn = document.querySelector('.submit');
const quantitySelector = document.querySelector('[name="quantity"]');
const servingSelector = document.querySelector('[name="servings"]');
const feedSelector = document.querySelector('[name="feed"]');
const copyButton = document.querySelector('#copy');
const copyMessage = document.querySelector('#message');

function transformText(text, quantity, servings, feed) {
  if (quantity || text || (servings && feed)) {
    // first thing - transform text to array delimited by "enter"
    const listArr = text.split('\n');
    const splitArr = listArr.map(ingredient => {
      const split = ingredient.split(/(\d+)/).filter(x => x);
      return split;
    });

    const newSplit = splitArr.map(item => {
      if (isNaN(item[0])) {
        return item;
      }
      // debugger;
      let newQ;
      if (servings && feed) {
        const feedQuantity = parseFloat(feed / servings);
        newQ = (parseFloat(item[0]) * parseFloat(feedQuantity)).toFixed(2);
      } else {
        newQ = (parseFloat(item[0]) * parseFloat(quantity)).toFixed(2);
      }
      item[0] = newQ;
      return item.join('');
    });

    const resultUl = document.createElement('ul');
    newSplit.forEach(item => {
      const li = document.createElement('li');
      li.append(item);
      resultUl.appendChild(li);
    });
    while (result.firstChild) {
      result.removeChild(result.firstChild);
    }
    result.appendChild(resultUl);
    copyButton.classList.remove('hidden');
  } else {
    return (result.textContent = 'Please input a quantity and ingredients');
  }
}

calculateBtn.addEventListener('click', () =>
  transformText(
    textArea.value,
    quantitySelector.value,
    servingSelector.value,
    feedSelector.value
  )
);

quantitySelector.addEventListener('input', event => {
  if (event.target.value.length !== 0) {
    servingSelector.setAttribute('disabled', '');
    feedSelector.setAttribute('disabled', '');
  } else if (event.target.value.length === 0) {
    servingSelector.toggleAttribute('disabled');
    feedSelector.toggleAttribute('disabled');
  }
});

servingSelector.addEventListener('input', event => {
  if (event.target.value.length !== 0) {
    quantitySelector.setAttribute('disabled', '');
  } else if (
    event.target.value.length === 0 &&
    feedSelector.value.length === 0
  ) {
    quantitySelector.toggleAttribute('disabled');
  }
});

feedSelector.addEventListener('input', event => {
  if (event.target.value.length !== 0) {
    quantitySelector.setAttribute('disabled', '');
  } else if (
    event.target.value.length === 0 &&
    servingSelector.value.length === 0
  ) {
    quantitySelector.toggleAttribute('disabled');
  }
});
const clipboard = new ClipboardJS(copyButton);
clipboard.on('success', function(e) {
  copyMessage.classList.remove('hidden');
  setTimeout(() => copyMessage.classList.add('hidden'), 3000);
  console.log(e);
});

clipboard.on('error', function(e) {
  console.log(e);
});
