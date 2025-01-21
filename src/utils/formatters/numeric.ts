export function formatCurrency(value: number, id: string, locale = 'en-US') {
    let formatedValue = new Intl.NumberFormat(locale).format(value)
    if (id == 'Dollard') return '$' + formatedValue
    if (id == 'Trinidad') return formatedValue + ' KTT'
    return formatedValue + ' KCW'
}
export function formatUnits(totalSupply: any, decimals: any): any {
    console.log('Formating units')
    let decimalPart = totalSupply.substring(totalSupply.length - decimals);
    let integerPart = totalSupply.substring(0, totalSupply.length - decimals);
    return parseInt(integerPart) + "." + parseInt(decimalPart)

}

export function toInteger(value: string) {
    return parseInt(`0x${value}`, 16)
}
