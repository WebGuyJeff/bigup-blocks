<?php
/**
 * Bigup Blocks - Class Autoloader
 *
 * @package bigup-blocks;
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright (c) 2023, Jefferson Real
 * @license GPL3+
 * @link https://jeffersonreal.uk
 * @param string $class The fully-qualified class name.
 */
spl_autoload_register(
	function( $class ) {

		$namespace       = 'BigupWeb\\' . BIGUPWEB_NAMESPACE . '\\';
		$root_dir        = dirname( dirname( __FILE__ ), 1 );
		$sub_dir         = str_replace( $root_dir, '', dirname( __FILE__ ) );
		$filename_prefix = 'class-';

		// does the class use the namespace prefix?
		$namespace_length = strlen( $namespace );

		if ( strncmp( $namespace, $class, $namespace_length ) !== 0 ) {
			  // no, move to the next registered autoloader
			  return;
		}

		$relative_classname = substr( $class, $namespace_length );
		$classname          = array_reverse( explode( '\\', $class ) )[0];
		$sub_namespace      = str_replace( $classname, '', $relative_classname );

		$filename       = str_replace( '\\', DIRECTORY_SEPARATOR, $sub_namespace . DIRECTORY_SEPARATOR . $filename_prefix . $classname . '.php' );
		$class_filepath = strtolower( $root_dir . $sub_dir . str_replace( '_', '-', $filename ) );

		// if the file exists, require it
		if ( file_exists( $class_filepath ) ) {
			include_once $class_filepath;
		} else {
			echo '<script>console.log("ERROR: Bigup Web Plugin PHP autoloader | Class not found: ' . $classname . '");</script>';
		}
	}
);
