import { __ } from '@wordpress/i18n'
import { Logo } from './svg'

const Variations = [
	{
		name: 'wave',
		title: __( 'Wave', 'bigup-blocks' ),
		icon: Logo,
		attributes: {
			'variation': 'wave'
		},
		isActive: ( blockAttributes ) => { 
			return blockAttributes.variation === 'wave'
		}
	},
	{
		name: 'squiggle',
		title: __( 'Squiggle', 'bigup-blocks' ),
		icon: Logo,
		attributes: {
			'variation': 'squiggle'
		},
		isActive: ( blockAttributes ) => { 
			return blockAttributes.variation === 'squiggle'
		}
	}
]

export { Variations }
