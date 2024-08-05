import { __ } from '@wordpress/i18n'
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor'
import { ToggleControl, PanelBody, SelectControl, TextControl } from '@wordpress/components'
import { useState } from '@wordpress/element'
import {
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

const template = [
	[ 'core/group',
		{
			className: 'copy',
			style: { spacing: { padding: { top: 'var:preset|spacing|20', bottom: 'var:preset|spacing|20' } } },
			lock: { remove: true, move: true },
			layout: { type: 'constrained' }
		},
		[
			[ 'core/paragraph', { content: __( "Some awesome summary of the thing being shouted about!", 'bigup-blocks' ) } ]
		]
	]
]

export default function Edit( { attributes, setAttributes } ) {
	const {
		animate,
		title,
		tagline
	} = attributes;
	const blockProps = useBlockProps( {
        className: animate ? 'flippable' : '',
    } )
	const titlePlaceholder   = __( 'Enter a Title', 'bigup-blocks' )
	const taglinePlaceholder = __( 'Enter a tagline', 'bigup-blocks' )

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Flippable Card Settings', 'bigup-blocks' ) }>
					<TextControl
						label={ __( 'Title', 'bigup-blocks' ) }
						value={ title }
						placeholder={ titlePlaceholder }
						onChange={ ( newTitle ) => setAttributes( { title: newTitle } )  }
					/>
					<TextControl
						label={ __( 'Tagline', 'bigup-blocks' ) }
						value={ tagline }
						placeholder={ taglinePlaceholder }
						onChange={ ( newTagline ) => setAttributes( { tagline: newTagline } )  }
					/>
					<ToggleControl
						label={ __( 'Enable animation', 'bigup-blocks' ) }
						help={ animate ? 'Yes' : 'No' }
						checked={ animate }
						onChange={ ( newAnimate ) => setAttributes( { animate: newAnimate } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className='flippableCard_front'>
					<h3>{ title !== undefined ? title : titlePlaceholder }</h3>
					<p>{ tagline !== undefined ? tagline : taglinePlaceholder }</p>
					<div className='flippableCard_tapIcon'>
						<FingerTap />
					</div>
				</div>
				<div className='flippableCard_back'>
					<InnerBlocks
						template={ template }
					/>
				</div>
			</div>
		</>
	)
}
