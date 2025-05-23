import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import './flippable-card.scss'
import Edit from './edit'
import save from './save'
import metadata from './block.json'
import {
	Logo
} from './svg'

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

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} )
