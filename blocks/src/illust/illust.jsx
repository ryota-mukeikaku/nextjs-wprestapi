import { registerPlugin } from '@wordpress/plugins'
import { PluginDocumentSettingPanel } from '@wordpress/edit-post'
import { useDispatch, useSelect } from '@wordpress/data'
import { TextareaControl } from '@wordpress/components'
import { useEffect, useState } from 'react'

const Illust = () => {
    const {
        meta,
        meta: { illust }
    } = useSelect((select) => ({
        meta: select('core/editor').getEditedPostAttribute('meta') || {}
    }))

    const { editPost } = useDispatch('core/editor')

    const [illust_val, setDesc] = useState(illust)

    useEffect(() => {
        editPost({
            meta: {
                ...meta,
                illust: illust_val
            }
        })
    }, [illust_val])

    return (
        <PluginDocumentSettingPanel name='Illust' title='Illust'>
            <TextareaControl value={illust_val} onChange={setDesc} />
        </PluginDocumentSettingPanel>
    )
}
if (window.pagenow === 'post') {
    registerPlugin('theme-illust', {
        render: Illust,
        icon: null
    })
}
