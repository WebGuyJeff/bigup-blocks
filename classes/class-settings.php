<?php
namespace BigupWeb\Bigup_Blocks;

/**
 * Admin Settings Handler.
 *
 * @package bigup-blocks
 * @author Jefferson Real <me@jeffersonreal.uk>
 * @copyright Copyright (c) 2023, Jefferson Real
 * @license GPL3+
 * @link https://jeffersonreal.uk
 */


/**
 * Bigup Blocks - Admin Settings.
 *
 * Hook into the WP admin area and add menu settings pages.
 */
class Settings {


	/**
	 * Class Variables.
	 *
	 * $admin_label - Menu label for the plugin.
	 * $page_slug   - page URI where the sub-menu will be.
	 * $group_name  - Option group ID which is set when registering settings for this page.
	 * $icon        - SVG Bigup Web icon for the admin menu as a base64 string.
	 */
	public $admin_label  = 'Blocks';
	public $page_slug    = 'bigup-blocks';
	public $group_name   = 'bigup-blocks';
	public $icon         = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMzIiIGhlaWdodD0iMTMyIj48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0wIDB2MTMyaDM1LjRWODcuMmMwLTUuNiAwLTExLjYgMS43LTE2LjcuOC0yLjUgNC40LTMuNyA3LjEtMy43aDM0LjVjMy4yIDAgNi45LjEgOC4yIDEuMiAyLjMgMS44IDEuOSA3LjIgMi4xIDEwLjUuNCA0LjkgMSAxNC4yLS41IDE1LjYtMy4zIDMuNC0yLjggNC05LjIgMTAuMS0xLjggMS40LTYtLjktNS4zLTQuNC43LTMuNiAzLjQtOS43IDMuNC0xMS40IDAtMS43LTIgLjgtMi44IDAtLjMtLjQtLjYtLjktLjgtMS42LS43LTIuNCA0LjgtNy43IDQuMi04LjgtLjktMS4zLTQuMyA3LTYuNCA1LS42LS41LTIuMS00LjktMi44LTUtMSAwIDEuOCA0LjguOCA3LjktLjcgMi0zLjIgMi44LTUuMiAzLTIuNi41LTEzLjMtMTAuMS0xNC05LjUtLjguNyAxMC44IDEwLjcgMTIuNCAxNCAxLjMgMi4xIDIuMyA3LjUgMS43IDguMS0uNi43LTEwLjktNC05LjItMS41IDEuOCAyLjYgMTAgMy4yIDEzLjYgMy44IDEuMS4yIDMgLjEgNC42IDIuNS4zLjQtMi42LS40LTUuMy0xLTIuNi0uMy01LjQtMS01LjktLjgtLjcuNSAyIDMuMiAyLjggMy40IDEuMS40IDExLjUtLjUgMTIuMi0uNyAyLjgtMSAzLjktMS42IDQuMy0yIDUuOC02LjcgOS40LTkgOS42LTEyLjEuMi0zLjEtLjQtMTMgMi4zLTE0LjggMi42LTEuOCA1LjMuMSA2LjUgNS44IDEuMiA1LjcgMy40IDUuNiA0LjQgMTAuOCAxIDUuMi0zLjMgMTUuOS01LjYgMjEuOS0yLjIgNi03LjQgNy42LTEwLjYgOS42LTMuMyAyLTYuNyAzLjUtMTAuOCA0LjMtMi45LjYtNy41IDEuMS05LjkgMS4zSDEzMlYwSDY2czcuNC41IDExLjQgMS4zUzg1IDMuNyA4OC4yIDUuN2MzLjIgMiA4LjQgMy42IDEwLjYgOS42IDIuMyA2IDYuNyAxNi42IDUuNiAyMS44LTEgNS4zLTMuMiA1LjEtNC40IDEwLjgtMS4yIDUuNy0zLjkgNy43LTYuNSA1LjktMi43LTEuOS0yLjEtMTEuOC0yLjMtMTQuOC0uMi0zLjEtMy44LTUuNS05LjYtMTIuMS0uNC0uNS0xLjUtMS4xLTQuMy0yLS43LS4yLTExLTEuMi0xMi4yLS44LS44LjItMy41IDMtMi44IDMuNC41LjMgMy4zLS40IDUuOS0uOSAyLjctLjQgNS42LTEuMyA1LjMtLjlDNzIgMjguMSA3MCAyOCA2OSAyOC4yYy0zLjUuNi0xMS44IDEuMi0xMy42IDMuOC0xLjcgMi42IDguNi0yLjIgOS4yLTEuNS42LjctLjQgNi0xLjcgOC4yLTEuNiAzLjMtMTMuMiAxMy4yLTEyLjQgMTMuOS43LjcgMTEuNC0xMCAxNC05LjUgMiAuMyA0LjUgMSA1LjIgMyAxIDMuMS0xLjcgOC0uOCA3LjguNyAwIDIuMi00LjQgMi44LTUgMi0yIDUuNSA2LjQgNi40IDUgLjYtMS00LjktNi4zLTQuMi04LjcuMi0uNy41LTEuMi44LTEuNS44LTEgMi44IDEuNiAyLjggMCAwLTEuOC0yLjctNy44LTMuNC0xMS40LS43LTMuNiAzLjUtNS45IDUuMy00LjUgNi40IDYgNiA2LjggOS4yIDEwLjEgMS40IDEuNSAxIDEwLjcuNSAxNS43LS4yIDMuMi4yIDguNi0yLjEgMTAuNS0yIDEuNS04LjggMS4xLTEyIDEuMUg0NC4yYy0yLjcgMC02LjMtMS4xLTcuMS0zLjctMS43LTUtMS43LTExLTEuNy0xNi43VjBaIi8+PC9zdmc+Cg==';
	private $parent_slug;

