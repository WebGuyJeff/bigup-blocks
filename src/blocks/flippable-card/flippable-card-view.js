/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

const flippableCard = () => {

	gsap.ticker.fps( 30 )
	
	window.onload = () => {
	
		const cardClass = '.flippableCard'
		const flipClass = '.flippable' // Make unique to toggle animation per card.
		const iconClass = '.tapIcon'
		const flipCards = document.querySelectorAll( flipClass )
	
		// Setup card interactivity.
		
		const pulseAnimation = ( elem ) => {
			const tl = gsap.timeline()
				tl.set( elem.closest( cardClass ), { zIndex: 10 } )
				tl.set( elem, { scale: 0.75, boxShadow: '0 0 0 0 #3335', opacity: 1 } )
				   .to( elem, { scale: 1, boxShadow: '0 0 0 25px #0000', duration: 1 } )
				tl.set( elem.closest( cardClass ), { zIndex: 0 } )
			return tl
		}
		
		const hoverIn  = ( e ) => pulseAnimation( e.target.closest( cardClass ).querySelector( iconClass ) ).play()
		
		const hoverOut = ( e ) => {
			gsap.set( e.target.closest( cardClass ), { zIndex: 0 } )
			gsap.to( e.target.closest( cardClass ).querySelector( iconClass ), { opacity: 0.5, duration: 0.15 } )
		}
		
		const click    = ( e ) => {
			const elem = e.target.closest( flipClass )
			const deg  = elem.style.transform.includes( 'rotateY(180deg)' ) ? 0 : 180
			gsap.to( elem, { rotationY: deg, duration: 0.15 } )
		}
		
		const addListeners = () => {
			flipCards.forEach( ( card ) => {
				card.addEventListener( 'mouseenter', hoverIn )
				card.addEventListener( 'mouseleave', hoverOut )
				card.addEventListener( 'click', click )
			} )
		}
		addListeners()
		
		const removeListeners = () => {
			flipCards.forEach( ( card ) => {
				card.removeEventListener( 'mouseover', hoverIn )
				card.removeEventListener( 'mouseleave', hoverOut )
				card.removeEventListener( 'click', click )
			} )
		}
		
		flipCards.forEach( ( card ) => {
			const icon = card.querySelector( iconClass )
			gsap.timeline( {
				defaults: { force3D:true },
				scrollTrigger: {
					trigger: card,
					/*
					 * toggleActions*: [onEnter] [onLeave] [onEnterBack] [onLeaveBack].
					 * *OPTIONS: play | pause | resume | reset | restart | complete | reverse | none.
					 */
					toggleActions: "play reset play reset",
					// start: [trigger element position] [viewport position].
					start: 'bottom bottom'
				} } )
				.add( pulseAnimation( icon ) )
				.to( icon, { opacity: 0.5, duration: 0.15 } )
		} )
	}
}

flippableCard()
