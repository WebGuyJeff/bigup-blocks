<?php
namespace BigupWeb\Bigup_Blocks;

/**
 * Bigup Blocks - Initialisation.
 *
 * Setup styles and functionality for this plugin.
 *
 * @package   bigup-blocks
 * @author    Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright (c) 2023, Jefferson Real
 * @license   GPL3+
 * @link      https://jeffersonreal.uk
 */

class Init {

	/**
	 * Setup the plugin by registering all hooks.
	 */
	public function setup() {
		add_action( 'admin_init', array( new Settings_Tab_One(), 'init' ), 10, 0 );
		add_action( 'admin_init', array( new Settings_Tab_Two(), 'init' ), 10, 0 );
		add_action( 'admin_menu', array( new Settings_Parent(), 'register_admin_menu' ), 1, 0 );
		$settings = new Settings();
		add_action( 'admin_menu', array( &$settings, 'register_admin_menu' ), 99, 0 );
		add_action( 'bigup_settings_dashboard_entry', array( &$settings, 'echo_plugin_settings_link' ), 10, 0 );
		add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts_and_styles' ), 10, 0 );
		add_action( 'enqueue_block_assets', array( $this, 'editor_scripts_and_styles' ), 10, 0 );
		add_action( 'enqueue_block_assets', array( $this, 'frontend_scripts_and_styles' ), 10, 0 );
		add_action( 'init', array( new Blocks(), 'register_all' ), 10, 0 );
	}


	/**
	 * Register and enqueue admin scripts and styles.
	 */
	public function admin_scripts_and_styles() {
		if ( ! wp_script_is( 'bigup_icons', 'registered' ) ) {
			wp_register_style(
				'bigup_icons',
				BIGUPBLOCKS_URL . 'dashicons/css/bigup-icons.css',
				array(),
				filemtime( BIGUPBLOCKS_PATH . 'dashicons/css/bigup-icons.css' ),
				'all'
			);
		}
		if ( ! wp_script_is( 'bigup_icons', 'enqueued' ) ) {
			wp_enqueue_style( 'bigup_icons' );
		}

		global $pagenow;
		$slug = plugin_basename( BIGUPBLOCKS_PATH );
		if ( isset( $_GET['page'] ) && $_GET['page'] === $slug ) {
			// We're now on the admin page of this plugin.
		}
	}

	/**
	 * Register and enqueue editor scripts and styles.
	 */
	public function editor_scripts_and_styles() {
		$editor_asset_path = BIGUPBLOCKS_PATH . 'build/js/bigup-blocks-editor.asset.php';
		if ( ! file_exists( $editor_asset_path ) ) {
			throw new Error( 'You need to run `npm start` or `npm run build` for the plugin first.' );
		} else {
			$assets = require $editor_asset_path;
			wp_enqueue_script( 'bigup-blocks-editor_js', BIGUPBLOCKS_URL . 'build/js/bigup-blocks-editor.js', $assets['dependencies'], filemtime( BIGUPBLOCKS_PATH . 'build/js/bigup-blocks-editor.js' ), true );
		}
		if ( has_block( 'bigup-blocks/flippable-cards' ) || has_block( 'bigup-blocks/hero-punch' ) ) {
			wp_enqueue_script( 'gsap', BIGUPBLOCKS_URL . 'build/third-party/js/gsap.min.js', array(), filemtime( BIGUPBLOCKS_PATH . 'build/third-party/js/gsap.min.js' ), true );
			wp_enqueue_script( 'gsap-scrolltrigger', BIGUPBLOCKS_URL . 'build/third-party/js/ScrollTrigger.min.js', array( 'gsap' ), filemtime( BIGUPBLOCKS_PATH . 'build/third-party/js/ScrollTrigger.min.js' ), true );
		}
	}

	/**
	 * Register and enqueue frontend scripts and styles.
	 */
	public function frontend_scripts_and_styles() {
		if ( has_block( 'bigup-blocks/hero-punch' ) ) {
			wp_enqueue_script( 'gsap', BIGUPBLOCKS_URL . 'build/third-party/js/gsap.min.js', array(), filemtime( BIGUPBLOCKS_PATH . 'build/third-party/js/gsap.min.js' ), true );
			wp_enqueue_script( 'gsap-scrolltrigger', BIGUPBLOCKS_URL . 'build/third-party/js/ScrollTrigger.min.js', array( 'gsap' ), filemtime( BIGUPBLOCKS_PATH . 'build/third-party/js/ScrollTrigger.min.js' ), true );
		}
		if ( has_block( 'bigup-blocks/flippable-cards' ) ) {
			wp_enqueue_script( 'gsap', BIGUPBLOCKS_URL . 'build/third-party/js/gsap.min.js', array(), filemtime( BIGUPBLOCKS_PATH . 'build/third-party/js/gsap.min.js' ), true );
			wp_enqueue_script( 'gsap-scrolltrigger', BIGUPBLOCKS_URL . 'build/third-party/js/ScrollTrigger.min.js', array( 'gsap' ), filemtime( BIGUPBLOCKS_PATH . 'build/third-party/js/ScrollTrigger.min.js' ), true );
		}
	}
}
