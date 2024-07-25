import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'
import {
	Tumbleweed,
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
export default function save() {

    const blockProps = useBlockProps.save( {
        className: 'flippableCards',
    } )

	return (
		<div { ...blockProps }>
			<div className='rollByAnimation_container'>
				<div className='flippableCards_container'>

					<div className='flippableCard'>
						<div className='flippableCard_front'>
							<h3>Card Title</h3>
							<p>Some awesome card tagline!</p>
						</div>
						<div className='flippableCard_back'>
							<p>Card body content which expands on the front of the card.</p>
						</div>
						<div className='flippableCard_tapIcon'>
							<FingerTap />
						</div>
					</div>

					<div className='flippableCard_card'>
						<div className='flippableCard_front'>
							<h3>Card Title</h3>
							<p>Some awesome card tagline!</p>
						</div>
						<div className='flippableCard_back'>
							<p>Card body content which expands on the front of the card.</p>
						</div>
						<div className='flippableCard_tapIcon'>
							<FingerTap />
						</div>
					</div>

					<div className='flippableCard_card'>
						<div className='flippableCard_front'>
							<h3>Card Title</h3>
							<p>Some awesome card tagline!</p>
						</div>
						<div className='flippableCard_back'>
							<p>Card body content which expands on the front of the card.</p>
						</div>
						<div className='flippableCard_tapIcon'>
							<FingerTap />
						</div>
					</div>

				</div>
				<Tumbleweed />
			</div>
		</div>
	)
}
