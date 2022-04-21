import React from "react";
import { registerBlockType } from "@wordpress/blocks";
import {
  MediaUpload,
  MediaUploadCheck,
  RichText,
  URLInput,
} from "@wordpress/block-editor";
import { TextControl, Button } from "@wordpress/components";
import "./editor.scss";

registerBlockType("theme/profile", {
  title: "人物紹介",
  icon: "admin-users",
  category: "layout",
  attributes: {
    name: {
      type: "string",
      default: "",
      source: "text",
      selector: '[data-gb="name"]',
    },
    position: {
      type: "string",
      default: "",
      source: "text",
      selector: '[data-gb="position"]',
    },
    description: {
      type: "string",
      default: "",
      source: "html",
      selector: '[data-gb="description"]',
    },
    image: {
      type: "object",
      default: null,
    },
    linkHref: {
      type: "string",
      default: "",
    },
    linkText: {
      type: "string",
      default: "",
    },
  },
  edit: (props) => {
    const {
      className,
      attributes: { name, position, description, image, linkHref, linkText },
      setAttributes,
    } = props;
    const baseClassName = className.replace(/\s.+?$/, "");
    return (
      <div className={className}>
        <div className={`${baseClassName}__thumb`}>
          <MediaUploadCheck>
            {image == null && (
              <MediaUpload
                onSelect={(image) => setAttributes({ image: image })}
                allowedTypes={["image"]}
                render={({ open }) => (
                  <>
                    <div className={`${baseClassName}__picture`} />
                    <Button className="image-button" isLink onClick={open}>
                      画像をアップロード
                    </Button>
                  </>
                )}
              />
            )}
            {image && (
              <>
                <picture className={`${baseClassName}__picture`}>
                  <img
                    src={image.url}
                    alt={name}
                    className={`${baseClassName}__image`}
                  />
                </picture>
                <Button
                  onClick={() => {
                    setAttributes({ image: null });
                  }}
                  isLink
                  isDestructive
                >
                  画像を削除
                </Button>
              </>
            )}
          </MediaUploadCheck>
        </div>
        <div className={`${baseClassName}__data`}>
          <TextControl
            className={`${baseClassName}_name`}
            value={name}
            onChange={(v) => setAttributes({ name: v })}
            placeholder="名前"
            label="名前"
          />
          <TextControl
            className={`${baseClassName}__position`}
            value={position}
            onChange={(v) => setAttributes({ position: v })}
            placeholder="役職・肩書き"
            label="役職・肩書き"
          />
          <RichText
            className={`${baseClassName}__description`}
            value={description}
            onChange={(v) => setAttributes({ description: v })}
            placeholder="説明"
          />
          <URLInput
            className={`${baseClassName}__href`}
            value={linkHref}
            onChange={(v) => setAttributes({ linkHref: v })}
            placeholder="https://test.com/"
            label="URL（任意）"
          />
          <TextControl
            className={`${baseClassName}__link`}
            value={linkText}
            onChange={(v) => setAttributes({ linkText: v })}
            placeholder="サイト名"
            label="サイト名（任意）"
          />
        </div>
      </div>
    );
  },
  save: (props) => {
    const {
      className = "wp-block-theme-profile",
      attributes: { name, position, description, image, linkHref, linkText },
    } = props;
    const baseClassName = className.replace(/\s.+?$/, "");
    return (
      <div className={className}>
        <div className={`${baseClassName}__thumb`}>
          {image && (
            <picture className={`${baseClassName}__picture`}>
              <img
                src={image.url}
                alt={name}
                className={`${baseClassName}__image`}
              />
            </picture>
          )}
        </div>
        <div className={`${baseClassName}__data`}>
          <div className={`${baseClassName}__name`} data-gb="name">
            {name}
          </div>
          <div className={`${baseClassName}__position`} data-gb="position">
            {position}
          </div>
          <RichText.Content
            tagName="div"
            className={`${baseClassName}__description`}
            data-gb="description"
            value={description}
          />
          {linkHref && (
            <a
              className={`${baseClassName}__link`}
              href={linkHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkText ? linkText : linkHref}
            </a>
          )}
        </div>
      </div>
    );
  },
});
