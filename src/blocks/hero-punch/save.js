import { useBlockProps, InnerBlocks } from '@wordpress/block-editor'
import {
	Fist,
	GrabhandLeft,
	GrabhandRight,
	MeToon,
	Star
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
    const blockProps = useBlockProps.save( { className: 'punch' } )
	const { tagName: TagName = 'div' } = attributes;

	return (
		<TagName {...blockProps}>
			<div className='scrollTrigger_parent'>
				<div className='scrollTrigger_child'>
					<div className='sectionGrid_parent'>
						<div className='sectionGrid_child'>
							<div className='contentWrapper'>
								<div className='styledBox'>
									<div className='styledBox_pinToTop'>
										<GrabhandLeft />
										<GrabhandRight />
										<div className='star star-2'>
											<Star />
										</div>
									</div>
									<InnerBlocks.Content />
								</div>
								<div className='contentWrapper_pinToRight'>
									<MeToon />
									<div className='star star-1'>
										<Star />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='fist_container'>
				<Fist />
			</div>
		</TagName>
	)
}
