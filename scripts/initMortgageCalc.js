/*Description: window onload Init script to assign function on button for Mortgage calculator
 *Author: HartCode Programmer
 *Date:07/26/2019
 *Date:07/29/2019 - Added comments as per standard
 */

/* This function is called during window onload of the mortgage page and 
 * assign function to the button
 */
var inputPrincipalField, inputInterestRateField, inputNoOfYrLoanFiel, errorMsgIdField;
window.onload = function() {
    inputPrincipalField = document.getElementById("inputPrincipal");
    inputInterestRateField = document.getElementById("inputInterestRate");
    inputNoOfYrLoanField = document.getElementById("inputNoOfYrLoan");
    errorMsgIdField = document.getElementById("errorMsgId");
    const calcMortBtnField = document.getElementById("calcMortBtn");
    calcMortBtnField.onclick = calcMortgage;
}

/* This function calculates the monthly payment for the mortgage and Total cost of the mortage
 * Calls to: checkNumeric function 
 * Called by: window.onload
 */
function calcMortgage() {

    // Assign/convert read string for calculation
    let principal = parseFloat(inputPrincipalField.value);
    let interestRatePerYear = parseFloat(inputInterestRateField.value);
    let noOfYrLoan = parseFloat(inputNoOfYrLoanField.value);
    let validateNum = false;
    // Function to validate entered value for number or not
    validateNum = checkNumeric(principal, interestRatePerYear, noOfYrLoan);

    // Do not calculate if failed in number validation
    if (validateNum == true) {
        let noOfMonth = noOfYrLoan * 12;
        let monthlyPayment, interestRatePerMonth;
        interestRatePerMonth = (interestRatePerYear / 12) / 100;
        // calculation of monthly payment
        monthlyPayment = ((principal * (interestRatePerMonth)) / (1 - Math.pow((1 + interestRatePerMonth), -noOfMonth)));
        document.getElementById("outputMonthlyPayment").value = "$ " + monthlyPayment.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        // Calculation of interest paid and total cost
        let interestPaid
        interestPaid = (monthlyPayment * noOfMonth) - principal;
        totalCost = principal + interestPaid;
        document.getElementById("outputTotalCost").value = "$ " + totalCost.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        // success message
        if (isNaN(monthlyPayment) && (isNaN(totalCost))) {
            document.getElementById("errorMsgId").innerHTML = "Error";
            $(errorMsgIdField).removeClass("badInput");
        } else {
            document.getElementById("errorMsgId").innerHTML = "Success";
            $(errorMsgIdField).removeClass("badInput");
        }

    } else {
        // clear out the monthly payment and total cost if failed in error condition
        document.getElementById("outputMonthlyPayment").value = " ";
        document.getElementById("outputTotalCost").value = " ";
    }


}

/* This function is to validate non numeric character at the starting of the field and set error flag
 * populate error message field
 * @param (number) - user entered principal amount
 * @param (number) - user entered annual interest rate
 * @param (number) - user entered loan length
 */
function checkNumeric(principal, interest, year) {
    let errorMsg, isError = false;
    // set Error flag based on number validation
    if ((isNaN(principal)) || (principal <= 0)) {
        errorMsg = "Enter valid number in principal field";
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