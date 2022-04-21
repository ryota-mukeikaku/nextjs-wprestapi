import React from "react";
import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";
import "./editor.scss";

registerBlockType("theme/columns", {
  title: "2カラム",
  icon: "columns",
  category: "layout",
  attributes: {},
  edit: (props) => {
    const blockProps = useBlockProps;
    const { className } = props;
    const baseClassName = className.replace(/\s.+?$/, "");
    const TEMPLATE = [
      [
        "core/column",
        {
          className: `${baseClassName}__inner`,
          allowedBlocks: ["core/image", "core/paragraph"],
        },
      ],
      [
        "core/column",
        {
          className: `${baseClassName}__inner`,
          allowedBlocks: ["core/image", "core/paragraph"],
        },
      ],
    ];
    return (
      <div className={className} {...blockProps}>
        <InnerBlocks
          template={TEMPLATE}
          templateLock="all"
          orientation="horizontal"
        />
      </div>
    );
  },
  save: (props) => {
    const { className = "wp-block-theme-columns" } = props;
    const baseClassName = className.replace(/\s.+?$/, "");
    const blockProps = useBlockProps.save();
    return (
      <div className={className} {...blockProps}>
        <InnerBlocks.Content />
      </div>
    );
  },
});
