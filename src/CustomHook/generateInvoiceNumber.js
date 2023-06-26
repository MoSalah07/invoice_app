
function generateInvoiceNumber() {
    const InvoiceNumberLength = 6;
  const num = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    ];
    let invoiceNumber = [];
    for ( let i = 0;  i < InvoiceNumberLength; i++) {
        if(i < 2) {
            const randomLetter = Math.floor( Math.random() * alphabet.length );
            const letter = alphabet[randomLetter];
            invoiceNumber.push(letter);
        } else {
            const randomNum = Math.floor( Math.random() * num.length );
            const number = num[randomNum];
            invoiceNumber.push( number );
        }
    }
    return invoiceNumber.join('');
}

export default generateInvoiceNumber;
