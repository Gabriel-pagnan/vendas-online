export const convertNumberToMoney = (value: number): string => {
    return value.toLocaleString('pr-br', { style: 'currency', currency: 'BRL' })
}