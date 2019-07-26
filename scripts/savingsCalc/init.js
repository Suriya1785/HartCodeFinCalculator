//Description: window onload Init script to assign function on button for Future Value/Savings calculator
//Author: HartCode Programmer
//Date:07/26/2019
var inputPrincipalField, inputInterestRateField, inputNoOfYrLoanField;
window.onload = function() {
    inputDepositAmtField = document.getElementById("inputDepositAmt");
    inputInterestRateField = document.getElementById("inputInterestRate");
    inputNoOfYrField = document.getElementById("inputNoOfYr");
    const calcSavingsBtnField = document.getElementById("calcSavingsBtn");
    calcSavingsBtnField.onclick = calcSavings;
}

function calcSavings() {

    // Assign/convert read string for calculation
    let depositAmt = parseFloat(inputDepositAmtField.value);
    let interestRatePerYear = parseFloat(inputInterestRateField.value);
    let noOfYrDeposit = parseFloat(inputNoOfYrField.value);
    let noOfMonth = noOfYrDeposit * 12;
    let interestRatePerMonth = (interestRatePerYear / 12) / 100;
    let maturityAmt;

    // calculation of maturity/future value - Interest was compounded monthly instead of annually
    maturityAmt = (depositAmt * Math.pow((1 + interestRatePerMonth), noOfMonth));
    document.getElementById("outputMaturityAmt").value = maturityAmt.toFixed(2);

    // Calculation of Total interest earned
    let interestEarned;
    interestEarned = maturityAmt - depositAmt;
    document.getElementById("outputTotalInterestEarned").value = interestEarned.toFixed(2);
}