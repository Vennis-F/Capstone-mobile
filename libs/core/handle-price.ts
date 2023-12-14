export function formatCurrency(amount: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const formattedString = formatter.format(amount);
    return formattedString.replace('₫', '').replace(/,/g, '');
}

export const calcPriceDiscount = (amount: number, discount: number) =>
    amount - (discount / 100) * amount;

export const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
};

export const getRandomRangeInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};