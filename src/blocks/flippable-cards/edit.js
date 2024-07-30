import { __ } from '@wordpress/i18n'
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'
import {
	Tumbleweed,
	FingerTap
} from './svg'

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
							<div className='flippableCard_tapIcon'>
								<FingerTap />
							</div>
						</div>
						<div className='flippableCard_back'>
							<p>Card body content which expands on the front of the card.</p>
						</div>
					</div>

					<div className='flippableCard'>
						<div className='flippableCard_front'>
							<h3>Card Title</h3>
							<p>Some awesome card tagline!</p>
							<div className='flippableCard_tapIcon'>
								<FingerTap />
							</div>
						</div>
						<div className='flippableCard_back'>
							<p>Card body content which expands on the front of the card.</p>
						</div>
					</div>

					<div className='flippableCard'>
						<div className='flippableCard_front'>
							<h3>Card Title</h3>
							<p>Some awesome card tagline!</p>
							<div className='flippableCard_tapIcon'>
								<FingerTap />
							</div>
						</div>
						<div className='flippableCard_back'>
							<p>Card body content which expands on the front of the card.</p>
						</div>
					</div>

				</div>
				<Tumbleweed />
			</div>
		</div>
	)
}
