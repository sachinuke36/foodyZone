const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US",{
    currency:"USD",
    style:"currency",
    maximumFractionDigits:2
})

export function formatCurrency(amount:number){
        return CURRENCY_FORMATTER.format(amount);
}

const NUMBER_FORMATTER = new Intl.NumberFormat("es-US");

export function formatNumber(number:number){
     return NUMBER_FORMATTER.format(number);
}