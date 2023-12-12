import { __ } from '@wordpress/i18n'
import { useBlockProps } from '@wordpress/block-editor'
import './mortgage-calc-editor.scss'

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit() {

	const blockProps = useBlockProps( {
		className: 'mortgageCalc'
	} )

	return (
		<form { ...blockProps }>
			<div class="mortgageCalc_inpuWrapper mortgageCalc_value">
				<label for="mortgageCalc_value">Mortgage value</label>
				<input type="number" value="" id="mortgageCalc_value" required />
			</div>
			
			<div class="mortgageCalc_inpuWrapper mortgageCalc_years">
				<label for="mortgageCalc_years">Years to repay</label>
				<input type="number" value="25" id="mortgageCalc_years" required />
			</div>
			
			<div class="mortgageCalc_inpuWrapper mortgageCalc_interest">
				<label for="mortgageCalc_interest">Interest rate</label>
				<input type="number" value="3" step="0.01" id="mortgageCalc_interest" required />
			</div>
			
			<div class="mortgageCalc_inpuWrapper mortgageCalc_type">
				<label>Mortgage type</label>
				<label>
					<input type="radio" id="repayment" name="mortgageCalc_type" value="repayment" checked />
					Repayment
				</label>
				<label>
					<input type="radio" id="interest_only" name="mortgageCalc_type" value="interest_only" />
					Interest Only
				</label>
			</div>
				
			<div class="mortgageCalc_field-submit">
				<input type="submit" value="Calculate" />
			</div>

			<div id="mortgageCalc_results">
				<div id="mortgageCalc_results-total"></div>
				<div id="mortgageCalc_results-interest-paid"></div>
				<span style={{display: 'none!important'}}>
					<span id="languageString_monthlyRepaymentLabel">Monthly Repayment:</span>
					<span id="languageString_totalInterestPaidLabel">Total Interest Paid:</span>
				</span>
			</div>

		</form>
	)
}
