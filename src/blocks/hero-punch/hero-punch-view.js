/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

const punchAnimation = () => {

	// GSAP is imported via WP enqueue in PHP init() function.
	if ( typeof( gsap ) !== 'object' || typeof( ScrollTrigger ) === 'undefined' ) {
		console.warn( 'Missing GSAP dependencies. Script aborted.' )
		return
	}

	gsap.registerPlugin( ScrollTrigger )

	const selector     = '.punch'
	const scrollParent = selector + ' .scrollTrigger_parent',
			content      = selector + ' .contentWrapper',
			fist         = selector + ' .fist_container',
			hands        = selector + ' .styledBox_pinToTop',
			sign         = selector + ' .styledBox',
			me           = selector + ' .contentWrapper_pinToRight',
			star1        = selector + ' .star-1',
			star2        = selector + ' .star-2',
			anim         = []
	
	if ( ! document.querySelector( selector ) ) return

	const tlPunch = () => {
		const punch = gsap.timeline()
		.addLabel( 'fadeIn' )
			.set( content, { y: '-100vh', opacity: 0 } )
			.to( content, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }, '>' )
		.addLabel( 'punch' )
			.set( fist, { visibility: 'visible' } )
			.to( fist, { top: 0, duration: 0.3, ease: 'elastic.out(1,0.8)' } )
			.to( fist, { top: '110vh', duration: 1.8, ease: 'power3.out' } )
			.set( fist, { visibility: 'hidden' } )
			// Fly up.
			.set( hands, { visibility: 'hidden' }, '<-2.02' )
			// .set( sign,  { margin: 0 }, '<' )
			.to( sign, { xPercent: -13, yPercent: -60, scale: 0.1, duration: 1.5, ease: 'power3.out' }, '<' )
			.to( sign, { rotateX: 1080, rotateY: 720, rotateZ: 360, duration: 1.5, ease: 'none' }, '<' )
			.to( me, { xPercent: 10, yPercent: -40, scale: 0.1, duration: 1.5, ease: 'power3.out' }, '<' )
			.to( me, { rotateZ:1440, duration: 1.5, ease: 'none' }, '<' )
			// Fall down.
			.to( sign, { xPercent: -15, yPercent: -20, duration: 1, ease: 'power2.in' }, '>-0.6' )
			.to( sign, { rotateX: 1080, rotateY: 720, scale: 0.001, rotateZ: 360, duration: 1, ease: 'none' }, '<' )
			.to( me, { xPercent: 10, yPercent: -20, duration: 1, ease: 'power2.in' }, '<' )
			.to( me, { rotateZ: 1800, scale: 0.001, duration: 1, ease: 'none' }, '<' )
			// Twinkle.
			.set( [ star1, star2 ], { scale: 0, visibility: 'visible' } )
			.to( [ star1, star2 ], { scale: 1000, rotate: 180, duration: 0.2, ease: 'none' }, '>' )
			.to( [ star1, star2 ], { scale: 0, rotate: 360, duration: 0.2, ease: 'none' }, '>' )
			.set( [ star1, star2 ], { visibility: 'hidden', rotate: 0 } )
			// Hide.
			.set( content, { visibility: 'hidden' } )
		punch.pause( 'punch' )
		return punch
	}
	
	const createScrollTriggers = () => {
		anim.punch = tlPunch()
		ScrollTrigger.create( {
			trigger: scrollParent,
			start: 'top top-=100px',
			end: 'bottom top',
			onEnter:     () => anim.punch.play( 'punch' ),
			onLeave:     () => anim.punch.pause( 'fadeIn' ),
			onLeaveBack: () => anim.punch.tweenFromTo( 'fadeIn', 'punch' ) // Scroll above start.
		} )
	}

	let timeout
	const debounce = ( fn, wait, args = [] ) => {
		clearTimeout( timeout )
		timeout = setTimeout( () => fn( ...args ), wait )
	}
	
	const updateOnResize = () => {
		Object.entries( anim ).forEach( ( [ , tl ] ) => tl.revert() )
		createScrollTriggers()
	}
	
	const init = setInterval( () => {
		if ( document.readyState === 'complete' ) {
			clearInterval( init )
			createScrollTriggers()
			window.onresize = () => debounce( updateOnResize, 150 )
		}
	}, 100 )
}

punchAnimation()
