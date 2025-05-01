import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import { Logo } from './svg'
import './inline-svg.scss'
import Edit from './edit'
import save from './save'
import metadata from './block.json'
import { withSelect } from '@wordpress/data'

/*
 * Debug.
 * console.log( metadata.name + ' BLOCK LOADED' )
 * RUN IN CONSOLE TO SEE REGISTERED BLOCKS: wp.blocks.getBlockTypes() 
 */


/**
 * Register the block.
 */
registerBlockType( metadata.name, {
	...metadata,
	icon: Logo,
	edit: withSelect( ( select, { attributes } ) => {
		return { media: attributes.mediaId ? select( 'core' ).getMedia( attributes.mediaId ) : undefined };
	} )( Edit ),
	save,
} )
