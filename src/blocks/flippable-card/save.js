import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'
import {
	FingerTap
} from './svg'

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
		animate,
		title,
		tagline
	} = attributes;
	const blockProps = useBlockProps.save( {
        className: animate ? 'flippableCard flip' : 'flippableCard',
    } )

	return (
		<div { ...blockProps }>
			<div className='flippableCard_front'>
				<h3>{ title }</h3>
				<p>{ tagline }</p>
				<div className='flippableCard_tapIcon'>
					<FingerTap />
				</div>
			</div>
			<div className='flippableCard_back'>
				<InnerBlocks.Content />
			</div>
		</div>
	)
}
