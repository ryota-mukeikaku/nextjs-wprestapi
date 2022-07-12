wp.domReady(() => {
    wp.blocks.unregisterBlockStyle('core/quote', 'default')
    wp.blocks.unregisterBlockStyle('core/quote', 'large')
    wp.blocks.unregisterBlockStyle('core/quote', 'plain')
    wp.blocks.unregisterBlockStyle('core/image', 'default')
    wp.blocks.unregisterBlockStyle('core/image', 'rounded')
    wp.blocks.unregisterBlockStyle('core/pullquote', 'default')
    wp.blocks.unregisterBlockStyle('core/pullquote', 'solid-color')
    wp.blocks.unregisterBlockStyle('core/table', 'regular')
    wp.blocks.unregisterBlockStyle('core/table', 'stripes')
    wp.blocks.unregisterBlockStyle('core/button', 'fill')
    wp.blocks.unregisterBlockStyle('core/button', 'outline')
    wp.blocks.unregisterBlockStyle('core/separator', 'default')
    wp.blocks.unregisterBlockStyle('core/separator', 'wide')
    wp.blocks.unregisterBlockStyle('core/separator', 'dots')

    const registerEmbedBlocks = ['youtube']
    wp.blocks.getBlockVariations('core/embed').forEach((block) => {
        if (!registerEmbedBlocks.includes(block.name)) {
            wp.blocks.unregisterBlockVariation('core/embed', block.name)
        }
    })
})

// wp.blocks.registerBlockStyle('core/table', {
//     name: 'l',
//     label: '左編みかけ',
//     isDefault: false,
// });

// wp.blocks.registerBlockStyle('core/table', {
//     name: 't',
//     label: '上編みかけ',
//     isDefault: false,
// });

// wp.blocks.registerBlockStyle('core/table', {
//     name: 'lt',
//     label: '左上編みかけ',
//     isDefault: false,
// });

// wp.blocks.registerBlockStyle('core/image', {
//     name: 'center',
//     label: '中央寄せ',
//     isDefault: false,
// });
