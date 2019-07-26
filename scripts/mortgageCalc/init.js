//Description: window onload Init script to assign function on button for Mortgage calculator
//Author: HartCode Programmer
//Date:07/26/2019
var inputPrincipalField, inputInterestRateField, inputNoOfYrLoanField;
window.onload = function() {
    inputPrincipalField = document.getElementById("inputPrincipal");
    inputInterestRateField = document.getElementById("inputInterestRate");
    inputNoOfYrLoanField = document.getElementById("inputNoOfYrLoan");
    const calcMortBtnField = document.getElementById("calcMortBtn");
    calcMortBtnField.onclick = calcMortgage;
}

function calcMortgage() {

    // Assign/convert read string for calculation
    let principal = parseFloat(inputPrincipalField.value);
    let interestRatePerYear = parseFloat(inputInterestRateField.value);
    let noOfYrLoan = parseFloat(inputNoOfYrLoanField.value);

    let noOfMonth = noOfYrLoan * 12;
    let monthlyPayment, interestRatePerMonth;
    interestRatePerMonth = (interestRatePerYear / 12) / 100;
    // calculation of monthly payment
    monthlyPayment = ((principal * (interestRatePerMonth)) / (1 - Math.pow((1 + interestRatePerMonth), -noOfMonth)));
    document.getElementById("outputMonthlyPayment").value = monthlyPayment.toFixed(2);

    // Calculation of interest paid and total cost
    let interestPaid
    interestPaid = (monthlyPayment * noOfMonth) - principal;
    totalCost = principal + interestPaid;
    document.getElementById("outputTotalCost").value = totalCost.toFixed(2);
}