	/**
	 * Holds the WP_Post object for the add_meta_boxes callback.
	 */
	public $post_obj = '';


	/**
	 * Init the class by hooking into the admin interface.
	 *
	 * do_settings() is hooked in  to 'init' instead of 'admin_init' to support GraphQL.
	 */
	public function __construct() {
		$this->parent_slug = Settings_Parent::$page_slug;
	}


	/**
	 * Add admin menu entry to sidebar
	 */
	public function register_admin_menu() {

		add_submenu_page(
			$this->parent_slug,                      // parent_slug
			$this->admin_label . ' Settings',        // page_title
			$this->admin_label,                      // menu_title
			'manage_options',                        // capability
			$this->page_slug,                        // menu_slug
			array( &$this, 'create_settings_page' ), // function
			null,                                    // position
		);

	}


	/**
	 * Echo a link to this plugin's settings page.
	 */
	public function echo_plugin_settings_link() {
		?>
		<a href="/wp-admin/admin.php?page=<?php echo $this->page_slug; ?>">
			Go to <?php echo $this->admin_label; ?> settings
		</a>
		<?php
	}


	/**
	 * Create Blocks Settings Page
	 */
	public function create_settings_page() {

		/* Get the active tab from the $_GET URL param. */
		$default_tab = null;
		$tab         = isset( $_GET['tab'] ) ? $_GET['tab'] : $default_tab;
		$slug        = $this->page_slug;
		?>

		<div class="wrap">
			<h1>
				<span>
					<img
						style="max-height: 1em;margin-right: 0.5em;vertical-align: middle;"
						src="<?php echo $this->icon; ?>"
					/>
				</span>
				<?php echo esc_html( get_admin_page_title() ); ?>
			</h1>

			<p>These settings control the Bigup Blocks.</p>

			<?php settings_errors(); // Display the form save notices here. ?>

			<nav class="nav-tab-wrapper">
				<a
					href="?page=<?php echo $slug; ?>"
					class="nav-tab 
					<?php
					if ( $tab === null ) :
						?>
						nav-tab-active<?php endif; ?>"
				>
					Default Tab
				</a>
				<a
					href="?page=<?php echo $slug; ?>&tab=tab-2"
					class="nav-tab 
					<?php
					if ( $tab === 'tab-2' ) :
						?>
						nav-tab-active<?php endif; ?>"
				>
					Tab 2
				</a>
			</nav>

			<div class="tab-content">
			<?php
			switch ( $tab ) :
				case 'tab-2':
					Settings_Tab_Two::output_tab();
					break;
				default:
					Settings_Tab_One::output_tab();
					break;
			endswitch;
			?>
			</div>

		</div>

		<?php
	}
}