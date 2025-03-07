import { __ } from '@wordpress/i18n'
import { registerBlockType } from '@wordpress/blocks'
import './hero-punch.scss'
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
console.log( metadata.name + ' BLOCK LOADED' )


/**
 * Register the block.
 */
registerBlockType( metadata.name, {
	...metadata,
	icon: Logo,
	example: {
		innerBlocks: [
			{
				name: 'core/paragraph',
				attributes: {
					content: __( 'Welcome Amigo!' )
				}
			},
			{
				name: 'core/paragraph',
				attributes: {
					content: __( 'This is a full width section designed to provide impact as a hero banner. Some GSAP animation provides a surprise as you scroll down!' )
				}
			},
			{
				name: 'core/button',
				attributes: {
					content: __( 'Let\'s do something!' )
				}
			}
		]
    },

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} )
