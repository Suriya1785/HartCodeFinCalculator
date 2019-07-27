//Description: window onload Init script to assign function on button for future annuity payout calculator
//Author: HartCode Programmer
//Date:07/26/2019

//window onload function
var inputPrincipalField, inputInterestRateField, inputNoOfYrLoanField, errorMsgIdField;
window.onload = function() {
    inputAnnualPayoutField = document.getElementById("inputAnnualPayout");
    inputInterestRateField = document.getElementById("inputInterestRate");
    inputNoOfYrField = document.getElementById("inputNoOfYr");
    errorMsgIdField = document.getElementById("errorMsgId");
    const calcAnnuityBtnField = document.getElementById("calcAnnuityBtn");
    calcAnnuityBtnField.onclick = calcAnnuity;
}

// Annuity calculation function
function calcAnnuity() {

    // Assign/convert read string for calculation
    let annualPayout = parseFloat(inputAnnualPayoutField.value);
    let interestRatePerYear = parseFloat(inputInterestRateField.value);
    let noOfYrDeposit = parseFloat(inputNoOfYrField.value);
    let interestRate = interestRatePerYear / 100;
    let annuityDepositAmt;
    let validateNum = false;

    // Function to validate entered value for number or not
    validateNum = checkNumeric(annualPayout, interestRatePerYear, noOfYrDeposit);

    // Do not calculate if failed in number validation
    if (validateNum == true) {

        // calculation of deposit to fund the annuity
        annuityDepositAmt = annualPayout * (Math.pow(1 + interestRate, noOfYrDeposit) - 1) / (Math.pow(1 + interestRate, noOfYrDeposit - 1) * interestRate);
        document.getElementById("outputAnnuityDepositAmt").value = "$ " + annuityDepositAmt.toFixed(2);

        // success message
        if (isNaN(annuityDepositAmt)) {
            document.getElementById("errorMsgId").innerHTML = "Error";
            $(errorMsgIdField).removeClass("badInput");
        } else {
            document.getElementById("errorMsgId").innerHTML = "Success";
            $(errorMsgIdField).removeClass("badInput");
        }

    } else {
        // clear out the Maturity amount/Future value and total interest earned if failed in error condition
        document.getElementById("outputAnnuityDepositAmt").value = " ";
    }

}

// validate numeric or not
function checkNumeric(annualPayout, interest, year) {
    let errorMsg, isError = false;
    // set Error flag based on number validation
    if (isNaN(annualPayout)) {
        errorMsg = "Enter valid number in AnnualPayout field";
        isError = true;
    } else if (isNaN(interest)) {
        errorMsg = "Enter valid number in Interest field";
        isError = true;
    } else if (isNaN(year)) {
        errorMsg = "Enter valid number in Years field";
        isError = true;
    } else {
        isError = false;
    }

    // Set attribute and content for para tag - Error message / Success
    if (isError == true) {
        document.getElementById("errorMsgId").innerHTML = errorMsg;
        $(errorMsgIdField).addClass("badInput");
    } else {
        return true;
    }
}