tinymce.PluginManager.add('noneditable',function(a){var b,n,c,d='contenteditable';function h(e){return function(i){return(" "+i.attr("class")+" ").indexOf(e)!==-1;};}function f(e){var i=c.length,k=e.content,l=tinymce.trim(n);function r(m){var o=arguments,p=o[o.length-2];var q=p>0?k.charAt(p-1):'';if(q==='"'){return m;}if(q==='>'){var s=k.lastIndexOf('<',p);if(s!==-1){var t=k.substring(s,p);if(t.indexOf('contenteditable="false"')!==-1){return m;}}}return('<span class="'+l+'" data-mce-content="'+a.dom.encode(o[0])+'">'+a.dom.encode(typeof o[1]==="string"?o[1]:o[0])+'</span>');}if(e.format=="raw"){return;}while(i--){k=k.replace(c[i],r);}e.content=k;}b=" "+tinymce.trim(a.getParam("noneditable_editable_class","mceEditable"))+" ";n=" "+tinymce.trim(a.getParam("noneditable_noneditable_class","mceNonEditable"))+" ";var g=h(b);var j=h(n);c=a.getParam("noneditable_regexp");if(c&&!c.length){c=[c];}a.on('PreInit',function(){if(c){a.on('BeforeSetContent',f);}a.parser.addAttributeFilter('class',function(e){var i=e.length,k;while(i--){k=e[i];if(g(k)){k.attr(d,"true");}else if(j(k)){k.attr(d,"false");}}});a.serializer.addAttributeFilter(d,function(e){var i=e.length,k;while(i--){k=e[i];if(!g(k)&&!j(k)){continue;}if(c&&k.attr('data-mce-content')){k.name="#text";k.type=3;k.raw=true;k.value=k.attr('data-mce-content');}else{k.attr(d,null);}}});});});
