'use strict';
var selectedPhrase = '';
$(function () {
    var $links = $('.nav-tab-horizontal').find('a');
    $links.on('click', function () {
        $('.nav-tab-horizontal').find('li').removeClass('active');
        var $this = $(this);
        $this.parent().addClass('active');
        $('#email-tab-content').find('.tab-pane.active').removeClass('active');
        $($this.attr('href')).addClass('active');
        //$this.trigger('resizePanel'); todo: check for trigger
        if ($this.hasClass('email-to-link')) {
            addon.port.emit('resizeP', 375, 149);
        }
        else {
            addon.port.emit('resizeP', 375, 193);
        }
    });
    $links.eq(0).triggerHandler('resizePanel', () => {
        addon.port.emit('resizeP', 350, 149);
    });
    $links.eq(1).triggerHandler('resizePanel', () => {
        addon.port.emit('resizeP', 350, 193);
    });

    $('#customize-quick-buttons').find('.nav-bar').find('a').on('click', function () {
        var $this = $(this);
        var $linkParent = $this.parent();
        if ($linkParent.hasClass('remove-service')) {
            $linkParent.removeClass('remove-service');
        }
        else {
            $linkParent.addClass('remove-service');
        }
    })
});

addon.port.on('resetHome', () => {
    $('#main-menu').show();
    $('#email-options-content,#customize-send-parent').hide();
});

function emailOption(e) {
    e.stopPropagation();
    $('#email-to-link').click();
    switchOps('#main-menu', '#email-options-content', 375, 149);
}

function emailAction() {

}

function switchOps(sourceElem, destinationElem, width, height) {
    if (sourceElem) {
        $(sourceElem).hide();
    }
    addon.port.emit('resizeP', (width || 216), (height || 306));
    if (destinationElem) {
        $(destinationElem).show();
    }
}

function cancelChangeServices() {
    //var $linkServices = $('#customize-quick-buttons').find('.nav-bar').find('li');
    //
    //for(var i=0;i<$linkServices.length;i++){
    //    var $thisLink = $linkServices[i];
    //    if(!$thisLink.data('selected')){
    //        $thisLink.removeClass('remove-service')
    //    }
    //}
    switchOps('#customize-quick-buttons', '', 375, 260);
}