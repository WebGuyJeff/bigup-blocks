<?php
namespace BigupWeb\Bigup_Blocks;

/**
 * Plugin Name: Bigup Web: Bigup Blocks
 * Plugin URI: https://jeffersonreal.uk
 * Description: A collection of Gutenberg blocks.
 * Version: 0.0.1
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
define( 'BIGUPWEB_NAMESPACE', 'Bigup_Blocks' );
$url = plugin_dir_url( __FILE__ );
define( 'BIGUPBLOCKS_URL', $url );
$path = plugin_dir_path( __FILE__ );
define( 'BIGUPBLOCKS_PATH', $path );

// Load namespace and classes.
require_once( BIGUPBLOCKS_PATH . 'classes/autoload.php' );

// Setup the plugin.
$Init = new Init();
$Init->setup();
