export const convertDate = (data: string) => {
    let newDate = new Date(data);
    return newDate.toLocaleString('pt', {day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'})
}