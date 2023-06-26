
function handelNumbers(number) {
    const option = {
        style: 'currency',
        unit: 'celsius',
        currency: 'GBP',
        useGrouping: true,
    }
  return new Intl.NumberFormat(navigator.language, option).format(number);
}

export default handelNumbers;
