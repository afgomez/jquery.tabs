/**
 * jQuery.tabs. A simple tabs plugin
 *
 * Copyright (c) 2009, Alejandro Fernández Gómez
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the <organization> nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY Alejandro Fernández Gómez ''AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL Alejandro Fernández Gómez BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function($) {
    
    /**
     * The tabs function
     * @param {Object} options An object with user defined options.
     * @return jQuery collection
     */
    
    
    $.fn.tabs = function(options) {
        var opts = $.extend({}, $.fn.tabs.defaults, options);
        return this.each(function() {
            new Tabs(this, opts);
        });
    };
    
    
    // Default params
    $.fn.tabs.defaults = {
        selected_class: 'selected',
        trigger_on_visible: 'visible'
    };
    
    
    /**
     * This is the base Class for the plugin.
     * The constructor just initializes some needed attributes and calls #init
     * @constructor
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
        /**
         * Initializes the tabs.
         * It finds the list item with class="opts.selected_class" and show the tab linked to it.
         * Also binds the click event to the tabs with a suitable href
         * @private
         */
        init: function() {
            var that = this;
            this.el.find('a').each(function() {
                var a = $(this);
                
                // href must start with # to link with an existing ID.
                // If doesn't, don't do anything and go to the next link.
                if (!a.attr('href').match(/^#.?/)) {
                    return;
                }
                
                a.click(function(e) {
                    e.preventDefault();
                    that.show_tab(a.attr('href'), a.parent());
                });
                
                // Show the selected item
                if (a.parent().hasClass(that.opts.selected_class)) {
                    a.click();
                }
                
            });
        },
        
        /**
         * Shows an specific tab
         * @param {String} tab The tab ID, using CSS syntax.
         * @param {HTMLLIElement} li The selected LI item. We need this to cache itself.
         * @private
         */
        show_tab: function(tab, li) {
            if (this.selected_tab) {
                $(this.selected_tab).hide();
                $(this.selected_li).removeClass(this.opts.selected_class);
            };
            
            var tab = $(tab);
            tab.show();
            if (this.opts.trigger_on_visible) {
                tab.trigger(this.opts.trigger_on_visible);
            }
            $(li).addClass(this.opts.selected_class);
            
            this.selected_tab = tab;
            this.selected_li  = li;
        }
    });
    
})(jQuery);