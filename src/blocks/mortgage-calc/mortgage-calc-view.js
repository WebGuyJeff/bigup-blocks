/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */


const formatPrice = ( number ) => {
	number += ''
	x = number.split( '.' )
	x1 = x[ 0 ]
	x2 = x.length > 1 ? '.' + x[ 1 ] : ''
	var rgx = /(\d+)(\d{3})/
	while ( rgx.test( x1 ) ) {
		x1 = x1.replace( rgx, '$1' + ',' + '$2' )
	}
	if( x2 == '.00' ) { x2 = '' }
	return x1 + x2
}

const calculate = () => {
	
	let monthlyRepayment,
		totalInterestPaid
	
    const amount = parseFloat( document.getElementById( "mortgageCalc_value" ).value ),
		mortgageType = document.querySelector( 'input[name="mortgageCalc_type"]:checked' ).value,
		term = parseFloat( document.getElementById( "mortgageCalc_years" ).value ),
		interestrate = parseFloat( document.getElementById( "mortgageCalc_interest" ).value ),
		numberOfMonths = eval( term * 12 ),
		interest = eval( eval( interestrate / 12 ) / 100 )
	
    if ( mortgageType === "interest_only" ) {
        monthlyRepayment = eval( amount * interest )
        totalInterestPaid = eval( monthlyRepayment * 12 * term )

    } else {
        const interestOverMonths = eval( 1.0 / Math.pow( 1 + interest, numberOfMonths ) )
        monthlyRepayment = eval( ( amount * interest ) / ( 1 - interestOverMonths ) )
        let totalRepayment = 0
        let i = 0
        while ( i < term ) {
            totalRepayment = totalRepayment + monthlyRepayment * 12
            i++
        }
        totalInterestPaid = totalRepayment - amount
    }

    document.getElementById( "mortgageCalc_results-total" ).innerHTML =
        document.getElementById( "languageString_monthlyRepaymentLabel" ).innerHTML +
        " <span>&pound;" +
        formatPrice( monthlyRepayment.toFixed( 2 ) ) +
        "</span>"
    document.getElementById( "mortgageCalc_results-interest-paid" ).innerHTML =
        document.getElementById( "languageString_totalInterestPaidLabel" ).innerHTML +
        " <span>&pound;" +
        formatPrice( totalInterestPaid.toFixed( 2 ) ) +
        "</span>"
    document.getElementById( "mortgageCalc_results" ).style.display = "block"
    return false
}

const setupForm = document.querySelector( ".mortgageCalc" )
setupForm.addEventListener(
    "submit"
    , function( e ) {
        e.preventDefault()
        calculate()
    }
    , false
)
