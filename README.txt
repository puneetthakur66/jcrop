READE ME:
=========
http://deepliquid.com/content/Jcrop.html


Gameguyz Image Crop:
>1. Download and install this module
>2. On your custom form, add these code:
  if (module_exists('gameguyz_cropimage')) {
    $element_info = element_info('managed_file');
    $form['crop_image_test'] = array(
      '#title' => t('Crop Image Test'),
      '#description' => t('Crop image after upload'),
      '#type' => 'managed_file',
      '#default_value' => variable_get('crop_image_test_fid', ''),
      '#upload_location' => 'public://',
      '#process' => array_merge($element_info['#process'], array('gameguyz_cropimage_process', 'gameguyz_backstage_beauty_settings_process')),
      '#file_value_callbacks' => array('gameguyz_cropimage_widget_value'),
    );
  }
>3. In form submit function:
	if ($form_state['values']['crop_image_test'] != 0) {
    $crop_info = variable_get('gameguyz_cropimage_info', array());
    $fid = $form_state['values']['crop_image_test']['fid'];
    $fid = empty($crop_info[$fid])?$fid:$crop_info[$fid]['fid_new'];
    variable_set('crop_image_test_fid', $fid);
  }

>4. Change crop box size: gameguyz_cropimage/gameguyz_cropimage.module 
   gameguyz_backstage_beauty_settings_process()
