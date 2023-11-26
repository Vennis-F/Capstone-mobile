export function formatCurrency(amount: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    })

    const formattedString = formatter.format(amount)
    return formattedString.replace('₫', '').replace(/,/g, '')
}

export const calcPriceDiscount = (amount: number, discount: number) =>
    amount - (discount / 100) * amount
