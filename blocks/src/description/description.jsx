import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { useDispatch, useSelect } from '@wordpress/data';
import { TextareaControl } from '@wordpress/components';
import { useEffect, useState } from 'react';

const Description = () => {
    const {
        meta,
        meta: { description },
    } = useSelect((select) => ({
        meta: select('core/editor').getEditedPostAttribute('meta') || {},
    }));

    const { editPost } = useDispatch('core/editor');

    const [desc, setDesc] = useState(description);

    useEffect(() => {
        editPost({
            meta: {
                ...meta,
                description: desc,
            },
        });
    }, [desc]);

    return (
        <PluginDocumentSettingPanel name='Description' title='Description'>
            <TextareaControl value={desc} onChange={setDesc} />
        </PluginDocumentSettingPanel>
    );
};
if (window.pagenow === 'post') {
    registerPlugin('theme-description', {
        render: Description,
        icon: null,
    });
}
