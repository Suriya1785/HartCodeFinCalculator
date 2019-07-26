//Description: window onload Init script to assign function on button for future annuity payout calculator
//Author: HartCode Programmer
//Date:07/26/2019
var inputPrincipalField, inputInterestRateField, inputNoOfYrLoanField;
window.onload = function() {
    inputAnnualPayoutField = document.getElementById("inputAnnualPayout");
    inputInterestRateField = document.getElementById("inputInterestRate");
    inputNoOfYrField = document.getElementById("inputNoOfYr");
    const calcAnnuityBtnField = document.getElementById("calcAnnuityBtn");
    calcAnnuityBtnField.onclick = calcAnnuity;
}

function calcAnnuity() {

    // Assign/convert read string for calculation
    let annualPayout = parseFloat(inputAnnualPayoutField.value);
    let interestRatePerYear = parseFloat(inputInterestRateField.value);
    let noOfYrDeposit = parseFloat(inputNoOfYrField.value);
    console.log("noOfYrDeposit " + noOfYrDeposit);
    console.log("interestRatePerYear " + interestRatePerYear);
    console.log("annualPayout " + annualPayout);
    let noOfMonth = noOfYrDeposit * 12;
    interestRate = interestRatePerYear / 100;
    let interestRatePerMonth = (interestRatePerYear / 12) / 100;
    let annuityDepositAmt;
    console.log("interestRate " + interestRate);

    // calculation of deposit to fund the annuity
    annuityDepositAmt = annualPayout * (Math.pow(1 + interestRate, noOfYrDeposit) - 1) / (Math.pow(1 + interestRate, noOfYrDeposit - 1) * interestRate);
    document.getElementById("outputAnnuityDepositAmt").value = annuityDepositAmt.toFixed(2);
}