import { Transaction } from "../Types";

type reduceCb = (accum:number, currentValue:Transaction) => number
//todays sales
//todays purchases
//todays profit

const dayMS = 86400000

const isWithinDays = (date: string, MS: number) => {
    return(Date.now()-MS < Date.parse(date))
}
function yearDaysSalesCB(accum: number, currentValue:Transaction){
    if(isWithinDays(currentValue.Date, dayMS * 30) && currentValue.type === "sell"){
        return(accum + currentValue.cost)
    }
    return accum
}

function thirtyDaysSalesCB(accum: number, currentValue:Transaction){
    if(isWithinDays(currentValue.Date, dayMS * 30) && currentValue.type === "sell"){
        return(accum + currentValue.cost)
    }
    return accum
}

function weeksSalesCB(accum:number,currentValue:Transaction){
    if(isWithinDays(currentValue.Date, dayMS * 7) && (currentValue.type === "sell")){
        return(accum + currentValue.cost)
    }
    return accum
}

function todaysSalesCb(accum:number,currentValue:Transaction){
    if(isWithinDays(currentValue.Date, dayMS) && (currentValue.type === "sell")){
        return currentValue.cost + accum
    }
    return accum
}

function reduceTransactions(trans: Transaction[],cb: reduceCb): number{
    return(trans.reduce(cb,0))
}

function getTodaysSales(trans: Transaction[]){
    return reduceTransactions(trans,todaysSalesCb)
}
function getWeeksSales(trans: Transaction[]){
    return reduceTransactions(trans,weeksSalesCB)
}
function getMonthSales(trans: Transaction[]){
    return reduceTransactions(trans,thirtyDaysSalesCB)
}
function getYearSales(trans: Transaction[]){
    return reduceTransactions(trans,yearDaysSalesCB)
}

export {getTodaysSales, getWeeksSales, getMonthSales, getYearSales}