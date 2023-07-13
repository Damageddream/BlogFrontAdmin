const timeFromatter = (time: string): string => {
    const year = time.slice(0,4)
    const month = time.slice(5,7)
    const day = time.slice(8,10)
    const hour = time.slice(11,16)
    return day+"-"+month+"-"+year+" "+hour
}

export default timeFromatter;