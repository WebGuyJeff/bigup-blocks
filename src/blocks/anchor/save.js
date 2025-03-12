/**
 * Import WordPress Dependencies.
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

/**
 * Save function.
 *
 * Handle parsing the block into final markup as post content
 *
 * @return {WPElement} Element to render.
 * @param {object} attributes - Block attributes and innerBlocks.
 */
export default function Save( attributes ) {

	const { url, openInNewTab, id } = attributes.attributes;

	/**
	 * Add classname(s) to props
	 */
	const blockProps = useBlockProps.save()

	return (
		<div { ...blockProps }>
			<a
				href={ url }
				target={ openInNewTab ? '_blank' : '_self' }
				id={ id }
			>
				<InnerBlocks.Content />
			</a>
		</div>
	);
}
