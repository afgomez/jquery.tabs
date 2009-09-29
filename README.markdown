jQuery.tabs A simple tabs plugin
================================

Using jQuery.tabs
-----------------

First of all, you need the following HTML code:

    <!-- tabs -->
    <ul class="tabs">
        <li class="selected"><a href="#tab1">Tab 1</a></li>
        <li><a href="#tab2">Tab 2</a></li>
        <li><a href="#tab3">Tab 3</a></li>
        <!-- ... -->
    </ul>
    
    <!-- tab1 -->
    <div class="tab" id="tab1">
        Content for tab1
    </div>
    
    <!-- tab2 -->
    <div class="tab" id="tab2">
        Content for tab2
    </div>
    
    <!-- tab3 -->
    <div class="tab" id="tab3">
        Content for tab3
    </div>
    
    <!-- ... -->

As you can see, you link each item in the list with his tab using the href attribute of the link inside the list item.

You also must add `class="selected"` to the item of the selected tab.

Then you must hide all the tabs with CSS

    <style type="text/css">
    .tab { display:none; }
    </style

And then you just call the plugin.

    <script>
        $('.tabs').tabs();
    </script>

The plugin will find the selected tab and show it.