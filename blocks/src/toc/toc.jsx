import { registerBlockType } from '@wordpress/blocks';
import { withSelect, select } from '@wordpress/data';
import { TextControl, ToggleControl } from '@wordpress/components';
import './editor.scss';

registerBlockType('theme/toc', {
    title: '目次',
    icon: 'list-view',
    category: 'layout',
    attributes: {
        title: {
            type: 'string',
            default: '',
        },
        enableH3: {
            type: 'boolean',
            default: true,
        },
        post_id: {
            type: 'number',
            default: null,
        },
    },
    edit: withSelect((select) => {
        return {
            blocks: select('core/block-editor').getBlocks(),
            current_id: select('core/editor').getCurrentPostId(),
        };
    })(Edit),
    save: () => {
        return null;
    },
});

export function Edit(props) {
    const {
        blocks = [],
        current_id,
        attributes: { title = '', enableH3 = true, post_id },
        className,
        setAttributes,
    } = props;
    const baseClassName = className.replace(/\s.+?$/, '');
    const headings = [];
    if (current_id != post_id) {
        setAttributes({ post_id: current_id });
    }
    blocks.forEach((el) => {
        if (!(el.name === 'core/heading' && el.attributes.level < 4)) {
            return;
        }
        if (el.attributes.level === 2) {
            headings.push({ h2: el.attributes.content, h3: [] });
        } else if (headings.length > 0) {
            headings[headings.length - 1].h3.push(el.attributes.content);
        }
    });

    return (
        <div className={className}>
            <div className={`${baseClassName}__data`}>
                <TextControl
                    value={title}
                    onChange={(v) => setAttributes({ title: v })}
                    placeholder='目次'
                    label='見出し（任意）'
                />
                <ToggleControl
                    label='h3を有効にする'
                    checked={enableH3}
                    onChange={() => setAttributes({ enableH3: !enableH3 })}
                />
            </div>
            <div className={`${baseClassName}__list`}>
                {headings.map((el, i) => (
                    <div key={i} className={`${baseClassName}__item`}>
                        <span>{el.h2}</span>
                        {enableH3 && el.h3.length > 0 && (
                            <div className={`${baseClassName}__list`}>
                                {el.h3.map((h3, ii) => (
                                    <div
                                        key={ii}
                                        className={`${baseClassName}__item`}
                                    >
                                        <span>{h3}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
