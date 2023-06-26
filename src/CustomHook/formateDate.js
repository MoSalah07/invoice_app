
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
  
function formateDate(date) {
    const fullDate = new Date( date);

    return ` ${fullDate.getDate()} ${monthNames[fullDate.getUTCMonth()]}  ${fullDate.getFullYear()}`
}


export const handelPaymentTerms = (date, paymentDay) => {
  const fullDate = new Date( date );
  const incrementDays = fullDate.setDate( fullDate.getDate() + Number( paymentDay ) );
  const incrementDate = new Date(incrementDays);
  return ` ${incrementDate.getDate()} ${monthNames[incrementDate.getUTCMonth()]}  ${incrementDate.getFullYear()}`
}

export default formateDate;
