/*Description: window onload Init script to assign function on button for future annuity payout calculator
 *Author: HartCode Programmer
 *Date:07/26/2019 
 *Date:07/29/2019 - Added comments as per standard
 */
/* This function is called during window onload of the annuity page and 
 * assign function to the button
 */
var inputPrincipalField, inputInterestRateField, inputNoOfYrLoanField, errorMsgIdField;
window.onload = function() {
    inputAnnualPayoutField = document.getElementById("inputAnnualPayout");
    inputInterestRateField = document.getElementById("inputInterestRate");
    inputNoOfYrField = document.getElementById("inputNoOfYr");
    errorMsgIdField = document.getElementById("errorMsgId");
    const calcAnnuityBtnField = document.getElementById("calcAnnuityBtn");
    calcAnnuityBtnField.onclick = calcAnnuity;
}

/* This function calculates the annuity deposit amount for the given annual payout
 * Called by : window.onload
 * Calls to  : checkNumeric
 */
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
        document.getElementById("outputAnnuityDepositAmt").value = "$ " + annuityDepositAmt.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

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

/* This function is to validate non numeric character at the starting of the field and set error flag
 * populate error message field
 * @param (number) - user entered annual payout amount
 * @param (number) - user entered annual interest rate
 * @param (number) - user entered loan length
 */
function checkNumeric(annualPayout, interest, year) {
    let errorMsg, isError = false;
    // set Error flag based on number validation
    if ((isNaN(annualPayout)) || (annualPayout <= 0)) {
        errorMsg = "Enter valid number in AnnualPayout field";
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