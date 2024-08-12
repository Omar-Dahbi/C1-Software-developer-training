// Import Statement for Prompt-Sync Library
const prompt = require('prompt-sync')({sigint: true});



console.log("Loan calculator")

console.log(" ")
console.log(" ")
console.log(" ")
console.log("By inputting, initial loan, interest rate, and period of investment, you'll have the nominal interest and the amount to be returned at the end of the loan both calculated with a simple and coumpound method")
console.log(" ")
console.log("As a thank you for being a loyal customer of our bank, if you are already one, there will be a 1% discount on your interest rate")

console.log(" ")
console.log(" ")


let isCustomer = prompt ('Are you already a customer? (true or false) ');
isCustomer = Boolean(isCustomer) ;
let capital = prompt('What is the initial capital in euro? '); 
let interestRate = prompt('What is the Interest rate? '); 
let years = prompt('What is the time window in years? ') 
let discountedRate = ( Number(interestRate) - Number(isCustomer) )
let nominalInterest = capital * (Number(interestRate) / 100) * Number(years)
let discountedInterest = Number(capital) * ((Number(interestRate) - Number(isCustomer)) / 100) * Number(years)
let compoundedInterest = Number(capital) * (1 + (Number(discountedInterest)/100)) ** Number(years)
let discountedcompoundedInterest = Number(capital) * (1 + (Number(discountedRate)/100)) ** Number(years)



console.log("Prices for Non customers");
console.log(" ")
console.log(" ")
console.log("The nominal interest you would pay is " + Number(nominalInterest)  + " €");
console.log(" ")
console.log("Following a normal non compounding interest, you would pay at the end of the chosen number of years " + ( Number(capital) + Number(nominalInterest) ) + "€") ;
console.log(" ")
console.log("Following a  compounding interest, you would pay at the end of the chosen number of years " + parseInt((Number(capital) * ((1 + (Number(interestRate)/100)) ** Number(years)))) + " €" )
console.log(" ")
console.log(" ")
console.log("Prices for Customers");
console.log(" ")
console.log(" ")
console.log("The nominal interest you would pay is " + Number(discountedInterest) + " €");
console.log(" ")
console.log("Following a normal non compounding interest method, you would pay at the end of the chosen number number of years " + ( Number(capital) + Number(discountedInterest) ) + " €" ) ;
console.log(" ")
console.log("Following a  compounding interest, you would pay at the end of the chosen number of years " + parseInt(Number(discountedcompoundedInterest)) + " €" )

