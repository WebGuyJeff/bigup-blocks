<?php
namespace BigupWeb\Bigup_Blocks;

/**
 * Plugin Name: Bigup Web: Bigup Blocks
 * Plugin URI: https://jeffersonreal.uk
 * Description: A collection of Gutenberg blocks.
 * Version: 0.0.2
 * Author: Jefferson Real
 * Author URI: https://jeffersonreal.uk
 * License: GPL3
 *
 * @package bigup_contact_form
 * @version 0.0.1
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright (c) 2023, Jefferson Real
 * @license GPL3+
 * @link https://jeffersonreal.uk
 */

// Set global constants.
define( 'BIGUPBLOCKS_DEBUG', defined( 'WP_DEBUG' ) && WP_DEBUG === true );
define( 'BIGUPBLOCKS_PATH', trailingslashit( __DIR__ ) );
define( 'BIGUPBLOCKS_URL', trailingslashit( get_site_url( null, strstr( __DIR__, '/wp-content/' ) ) ) );

// Setup PHP namespace.
require_once BIGUPBLOCKS_PATH . 'classes/autoload.php';

// Setup the plugin.
$Init = new Init();
$Init->setup();
