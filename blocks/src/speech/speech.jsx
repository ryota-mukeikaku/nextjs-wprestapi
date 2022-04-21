import React from "react";
import { registerBlockType } from "@wordpress/blocks";
import {
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
  RichText,
} from "@wordpress/block-editor";
import { TextControl, Button } from "@wordpress/components";
import "./editor.scss";

registerBlockType("theme/speech", {
  title: "会話",
  icon: "format-chat",
  category: "layout",
  styles: [
    {
      name: "default",
      label: "左アイコン",
      isDefault: true,
    },
    {
      name: "reverse",
      label: "右アイコン",
      isDefault: false,
    },
  ],
  attributes: {
    name: {
      type: "string",
      default: "",
      source: "text",
      selector: '[data-gb="name"]',
    },
    text: {
      type: "string",
      default: "",
      source: "html",
      selector: '[data-gb="text"]',
    },
    image: {
      type: "object",
      default: null,
    },
  },
  edit: (props) => {
    const blockProps = useBlockProps;
    const {
      className,
      attributes: { name, text, image },
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
          <TextControl
            className={`${baseClassName}_name`}
            value={name}
            onChange={(v) => setAttributes({ name: v })}
            placeholder="名前"
          />
        </div>
        <RichText
          className={`${baseClassName}__text`}
          value={text}
          onChange={(v) => setAttributes({ text: v })}
          placeholder="テキスト"
        />
      </div>
    );
  },
  save: (props) => {
    const {
      className = "wp-block-theme-speech",
      attributes: { name, text, image },
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
          <div className={`${baseClassName}__name`} data-gb="name">
            {name}
          </div>
        </div>
        <RichText.Content
          tagName="div"
          className={`${baseClassName}__text`}
          data-gb="text"
          value={text}
        />
      </div>
    );
  },
});
