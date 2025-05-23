import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import { Logo } from './svg'
import './border.scss'
import Edit from './edit'
import save from './save'
import metadata from './block.json'
import { Variations } from './variations'

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
	variations: Variations,
	edit: Edit,
	save,
} )
