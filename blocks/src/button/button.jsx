import React from 'react'
import { registerBlockType } from '@wordpress/blocks'
import { URLInput } from '@wordpress/block-editor'
import { TextControl, ToggleControl, RadioControl } from '@wordpress/components'
import Link from '../components/link.jsx'
import './editor.scss'

registerBlockType('theme/button', {
    title: 'ボタン',
    icon: 'button',
    category: 'layout',
    attributes: {
        text: {
            type: 'string',
            default: ''
        },
        href: {
            type: 'string',
            default: ''
        },
        blank: {
            type: 'boolean',
            default: false
        },
        reverse: {
            type: 'boolean',
            default: false
        },
        mode: {
            type: 'string',
            default: 'link'
        },
        target: {
            type: 'string',
            default: ''
        },
        sponsored: {
            type: 'boolean',
            default: false
        }
    },
    edit: (props) => {
        const {
            className,
            attributes: { href, blank, reverse, text, mode, target, sponsored },
            setAttributes
        } = props
        const baseClassName = className.replace(/\s.+?$/, '')
        return (
            <div className={className}>
                <div className={`${baseClassName}__input`}>
                    <div className={`${baseClassName}__input-line`}>
                        <div className={`${baseClassName}__input-text`}>
                            <TextControl
                                value={text}
                                onChange={(v) => setAttributes({ text: v })}
                                placeholder='テキスト'
                            />
                        </div>
                        <div className={`${baseClassName}__href`}>
                            <URLInput
                                onChange={(v) => setAttributes({ href: v })}
                                value={href}
                                className={`${baseClassName}__href`}
                                placeholder='https://example.com/'
                            />
                        </div>
                    </div>
                    <div className={`${baseClassName}__input-line`}>
                        <div className={`${baseClassName}__blank`}>
                            <ToggleControl
                                checked={blank}
                                onChange={() =>
                                    setAttributes({ blank: !blank })
                                }
                                label='新しいタブで開く'
                            />
                        </div>
                        <div className={`${baseClassName}__reverse`}>
                            <ToggleControl
                                checked={reverse}
                                onChange={() =>
                                    setAttributes({ reverse: !reverse })
                                }
                                label='色反転'
                            />
                        </div>
                        <div className={`${baseClassName}__sponsored`}>
                            <ToggleControl
                                checked={sponsored}
                                onChange={() =>
                                    setAttributes({ sponsored: !sponsored })
                                }
                                label='広告'
                            />
                        </div>
                        <div className={`${baseClassName}__mode`}>
                            <RadioControl
                                selected={mode}
                                options={[
                                    { label: 'リンク', value: 'link' },
                                    {
                                        label: 'ダウンロード',
                                        value: 'download'
                                    },
                                    { label: 'メール', value: 'mail' },
                                    { label: '電話', value: 'tel' }
                                ]}
                                onChange={(v) => setAttributes({ mode: v })}
                            />
                        </div>
                    </div>
                    <div className={`${baseClassName}__target`}>
                        <TextControl
                            value={target}
                            onChange={(v) => setAttributes({ target: v })}
                            placeholder='aタグのdata-target属性の値としてセットされます'
                        />
                    </div>
                </div>
                <div
                    className={`${className} ${
                        reverse ? className + '--reverse' : ''
                    }`}
                >
                    <div className={`${baseClassName}__link`}>
                        <div className={`${baseClassName}__text`}>{text}</div>
                    </div>
                </div>
            </div>
        )
    },
    save: (props) => {
        const {
            className = 'wp-block-theme-button',
            attributes: { reverse, text, mode }
        } = props
        const baseClassName = className.replace(/\s.+?$/, '')
        return (
            <div
                className={`${className} ${
                    reverse ? className + '--reverse' : ''
                } ${mode ? className + '--' + mode : ''}`}
            >
                <Link
                    {...props.attributes}
                    className={`${baseClassName}__link`}
                >
                    <div className={`${baseClassName}__text`}>{text}</div>
                </Link>
            </div>
        )
    }
})
