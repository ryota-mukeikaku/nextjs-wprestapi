import React from 'react';

export default function Link(props) {
    const {
        href = '',
        blank = false,
        mode = 'link',
        className = '',
        target = '',
        sponsored = false,
        children,
    } = props;
    if (!blank) {
        if (!sponsored) {
            switch (mode) {
                case 'link':
                    return (
                        <a
                            className={className}
                            href={href}
                            data-target={target}
                        >
                            {children}
                        </a>
                    );
                case 'mail':
                    return (
                        <a
                            className={className}
                            href={`mailto:${href}`}
                            data-target={target}
                        >
                            {children}
                        </a>
                    );
                case 'tel':
                    return (
                        <a
                            className={className}
                            href={`tel:${href}`}
                            data-target={target}
                        >
                            {children}
                        </a>
                    );
                case 'download':
                    return (
                        <a
                            className={className}
                            href={href}
                            download
                            data-target={target}
                        >
                            {children}
                        </a>
                    );
            }
        } else {
            switch (mode) {
                case 'link':
                    return (
                        <a
                            className={className}
                            href={href}
                            data-target={target}
                            rel='sponsored noreferrer'
                        >
                            {children}
                        </a>
                    );
                case 'mail':
                    return (
                        <a
                            className={className}
                            href={`mailto:${href}`}
                            data-target={target}
                            rel='sponsored noreferrer'
                        >
                            {children}
                        </a>
                    );
                case 'tel':
                    return (
                        <a
                            className={className}
                            href={`tel:${href}`}
                            data-target={target}
                            rel='sponsored noreferrer'
                        >
                            {children}
                        </a>
                    );
                case 'download':
                    return (
                        <a
                            className={className}
                            href={href}
                            download
                            data-target={target}
                            rel='sponsored noreferrer'
                        >
                            {children}
                        </a>
                    );
            }
        }
    } else {
        switch (mode) {
            case 'link':
                return (
                    <a
                        className={className}
                        href={href}
                        target='_blank'
                        rel={`noopener noreferrer${
                            sponsored ? ' sponsored' : ''
                        }`}
                        data-target={target}
                    >
                        {children}
                    </a>
                );
            case 'mail':
                return (
                    <a
                        className={className}
                        href={`mailto:${href}`}
                        target='_blank'
                        rel={`noopener noreferrer${
                            sponsored ? ' sponsored' : ''
                        }`}
                        data-target={target}
                    >
                        {children}
                    </a>
                );
            case 'tel':
                return (
                    <a
                        className={className}
                        href={`tel:${href}`}
                        target='_blank'
                        rel={`noopener noreferrer${
                            sponsored ? ' sponsored' : ''
                        }`}
                        data-target={target}
                    >
                        {children}
                    </a>
                );
            case 'download':
                return (
                    <a
                        className={className}
                        href={href}
                        download
                        target='_blank'
                        rel={`noopener noreferrer${
                            sponsored ? ' sponsored' : ''
                        }`}
                        data-target={target}
                    >
                        {children}
                    </a>
                );
        }
    }
}
