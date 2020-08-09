const result = document.querySelector('.result');
const textArea = document.querySelector('[name="text"]');
const calculateBtn = document.querySelector('.submit');
const quantitySelector = document.querySelector('[name="quantity"]');

function transformText(text, quantity) {
  if (!quantity || !text) {
    return (result.textContent = 'Please input a quantity and ingredients');
  }
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
    const newQ = (parseFloat(item[0]) * parseFloat(quantity)).toString();
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
}

calculateBtn.addEventListener('click', () =>
  transformText(textArea.value, quantitySelector.value)
);
