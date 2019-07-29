/*Description: window onload Init script to assign function on button for Future Value/Savings calculator
 *Author: HartCode Programmer
 *Date:07/26/2019
 *Date:07/29/2019 - Added comments as per standard
 */

/* This function is called during window onload of the savings calculator page and 
 * assign function to the button
 */
var inputPrincipalField, inputInterestRateField, inputNoOfYrLoanField, errorMsgIdField;
window.onload = function() {
    inputDepositAmtField = document.getElementById("inputDepositAmt");
    inputInterestRateField = document.getElementById("inputInterestRate");
    inputNoOfYrField = document.getElementById("inputNoOfYr");
    errorMsgIdField = document.getElementById("errorMsgId");
    const calcSavingsBtnField = document.getElementById("calcSavingsBtn");
    calcSavingsBtnField.onclick = calcSavings;
}

/* This function calculates the maturity/future value amount for the given deposit amount 
 * Calls to: checkNumeric function 
 * Called by: window.onload
 */
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
        document.getElementById("outputMaturityAmt").value = "$ " + maturityAmt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        // Calculation of Total interest earned
        let interestEarned;
        interestEarned = maturityAmt - depositAmt;
        document.getElementById("outputTotalInterestEarned").value = "$ " + interestEarned.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

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

/* This function is to validate non numeric character at the starting of the field and set error flag
 * populate error message field
 * @param (number) - user entered deposit amount
 * @param (number) - user entered annual interest rate
 * @param (number) - user entered loan length
 */
function checkNumeric(depositAmt, interest, year) {
    let errorMsg, isError = false;
    // set Error flag based on number validation
    if ((isNaN(depositAmt)) || (depositAmt <= 0)) {
        errorMsg = "Enter valid number in Deposit field";
        isError = true;
    } else if ((isNaN(interest)) || (interest <= 0)) {
        errorMsg = "Enter valid number in Interest field";
        isError = true;
    } else if ((isNaN(year)) || (year <= 0)) {
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