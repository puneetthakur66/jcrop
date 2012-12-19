(function ($) {
Drupal.behaviors.gameguyz_cropimage = {
  attach: function (context, settings) {
    // wait till 'fadeIn' effect ends (defined in filefield_widget.inc)
    setTimeout(attachJcrop, 1000, context);
    //attachJcrop(context);

    function attachJcrop(context) {
    	//console.log($('.gameguyz_backstage_cropbox', context));
      if ($('.gameguyz_cropimage_cropbox', context).length == 0) {
        // no cropbox, probably an image upload (http://drupal.org/node/366296)
        return;
      }
      // add Jcrop exactly once to each cropbox
      //$('.preview-existing', context).once(function() {
      $('div.gameguyz_cropimage img', context).once(function() {
        var self = $(this);

        //alert("found a cropbox" + self.attr('id'));

        // get the id attribute for multiple image support
        var self_id = self.attr('id');
        var id = self_id.substring(0, self_id.indexOf('_cropbox'));
        $(this).Jcrop({
          onChange: function(c) {
            //$('.preview-existing', widget).css({display: 'none'});
            //var preview = $('.imagefield-crop-preview', widget);
            // skip newly added blank fields
            if (undefined == settings.gameguyz_cropimage[id].preview) {
              return;
            }
            var rx = settings.gameguyz_cropimage[id].preview.width / c.w;
            var ry = settings.gameguyz_cropimage[id].preview.height / c.h;
            $('#'+id+'_cropbox_preview_img').css({
              width: Math.round(rx * settings.gameguyz_cropimage[id].preview.orig_width) + 'px',
              height: Math.round(ry * settings.gameguyz_cropimage[id].preview.orig_height) + 'px',
              marginLeft: '-' + Math.round(rx * c.x) + 'px',
              marginTop: '-' + Math.round(ry * c.y) + 'px',
              display: 'block'
            });
            // set coords
            //var coord_prefix_id = id.substring(0, self_id.indexOf('-fid')) + '-crop';
            var coord_prefix_id = id + '-crop';
            jQuery('#'+coord_prefix_id+'-x').val(c.x);
						jQuery('#'+coord_prefix_id+'-y').val(c.y);
						jQuery('#'+coord_prefix_id+'-x2').val(c.x2);
						jQuery('#'+coord_prefix_id+'-y2').val(c.y2);
						jQuery('#'+coord_prefix_id+'-w').val(c.w);
						jQuery('#'+coord_prefix_id+'-h').val(c.h);
          },
          onSelect: function(c) {
          	this.onChange(c);
          },
          aspectRatio: settings.gameguyz_cropimage[id].box.ratio,
          boxWidth: settings.gameguyz_cropimage[id].box.box_width,
          boxHeight: settings.gameguyz_cropimage[id].box.box_height,
          minSize: [Drupal.settings.gameguyz_cropimage[id].minimum.width, Drupal.settings.gameguyz_cropimage[id].minimum.height], 
          /*
           * Setting the select here calls onChange event, and we lose the original image visibility
          */
          setSelect: [
          	parseInt(Drupal.settings.gameguyz_cropimage[id].setselect[0]),
          	parseInt(Drupal.settings.gameguyz_cropimage[id].setselect[1]),
          	parseInt(Drupal.settings.gameguyz_cropimage[id].setselect[2]),
          	parseInt(Drupal.settings.gameguyz_cropimage[id].setselect[3])
          ]
        });
      });
    };
  }
};

})(jQuery);
