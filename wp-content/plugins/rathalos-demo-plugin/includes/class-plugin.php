<?php

namespace Rahtalos_Demo_Plugin;

class Plugin {
  /**
   * version
   *
   * @var string
   */
  protected $version;

  /**
   * __construct
   *
   * @return void
   */
  public function __construct() {
    if (defined('RATHALOS_DEMO_PLUGIN_VERSION')) {
      $this->version = RATHALOS_DEMO_PLUGIN_VERSION;
    } else {
      $this->version = '1.0.0';
    }
  }

  public function init() {
    // Get started with your plugin.
    return;
  }
}
