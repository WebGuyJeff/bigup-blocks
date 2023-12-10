import { __ } from '@wordpress/i18n'
import { useBlockProps, useSetting, InspectorControls } from '@wordpress/block-editor'
import { PanelBody, ColorPalette, } from '@wordpress/components'
import { Wave } from './svg'
import './vector-shapes-editor.scss'

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { currentColor } = attributes

	const blockProps = useBlockProps( {
		style: {
			'color': currentColor,
			'display': 'block'
		}
	} )

	return (
		<>
			<InspectorControls>
				<PanelBody>
					<div>
						<p>Vector Colour</p>
						<ColorPalette
							value={ currentColor }
							colors={ [ ...useSetting( 'color.palette' ) ] }
							onChange={ ( value ) => setAttributes( { currentColor: value } ) }
						/>
					</div>
				</PanelBody>
			</InspectorControls>

			<Wave { ...blockProps } />

		</>
	)
}
