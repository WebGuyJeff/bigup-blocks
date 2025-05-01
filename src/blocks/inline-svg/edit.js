import { __ } from '@wordpress/i18n'
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor'
import { PanelBody, Button, ResponsiveWrapper } from '@wordpress/components'
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
		svgSource
	} = attributes

	const blockProps = useBlockProps( {
        style: { backgroundImage: mediaUrl != '' ? 'url("' + mediaUrl + '")' : 'none' },
    } )

	const removeMedia = () => {
		setAttributes( {
			mediaId: 0,
			mediaUrl: ''
		} )
	}
 
 	const onSelectMedia = ( media ) => {
		fetch( media.url, { mode: 'no-cors'} )
		.then( result => result.text() )
		.then( text => {
			const SVG = text.match( /<svg[^>]*?>[\S\s]*<\/svg>/ )
			console.log( 'SVG: ', SVG )
			setAttributes( {
				mediaId: media.id,
				mediaUrl: media.url,
				svgSource: SVG
			} )
		} )
	}

	let SVGinline = () => { return(
		<div dangerouslySetInnerHTML={ { __html: svgSource } } />
	) }

	return (
		<>
			<InspectorControls>
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
			</InspectorControls>
			<div { ...blockProps }>
				<p>{ 'SVG Data:' }</p>
				{ svgSource != '' &&
					<div innerHTML={ svgSource }></div>
				}
				{ svgSource === '' &&
					<div dangerouslySetInnerHTML={
						{ __html: svgSource }
					} />
				}
			</div>
		</>
	)
}
