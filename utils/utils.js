const getProductCode = (data)=>{
    let overallCode = data.map((val)=>{return val['productCode']});
    let alpha = "abcdefghijklmnopqrstuvwxyz";
    let overall = alpha+alpha.toUpperCase()+"0123456789";
    let code = "";
    while(code.length < 6)
    {
        let index = parseInt(Math.random()*overall.length);
        code+=overall[index];
        if(code.length == 6)
        {
            if(overallCode.includes(code))
            {
                code="";
            }
        }
    }
    return code;
}

const parseDate = (time)=>{
    if(time < 10)
    {
        time = "0"+time;
    }
    return time;
}

const todayDate = (date)=>{
    return `${date.getFullYear()}-${parseDate(date.getMonth()+1)}-${parseDate(date.getDate())}`
}

const bookingData = (data)=>{
    let bookCode = data.map((val)=>{return val['bookingCode']});
    let code = "";
    let letters = "abcdefghijklmnopqrstuvwxyz";
    let overall = letters+letters.toUpperCase()+"0123456789";
    while(code.length < 6)
    {
        let index = parseInt(Math.random()*overall.length);
        code+=overall[index];
        if(code.length == 6)
        {
            if(bookCode.includes(code))
            {
                code = ""
            }
            else
            {
                break;
            }
        }

        
    }
    return code;
}

module.exports = {getProductCode,todayDate,bookingData};