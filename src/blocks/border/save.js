import { useBlockProps } from '@wordpress/block-editor'
import { Wave, Squiggle } from './svg'

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
		const {
			variation,
			bottomColour,
			topColour,
			lineColor,
			lineVisible,
			lineWidth
		} = attributes
	
		const blockProps = useBlockProps.save( {
			className: 'alignfull',
			style: {
				"--bottomColour": bottomColour,
				"--topColour": topColour,
				"--lineColor": lineColor,
				"--lineVisible": lineVisible,
				"--lineWidth": lineWidth
			}
		} )

	const blockDataProps = {
		"data-top-colour": bottomColour,
		"data-bottom-colour": topColour,
		"data-line-colour": lineColor,
		"data-line-visible": lineVisible,
		"data-line-width": lineWidth
	}

	return (
		<div { ...blockProps }>
			{ variation === 'wave' && <Wave { ...blockDataProps }/> }
			{ variation === 'squiggle' && <Squiggle { ...blockDataProps }/> }
		</div>
	)
}
