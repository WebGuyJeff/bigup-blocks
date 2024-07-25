import { __ } from '@wordpress/i18n'
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor'
import { ToggleControl, PanelBody, SelectControl } from '@wordpress/components'
import { useState } from '@wordpress/element'
import {
	Clouds,
	DesertFills,
	DesertFurniture,
	DesertSand,
	Fist,
	GrabhandLeft,
	GrabhandRight,
	MeToon,
	Sun,
	Star
} from './svg'

const template = [
	[ 'core/group',
		{
			className: 'copy',
			style: { spacing: { padding: { top: 'var:preset|spacing|50', bottom: 'var:preset|spacing|50' } } },
			lock: { remove: true, move: true },
			layout: { type: 'constrained' }
		},
		[
			[ 'core/heading', { level: 1, content: __( "I'm a Web Developer!", 'bigup-blocks' ) } ],
			[ 'core/paragraph', { content: __( "I build awesome websites with flashy animation to woo your audience and make them dream about your brand.", 'bigup-blocks' ) } ],
			[ 'core/buttons', {},
				[
					[ 'core/button', { text: __( "Send me a message", 'bigup-blocks' )	} ]
				]
			]
		]
	]
]

/**
 * Render inspector controls for the block.
 *
 * @param {Object}   props                 Component props.
 * @param {string}   props.tagName         The HTML tag name.
 * @param {Function} props.onSelectTagName onChange function for the SelectControl.
 *
 * @return {JSX.Element}                The control group.
 */
const HTMLParentControls = ( { tagName, onSelectTagName } ) => {
	return (
		<InspectorControls group="advanced">
			<SelectControl
				__nextHasNoMarginBottom
				__next40pxDefaultSize
				label={ __( 'HTML element' ) }
				options={ [
					{ label: __( 'Default (<div>)' ), value: 'div' },
					{ label: '<header>', value: 'header' },
					{ label: '<main>', value: 'main' },
					{ label: '<section>', value: 'section' },
					{ label: '<article>', value: 'article' },
					{ label: '<aside>', value: 'aside' },
					{ label: '<footer>', value: 'footer' },
				] }
				value={ tagName }
				onChange={ onSelectTagName }
			/>
		</InspectorControls>
	);
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const [ animate, setAnimate ] = useState( true )
	const blockProps = useBlockProps( { className: 'heroPunch' } )
	const { tagName: TagName = 'div' } = attributes;
	
	return (
		<>
			<HTMLParentControls
				tagName={ TagName }
				onSelectTagName={ ( value ) =>
					setAttributes( { tagName: value } )
				}
			/>

			<InspectorControls>
				<PanelBody title={ __( 'Hero Punch Settings' ) }>
					<ToggleControl
						label='Enable Animation'
						help={animate ? 'Yes' : 'No'}
						checked={animate}
						onChange={ ( newAnimate ) => setAnimate( newAnimate ) }
					/>
					{ animate === true && (
						<span>
							{ 'Here are more animation settings' }
						</span>
					) }
				</PanelBody>
			</InspectorControls>

			<TagName {...blockProps}>
				<div className='scrollTriggerParent'>
					<div className='scrollTriggerChild'>
						<div className='sectionGrid'>
							<div className='landing_content'>
								<div className='sign '>
									<div className='sign_pinSignTop'>
										<GrabhandLeft />
										<GrabhandRight />
										<div className='star star-2'>
											<Star />
										</div>
									</div>
									<InnerBlocks
										template={ template }
									/>
								</div>
								<div className='svgMe_container'>
									<MeToon />
									<div className='star star-1'>
										<Star />
									</div>
								</div>
							</div>
							<div className='landing_backdrop'>
								<DesertFills />
								<Sun />
								<Clouds />
								<div className='desert_terrain'>
									<DesertSand />
									<DesertFurniture />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='fist_container'>
					<Fist />
				</div>
			</TagName>
		</>
	)
}
