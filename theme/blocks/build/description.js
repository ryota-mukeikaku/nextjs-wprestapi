!function(){"use strict";var e=window.wp.element,t=window.wp.plugins,n=window.wp.editPost,i=window.wp.data,o=window.wp.components,r=window.React;"post"===window.pagenow&&(0,t.registerPlugin)("theme-description",{render:()=>{const{meta:t,meta:{description:a}}=(0,i.useSelect)((e=>({meta:e("core/editor").getEditedPostAttribute("meta")||{}}))),{editPost:s}=(0,i.useDispatch)("core/editor"),[w,c]=(0,r.useState)(a);return(0,r.useEffect)((()=>{s({meta:{...t,description:w}})}),[w]),(0,e.createElement)(n.PluginDocumentSettingPanel,{name:"Description",title:"Description"},(0,e.createElement)(o.TextareaControl,{value:w,onChange:c}))},icon:null})}();