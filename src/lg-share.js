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
            document.getElementById('lg-share-facebook').setAttribute('href', 'https://www.facebook.com/sharer/sharer.php?u=' + (encodeURIComponent(_this.core.items[event.detail.index].getAttribute('data-facebook-share-url') || window.location.href)));

            document.getElementById('lg-share-twitter').setAttribute('href', 'https://twitter.com/intent/tweet?text=' + _this.core.items[event.detail.index].getAttribute('data-tweet-text') + '&url=' + (encodeURIComponent(_this.core.items[event.detail.index].getAttribute('data-twitter-share-url') || window.location.href)));

            document.getElementById('lg-share-googleplus').setAttribute('href', 'https://plus.google.com/share?url=' + (encodeURIComponent(_this.core.items[event.detail.index].getAttribute('data-googleplus-share-url') || window.location.href)));

            document.getElementById('lg-share-pinterest').setAttribute('href', 'http://www.pinterest.com/pin/create/button/?url=' + (encodeURIComponent(_this.core.items[event.detail.index].getAttribute('data-pinterest-share-url') || window.location.href)) + '&media=' + encodeURIComponent(_this.core.items[event.detail.index].getAttribute('href') || _this.core.items[event.detail.index].getAttribute('data-src')) + '&description=' + _this.core.items[event.detail.index].getAttribute('data-pinterest-text'));

        }, 100);
    });
};

Share.prototype.destroy = function() {

};

window.lgModules.share = Share;
