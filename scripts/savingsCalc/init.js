//Description: window onload Init script to assign function on button for Future Value/Savings calculator
//Author: HartCode Programmer
//Date:07/26/2019
//window onload function
var inputPrincipalField, inputInterestRateField, inputNoOfYrLoanField, errorMsgIdField;
window.onload = function() {
    inputDepositAmtField = document.getElementById("inputDepositAmt");
    inputInterestRateField = document.getElementById("inputInterestRate");
    inputNoOfYrField = document.getElementById("inputNoOfYr");
    errorMsgIdField = document.getElementById("errorMsgId");
    const calcSavingsBtnField = document.getElementById("calcSavingsBtn");
    calcSavingsBtnField.onclick = calcSavings;
}

// Calculate future value/saving function
function calcSavings() {

    // Assign/convert read string for calculation
    let depositAmt = parseFloat(inputDepositAmtField.value);
    let interestRatePerYear = parseFloat(inputInterestRateField.value);
    let noOfYrDeposit = parseFloat(inputNoOfYrField.value);
    let noOfMonth = noOfYrDeposit * 12;
    let interestRatePerMonth = (interestRatePerYear / 12) / 100;
    let maturityAmt;
    let validateNum = false;
    // Function to validate entered value for number or not
    validateNum = checkNumeric(depositAmt, interestRatePerYear, noOfYrDeposit);

    // Do not calculate if failed in number validation
    if (validateNum == true) {

        // calculation of maturity/future value - Interest was compounded monthly instead of annually
        maturityAmt = (depositAmt * Math.pow((1 + interestRatePerMonth), noOfMonth));
        // format currency and shove it to html
        document.getElementById("outputMaturityAmt").value = "$ " + maturityAmt.toFixed(2);

        // Calculation of Total interest earned
        let interestEarned;
        interestEarned = maturityAmt - depositAmt;
        document.getElementById("outputTotalInterestEarned").value = "$ " + interestEarned.toFixed(2);

        // success message
        if (isNaN(maturityAmt) && (isNaN(interestEarned))) {
            document.getElementById("errorMsgId").innerHTML = "Error";
            $(errorMsgIdField).removeClass("badInput");
        } else {
            document.getElementById("errorMsgId").innerHTML = "Success";
            $(errorMsgIdField).removeClass("badInput");
        }

    } else {
        // clear out the Maturity amount/Future value and total interest earned if failed in error condition
        document.getElementById("outputMaturityAmt").value = " ";
        document.getElementById("outputTotalInterestEarned").value = " ";
    }

}

// validate numeric or not
function checkNumeric(depositAmt, interest, year) {
    let errorMsg, isError = false;
    // set Error flag based on number validation
    if (isNaN(depositAmt)) {
        errorMsg = "Enter valid number in Deposit field";
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