(function($) {
    $.fn.tabs = function(options) {
        var opts = $.extend({}, options, $.fn.tabs.defaults);
        return this.each(function() {
            new Tabs(this, opts);
        });
    };
    
    $.fn.tabs.defaults = {
        selected_class: 'selected'
    };
    
    
    /**
     * Constructor
     */
    function Tabs(el, opts) {
        this.el   = $(el);
        this.opts = opts;
        
        this.selected_tab = '';
        this.selected_li  = {};
        
        this.init();
    };
    
    Tabs.prototype.extend = $.extend;
    Tabs.prototype.extend({
        init: function() {
            var that = this;
            this.el.find('a').each(function() {
                var a = $(this);
                
                // href must start with #. If don't, just left the link intact.
                if (!a.attr('href').match(/^#.?/)) {
                    return;
                }
                
                // Show the selected item
                if (a.parent().hasClass(that.opts.selected_class)) {
                    that.show_tab(a.attr('href'), a.parent());
                }
                
                a.click(function(e) {
                    e.preventDefault();
                    that.show_tab(a.attr('href'), a.parent());
                });
                
            });
        },
        show_tab: function(tab, li) {
            if (this.selected_tab) {
                $(this.selected_tab).hide();
                $(this.selected_li).removeClass(this.opts.selected_class);
            };
            
            $(tab).show();
            $(li).addClass(this.opts.selected_class);
            
            this.selected_tab = tab;
            this.selected_li  = li;
        }
    });
    
})(jQuery);