import { __ } from '@wordpress/i18n'
import { useBlockProps, useSetting, InspectorControls } from '@wordpress/block-editor'
import { Panel, PanelBody, PanelRow, SelectControl, ColorPalette, ToggleControl, __experimentalUnitControl as UnitControl } from '@wordpress/components'
import { Wave, Squiggle } from './svg'
import './vector-shapes-editor.scss'

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {

	const { attributes, setAttributes } = props

	const blockName = props.name

	const {
		variation,
		bottomColour,
		topColour,
		lineColor,
		lineVisible,
		lineWidth
	} = attributes

	const blockVariations = Object.values( wp.blocks.getBlockType( blockName ).variations )

	const blockProps = useBlockProps( {
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

	// Variation select control values.
	const variationOptions = []
	blockVariations.forEach( variation => variationOptions.push( { value: variation.name, label: variation.title } ) )

	return (
		<>
			<InspectorControls>
				<Panel>
					<PanelBody>
						<SelectControl
						label={ __( 'Select vector', 'bigup-blocks' ) }
						labelPosition="top"
						title={ __( 'Select vector', 'bigup-blocks' ) }
						value={ variation }
						options={ variationOptions }
						onChange={ ( value ) => setAttributes( { variation: value } ) }
						__nextHasNoMarginBottom={ true }
					/>
					</PanelBody>
				</Panel>
				<Panel>
					<PanelBody>
						<PanelRow><h2>{ __( 'Colours', 'bigup-blocks' ) }</h2></PanelRow>
						<PanelRow>{ __( 'Top', 'bigup-blocks' ) }</PanelRow>
						<ColorPalette
							value={ topColour }
							colors={ [ ...useSetting( 'color.palette' ) ] }
							onChange={ ( value ) => setAttributes( { topColour: value } ) }
						/>
						<PanelRow>{ __( 'Bottom', 'bigup-blocks' ) }</PanelRow>
						<ColorPalette
							value={ bottomColour }
							colors={ [ ...useSetting( 'color.palette' ) ] }
							onChange={ ( value ) => setAttributes( { bottomColour: value } ) }
						/>
					</PanelBody>
				</Panel>
				<Panel>
					<PanelBody>
						<PanelRow><h2>{ __( 'Line Settings', 'bigup-blocks' ) }</h2></PanelRow>
						<ToggleControl
							label='Show Line'
							help={ lineVisible ? __( 'Yes', 'bigup-blocks' ) : __( 'No', 'bigup-blocks' ) }
							checked={ lineVisible === 'visible' ? true : false }
							onChange={ ( value ) => setAttributes( { lineVisible: value ? 'visible' : 'hidden' } ) }
						/>
						<PanelRow>{ __( 'Width', 'bigup-blocks' ) }</PanelRow>
						<UnitControl
							value={ lineWidth }
							onChange={ ( value ) => setAttributes( { lineWidth: value } ) }
							__next40pxDefaultSize
						/>
						<PanelRow>{ __( 'Colour', 'bigup-blocks' ) }</PanelRow>
						<ColorPalette
							value={ lineColor }
							colors={ [ ...useSetting( 'color.palette' ) ] }
							onChange={ ( value ) => setAttributes( { lineColor: value } ) }
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>

			<div { ...blockProps }>
				{ variation === 'wave' && <Wave { ...blockDataProps }/> }
				{ variation === 'squiggle' && <Squiggle { ...blockDataProps }/> }
			</div>
		</>
	)
}
