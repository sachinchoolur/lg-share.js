var shareSefaults = {
    share: true,
    facebook: true,
    facebookDropdownText: 'Facebook',
    twitter: true,
    twitterDropdownText: 'Twitter',
    googlePlus: true,
    googlePlusDropdownText: 'GooglePlus',
    pinterest: true,
    pinterestDropdownText: 'Pinterest'
};

function toCamelCase(input) { 
    return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });
}

var Share = function(element) {

    this.el = element;

    this.core = window.lgData[this.el.getAttribute('lg-uid')];
    this.core.s = Object.assign({}, shareSefaults, this.core.s);

    if (this.core.s.share) {
        this.init();
    }

    return this;
};

Share.prototype.init = function() {
    var _this = this;
    var shareHtml = '<span id="lg-share" class="lg-icon">' +
        '<ul class="lg-dropdown" style="position: absolute;">';
    shareHtml += _this.core.s.facebook ? '<li><a id="lg-share-facebook" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.facebookDropdownText + '</span></a></li>' : '';
    shareHtml += _this.core.s.twitter ? '<li><a id="lg-share-twitter" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.twitterDropdownText + '</span></a></li>' : '';
    shareHtml += _this.core.s.googlePlus ? '<li><a id="lg-share-googleplus" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.googlePlusDropdownText + '</span></a></li>' : '';
    shareHtml += _this.core.s.pinterest ? '<li><a id="lg-share-pinterest" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' + this.core.s.pinterestDropdownText + '</span></a></li>' : '';
    shareHtml += '</ul></span>';

    this.core.outer.querySelector('.lg-toolbar').insertAdjacentHTML('beforeend', shareHtml);
    this.core.outer.querySelector('.lg').insertAdjacentHTML('beforeend', '<div id="lg-dropdown-overlay"></div>');
    utils.on(document.getElementById('lg-share'), 'click.lg', function() {
        if (utils.hasClass(_this.core.outer, 'lg-dropdown-active')) {
            utils.removeClass(_this.core.outer, 'lg-dropdown-active');
        } else {
            utils.addClass(_this.core.outer, 'lg-dropdown-active');
        }
    });

    utils.on(document.getElementById('lg-dropdown-overlay'), 'click.lg', function() {
        utils.removeClass(_this.core.outer, 'lg-dropdown-active');
    });

    utils.on(_this.core.el, 'onAfterSlide.lgtm', function(event) {

        setTimeout(function() {
            if (_this.core.s.facebook) {
                document.getElementById('lg-share-facebook').setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + _this.getSharePropsUrl(event.detail.index, 'data-facebook-share-url'));
              }
              if (_this.core.s.twitter) {
                document.getElementById('lg-share-twitter').setAttribute('href', 'https://twitter.com/intent/tweet?text=' + _this.getShareProps(event.detail.index, 'data-tweet-text') + '&url=' + _this.getSharePropsUrl(event.detail.index, 'data-twitter-share-url'));
              }
              if(_this.core.s.googlePlus) {
                document.getElementById('lg-share-googleplus').setAttribute('href', 'https://plus.google.com/share?url=' + _this.getSharePropsUrl(event.detail.index, 'data-googleplus-share-url'));
              }
              if(_this.core.s.pinterest) {
                document.getElementById('lg-share-pinterest').setAttribute('href', 'http://www.pinterest.com/pin/create/button/?url=' + _this.getSharePropsUrl(event.detail.index, 'data-pinterest-share-url') + '&media=' + encodeURIComponent(_this.getShareProps(event.detail.index, 'href') || _this.getShareProps(event.detail.index, 'data-src')) + '&description=' + _this.getShareProps(event.detail.index, 'data-pinterest-text'));
              }
        }, 100);
    });
};


Share.prototype.getSharePropsUrl = function (index, prop) {
    var shareProp = this.getShareProps(index, prop);
    if (!shareProp) {
        shareProp = window.location.href;
    }
    return encodeURIComponent(shareProp);
};


Share.prototype.getShareProps = function (index, prop) {
    var shareProp = '';
    if (this.core.s.dynamic) {
        shareProp = this.core.items[index][toCamelCase(prop.replace('data-', ''))];
    } else if (this.core.items[index].getAttribute(prop)) {
        shareProp = this.core.items[index].getAttribute(prop);
    }
    return shareProp;
};



Share.prototype.destroy = function() {

};

window.lgModules.share = Share;