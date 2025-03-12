/**
 * Import WordPress Dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import { SelectControl, PanelBody, PanelRow } from '@wordpress/components';

/**
 * Import local editor Styles.
 */
import './editor.scss';

/**
 * Edit function.
 *
 * This function describes the structure of the block in the context of the editor.
 *
 * @return {WPElement} Element to render.
 * @param {Object} attributes - Block attributes.
 * @param {Function} setAttributes - Callback to update block attributes.
 * @param {boolean} isSelected - Is the block selected.
 * @param {string} clientId - Block client ID.
 * @param {string} attributes.anchorClasses - Anchor classnames.
 */
export default function Edit({
	attributes,
	setAttributes,
	isSelected,
	clientId,
}) {
	const { anchorClasses } = attributes;

	/**
	 * Control options.
	 *
	 * These are the settings label/values to populate the dropdown control.
	 *
	 */
	const widthOptions = [
		{ label: 'Default', value: 'bigupAnchor' },
		{
			label: 'Full-width',
			value: 'bigupAnchor bigupAnchor-full',
		},
		{ label: 'Narrow', value: 'bigupAnchor bigupAnchor-narrow' },
	];

	/**
	 * Set block attributes.
	 */
	const blockProps = useBlockProps({
		className: anchorClasses,
	});

	/**
	 * Set block attributes with 'selected' state.
	 */
	const blockPropsSelected = useBlockProps({
		className: anchorClasses + ' bigupAnchor-selected',
	});

	/**
	 * Flag to check if innerBlocks is populated.
	 */
	const hasInnerBlocks = () => {
		const thisBlock = wp.data
			.select('core/block-editor')
			.getBlock(clientId);
		if (thisBlock) {
			return !!thisBlock.innerBlocks.length;
		} else {
			return false;
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Anchor Width', 'bigup-blocks' )} initialOpen={true}>
					<PanelRow>
						<SelectControl
							label="width"
							labelPosition="Left"
							title="anchorClasses"
							value={anchorClasses}
							options={widthOptions}
							onChange={(value) =>
								setAttributes({ anchorClasses: value })
							}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			{isSelected && (
				<div {...blockPropsSelected}>
					<InnerBlocks />
				</div>
			)}

			{!isSelected && (
				<div {...blockProps}>
					{!hasInnerBlocks() && (
						<a className="bigupAnchor-empty">
							{ __("I'm an anchor - put some blocks inside me!", 'bigup-blocks' ) }
						</a>
					)}
					<InnerBlocks />
				</div>
			)}
		</>
	);
}
