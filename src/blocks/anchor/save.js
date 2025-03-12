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

	/* jeffDebug */
	/* Why is attributes double-nested as attributes.attributes? */
	/* This is not the case in edit.js */

	/**
	 * Wp attributes are an alias for React props.
	 */
	const { anchorClasses } = attributes.attributes;

	/**
	 * Add classname(s) to props
	 */
	const blockProps = useBlockProps.save({
		className: anchorClasses,
	});

	return (
		<a {...blockProps}>
			<InnerBlocks.Content />
		</a>
	);
}
