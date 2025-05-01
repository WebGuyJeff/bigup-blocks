import { __ } from '@wordpress/i18n'
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor'
import { Panel, PanelBody, PanelRow, Button, ResponsiveWrapper, __experimentalUnitControl as UnitControl } from '@wordpress/components'
import './inline-svg-editor.scss'

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes, media } ) {
	const {
		mediaId,
		mediaUrl,
		svgSource,
		width,
		height
	} = attributes

	const blockProps = useBlockProps( {
		className: 'bigup__inlineSVG',
		style: { width: width, height: height }
	} )

	const removeMedia = () => {
		setAttributes( {
			mediaId: 0,
			mediaUrl: ''
		} )
	}

	/**
	 * Temporarily insert an SVG string into the DOM as an element to manipulate the height, width
	 * and preserveAspectRatio attributes. Then grab the new HTML and remove the temporary element.
	 * 
	 * Setting these attributes forces the SVG to fill it's container while remaining 'contained'.
	 */
	const setDimensionAttrsOfSVG = ( stringSVG ) => {
		const div = document.createElement( 'div' )
		div.innerHTML = stringSVG
		div.style.display = 'none'
		document.body.appendChild( div )
		const svg = div.querySelector( 'svg' )
		svg.setAttribute( 'preserveAspectRatio', 'xMidYMid meet' )
		svg.setAttribute( 'width', '100%' )
		svg.setAttribute( 'height', '100%' )
		const newStringSVG = svg.outerHTML
		document.body.removeChild( div )
		return newStringSVG
	}
 
 	const onSelectMedia = ( media ) => {
		fetch( media.url, { mode: 'no-cors'} )
		.then( result => result.text() )
		.then( text => {
			const matches      = text.match( /<svg[^>]*?>[\S\s]*<\/svg>/ )
			const newStringSVG = setDimensionAttrsOfSVG( matches[0] )
			setAttributes( {
				mediaId: media.id,
				mediaUrl: media.url,
				svgSource: newStringSVG
			} )
		} )
	}

	return (
		<>
			<InspectorControls>
				<Panel>
					<PanelBody
						title={ __( 'Select SVG image', 'bigup-blocks' ) }
						initialOpen={ true }
					>
						<div className="editor-post-featured-image">
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ onSelectMedia }
									value={ mediaId }
									allowedTypes={ [ 'image/svg+xml' ] }
									render={ ( { open } ) => (
										<Button 
											className={ mediaId == 0 ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview'}
											onClick={ open }
										>
											{ mediaId == 0 && __( 'Choose an image', 'bigup-blocks' ) }
											{ media != undefined && 
												<ResponsiveWrapper
													naturalWidth={ media.media_details.width }
													naturalHeight={ media.media_details.height }
												>
													<img src={ media.source_url } />
												</ResponsiveWrapper>
												}
										</Button>
									) }
								/>
							</MediaUploadCheck>
							{ mediaId != 0 && 
								<MediaUploadCheck>
									<MediaUpload
										title={ __( 'Replace image', 'bigup-blocks' ) }
										value={ mediaId }
										onSelect={ onSelectMedia }
										allowedTypes={ [ 'image/svg+xml' ] }
										render={ ( { open } ) => (
											<Button
												onClick={ open }
											>
												{ __( 'Replace image', 'bigup-blocks') }
											</Button>
										) }
									/>
								</MediaUploadCheck>
							}
							{ mediaId != 0 && 
								<MediaUploadCheck>
									<Button
										onClick={ removeMedia }
									>
										{ __( 'Remove image', 'bigup-blocks' ) }
									</Button>
								</MediaUploadCheck>
							}
						</div>
					</PanelBody>
				</Panel>
				<Panel>
					<PanelBody
						title={ __( 'Dimensions', 'bigup-blocks' ) }
						initialOpen={ true }
					>
						<PanelRow>{ __( 'Width', 'bigup-blocks' ) }</PanelRow>
						<UnitControl
							value={ width }
							onChange={ ( value ) => setAttributes( { width: value } ) }
							__next40pxDefaultSize
						/>
						<PanelRow>{ __( 'Height', 'bigup-blocks' ) }</PanelRow>
						<UnitControl
							value={ height }
							onChange={ ( value ) => setAttributes( { height: value } ) }
							__next40pxDefaultSize
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>
			{ svgSource != '' &&
				<div
					{ ...blockProps }
					dangerouslySetInnerHTML={ { __html: svgSource } }
					data-line-width={ width }
					data-line-height={ height }
				/>
			}
			{ svgSource === '' &&
				<div
					{ ...blockProps }
					data-line-width={ width }
					data-line-height={ height }
				>
					<p>{ 'Select SVG image' }</p>
				</div>
			}
		</>
	)
}
