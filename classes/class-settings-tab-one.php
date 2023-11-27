<?php
namespace BigupWeb\Bigup_Blocks;

/**
 * Settings Tab One.
 *
 * @package bigup-blocks
 */
class Settings_Tab_One {

	public const PAGE   = 'bigupblock_page_tab_one';
	public const GROUP  = 'bigupblock_group_tab_one';
	public const OPTION = 'bigupblock_settings_tab_one';

	public $settings;


	/**
	 * Output the content for this tab.
	 */
	public static function output_tab() {
		echo '<p>Tab one settings will go here</p>';
		//settings_fields( self::GROUP );
		//do_settings_sections( self::PAGE );
	}


	/**
	 * Register the settings.
	 */
	public function init() {

		//$this->settings = get_option( self::OPTION );
		//register_setting
		//add_settings_section
		//add_settings_field
	}
}
