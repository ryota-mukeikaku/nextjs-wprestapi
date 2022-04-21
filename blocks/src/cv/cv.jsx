import React from 'react';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';
import './editor.scss';

registerBlockType('theme/cv', {
    title: 'CVブロック',
    icon: 'thumbs-up',
    category: 'layout',
    attributes: {
        heading: {
            type: 'string',
            default: '',
        },
        text: {
            type: 'string',
            default: '',
        },
    },
    edit: (props) => {
        const blockProps = useBlockProps;
        const {
            className,
            attributes: { heading, text },
            setAttributes,
        } = props;
        const baseClassName = className.replace(/\s.+?$/, '');

        return (
            <div className={className} {...blockProps}>
                <div>
                    <TextControl
                        value={heading}
                        onChange={(v) => setAttributes({ heading: v })}
                        placeholder='見出し（任意）'
                        label='見出し（任意）'
                    />
                </div>
                <div>
                    <InnerBlocks
                        allowedBlocks={['theme/button']}
                        template={[['theme/button']]}
                    />
                </div>
                <div>
                    <TextControl
                        value={text}
                        onChange={(v) => setAttributes({ text: v })}
                        placeholder='下部テキスト（任意）'
                        label='下部テキスト（任意）'
                    />
                </div>
            </div>
        );
    },
    save: (props) => {
        const {
            className = 'wp-block-theme-cv',
            attributes: { heading, text },
        } = props;
        const baseClassName = className.replace(/\s.+?$/, '');
        const blockProps = useBlockProps.save();
        return (
            <div className={className} {...blockProps}>
                {heading && (
                    <div className={`${baseClassName}__heading`}>{heading}</div>
                )}
                <div className={`${baseClassName}__buttons`}>
                    <InnerBlocks.Content />
                </div>
                {text && <div className={`${baseClassName}__text`}>{text}</div>}
            </div>
        );
    },
});
