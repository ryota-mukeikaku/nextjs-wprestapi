import { registerPlugin } from '@wordpress/plugins';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { useSelect } from '@wordpress/data';

const Preview = () => {
    const {
        meta,
        meta: { preview_hash },
    } = useSelect((select) => ({
        meta: select('core/editor').getEditedPostAttribute('meta') || {},
    }));

    return (
        <>
            {preview_hash && (
                <PluginDocumentSettingPanel
                    name='プレビュー'
                    title='プレビュー'
                >
                    <a
                        href={`${NEXT_PUBLIC_URL}preview/${preview_hash}`}
                        target='_blank'
                    >
                        プレビュー
                    </a>
                </PluginDocumentSettingPanel>
            )}
        </>
    );
};
if (window.pagenow === 'post') {
    registerPlugin('theme-preview', {
        render: Preview,
        icon: null,
    });
}
