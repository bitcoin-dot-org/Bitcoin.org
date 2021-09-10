<?php
if ( defined( 'WP_UNINSTALL_PLUGIN' ) ) {

	error_log( 'Started uninstalling Bitcoin and Altcoin Wallets' );

	function wallets_delete_option( $option ) {
		static $blog_ids = null;

		if ( is_multisite() ) {

			delete_site_option( $option );

			if ( is_null( $blog_ids ) ) {
				global $wpdb;
				$blog_ids = $wpdb->get_col( "SELECT blog_id FROM $wpdb->blogs" );
			}

			foreach ( $blog_ids as $blog_id ) {
				switch_to_blog( $blog_id );
				delete_option( $option );
				restore_current_blog();
			}
		} else {
			delete_option( $option );
		}
	}

	// remove cron job
	wallets_delete_option( 'wallets_cron_interval' );
	$timestamp = wp_next_scheduled( 'wallets_periodic_checks' );
	if ( false !== $timestamp ) {
		wp_unschedule_event( $timestamp, 'wallets_periodic_checks' );
	}

	// remove cron settings
	wallets_delete_option( 'wallets_retries_withdraw' );
	wallets_delete_option( 'wallets_retries_move' );
	wallets_delete_option( 'wallets_cron_batch_size' );
	wallets_delete_option( 'wallets_last_cron_run' );
	wallets_delete_option( 'wallets_secrets_retain_minutes' );
	wallets_delete_option( 'wallets_cron_aggregating' );

	// remove notification settings
	wallets_delete_option( 'wallets_email_enabled' );
	wallets_delete_option( 'wallets_email_from' );
	wallets_delete_option( 'wallets_email_from_name' );
	wallets_delete_option( 'wallets_email_error_forwarding_enabled' );
	wallets_delete_option( 'wallets_buddypress_enabled' );
	wallets_delete_option( 'wallets_history_enabled' );

	wallets_delete_option( 'wallets_email_withdraw_enabled' );
	wallets_delete_option( 'wallets_email_withdraw_subject' );
	wallets_delete_option( 'wallets_email_withdraw_message' );

	wallets_delete_option( 'wallets_email_withdraw_failed_enabled' );
	wallets_delete_option( 'wallets_email_withdraw_failed_subject' );
	wallets_delete_option( 'wallets_email_withdraw_failed_message' );

	wallets_delete_option( 'wallets_email_move_send_enabled' );
	wallets_delete_option( 'wallets_email_move_send_subject' );
	wallets_delete_option( 'wallets_email_move_send_message' );

	wallets_delete_option( 'wallets_email_move_send_failed_enabled' );
	wallets_delete_option( 'wallets_email_move_send_failed_subject' );
	wallets_delete_option( 'wallets_email_move_send_failed_message' );

	wallets_delete_option( 'wallets_email_move_receive_enabled' );
	wallets_delete_option( 'wallets_email_move_receive_subject' );
	wallets_delete_option( 'wallets_email_move_receive_message' );

	wallets_delete_option( 'wallets_email_deposit_enabled' );
	wallets_delete_option( 'wallets_email_deposit_subject' );
	wallets_delete_option( 'wallets_email_deposit_message' );

	// remove confirmation settings
	wallets_delete_option( 'wallets_confirm_withdraw_admin_enabled' );
	wallets_delete_option( 'wallets_confirm_withdraw_user_enabled' );
	wallets_delete_option( 'wallets_confirm_withdraw_email_subject' );
	wallets_delete_option( 'wallets_confirm_withdraw_email_message' );
	wallets_delete_option( 'wallets_confirm_move_admin_enabled' );
	wallets_delete_option( 'wallets_confirm_move_user_enabled' );
	wallets_delete_option( 'wallets_confirm_move_email_subject' );
	wallets_delete_option( 'wallets_confirm_move_email_message' );
	wallets_delete_option( 'wallets_confirm_redirect_page' );
	wallets_delete_option( 'wallets_confirm_redirect_seconds' );
	wallets_delete_option( 'wallets_confirm_inform_admins_enabled' );
	wallets_delete_option( 'wallets_confirm_inform_admins_subject' );
	wallets_delete_option( 'wallets_confirm_inform_admins_message' );
	wallets_delete_option( 'wallets_confirm_receive_move_user_enabled' );
	wallets_delete_option( 'wallets_confirm_receive_move_email_subject' );
	wallets_delete_option( 'wallets_confirm_receive_move_email_message' );
	wallets_delete_option( 'wallets_confirm_move_auto_days' );
	wallets_delete_option( 'wallets_confirm_withdraw_auto_days' );

	// remove exchange rate providers settings
	wallets_delete_option( 'wallets_rates_fixer_key' );
	wallets_delete_option( 'wallets_rates_providers' );
	wallets_delete_option( 'wallets_rates_cache_expiry' );
	wallets_delete_option( 'wallets_rates_tor_enabled' );
	wallets_delete_option( 'wallets_rates_tor_ip' );
	wallets_delete_option( 'wallets_rates_tor_port' );
	wallets_delete_option( 'wallets_default_base_symbol' );

	// remove exchange rate data
	wallets_delete_option( 'wallets_rates' );
	wallets_delete_option( 'wallets_rates_cryptos' );
	wallets_delete_option( 'wallets_rates_fiats' );
	delete_transient( 'wallets_rates' );
	delete_transient( 'wallets_rates_cryptos' );
	delete_transient( 'wallets_rates_fiats' );

	// remove bitcoin builtin adapter settings
	$option_slug = 'wallets-bitcoin-core-node-settings';
	wallets_delete_option( "{$option_slug}-general-enabled" );
	wallets_delete_option( "{$option_slug}-rpc-ip" );
	wallets_delete_option( "{$option_slug}-rpc-port" );
	wallets_delete_option( "{$option_slug}-rpc-user" );
	wallets_delete_option( "{$option_slug}-rpc-password" );
	wallets_delete_option( "{$option_slug}-rpc-passphrase" );
	wallets_delete_option( "{$option_slug}-rpc-path" );
	wallets_delete_option( "{$option_slug}-rpc-ssl-enabled" );
	wallets_delete_option( "{$option_slug}-fees-move" );
	wallets_delete_option( "{$option_slug}-fees-move-proportional" );
	wallets_delete_option( "{$option_slug}-fees-withdraw" );
	wallets_delete_option( "{$option_slug}-fees-withdraw-proportional" );
	wallets_delete_option( "{$option_slug}-other-minconf" );

	// remove frontend settings
	wallets_delete_option( 'wallets_qrcode_enabled' );
	wallets_delete_option( 'wallets_zlib_disabled' );
	wallets_delete_option( 'wallets_legacy_json_apis' );
	wallets_delete_option( 'wallets_visibility_check_enabled' );
	wallets_delete_option( 'wallets_poll_interval_transactions' );
	wallets_delete_option( 'wallets_poll_interval_coin_info' );

	// remove db schema revision
	wallets_delete_option( 'wallets_db_revision' );

	// remove user caps
	if ( is_multisite() ) {
		global $wpdb;
		$blog_ids = $wpdb->get_col( "SELECT blog_id FROM $wpdb->blogs" );
		foreach ( $blog_ids as $blog_id ) {
			switch_to_blog( $blog_id );
			$user_roles   = array_keys( get_editable_roles() );
			$user_roles[] = 'administrator';
			foreach ( $user_roles as $role_name ) {

				$role = get_role( $role_name );

				if ( ! is_null( $role ) ) {
					$role->remove_cap( 'manage_wallets' );
					$role->remove_cap( 'has_wallets' );
					$role->remove_cap( 'list_wallet_transactions' );
					$role->remove_cap( 'send_funds_to_user' );
					$role->remove_cap( 'withdraw_funds_from_wallet' );
				}
			}
			restore_current_blog();
		}
	} else {
		$user_roles   = array_keys( get_editable_roles() );
		$user_roles[] = 'administrator';
		foreach ( $user_roles as $role_name ) {

			$role = get_role( $role_name );

			if ( ! is_null( $role ) ) {
				$role->remove_cap( 'manage_wallets' );
				$role->remove_cap( 'has_wallets' );
				$role->remove_cap( 'list_wallet_transactions' );
				$role->remove_cap( 'send_funds_to_user' );
				$role->remove_cap( 'withdraw_funds_from_wallet' );
			}
		}
	}

	// remove dismissed notice options
	global $wpdb;
	if ( $wpdb->options ) {
		$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE 'wallets_dismissed_%';" );
	} else {
		$wpdb->query( "DELETE FROM {$wpdb->sitemeta} WHERE meta_key LIKE 'wallets_dismissed_%';" );
	}

	error_log( 'Finished uninstalling Bitcoin and Altcoin Wallets' );
}
