import React from "react";
import { registerBlockType } from "@wordpress/blocks";
import { RichText } from "@wordpress/block-editor";
import { TextControl, Button } from "@wordpress/components";
import "./editor.scss";

registerBlockType("theme/dl", {
  title: "見出し付きリスト",
  icon: "editor-alignleft",
  category: "layout",
  attributes: {
    list: {
      type: "array",
      default: [["", ""]],
    },
  },
  edit: (props) => {
    const {
      className,
      attributes: { list },
      setAttributes,
    } = props;
    const baseClassName = className.replace(/\s.+?$/, "");
    const add = () => {
      let newList = [...list];
      newList.push(["", ""]);
      console.log(newList);
      setAttributes({ list: newList });
    };
    const remove = (i) => {
      if (list.length === 1) {
        setAttributes({ list: [["", ""]] });
      } else {
        let newList = [...list];
        newList.splice(i, 1);
        setAttributes({ list: newList });
      }
    };
    const set = (v, i, ii) => {
      let newList = [...list];
      newList[i][ii] = v;
      setAttributes({ list: newList });
    };
    return (
      <div className={className}>
        {list.map((l, i) => {
          return (
            <dl className={`${baseClassName}__item`} key={i}>
              <dt className={`${baseClassName}__dt`}>
                <TextControl
                  value={list[i][0]}
                  onChange={(v) => set(v, i, 0)}
                  placeholder="見出し"
                />
              </dt>
              <dd className={`${baseClassName}__dd`}>
                <RichText
                  value={list[i][1]}
                  onChange={(v) => set(v, i, 1)}
                  placeholder="説明"
                />
              </dd>
              <dd className={`${baseClassName}__delete`}>
                <Button onClick={() => remove(i)} isDestructive>
                  削除
                </Button>
              </dd>
            </dl>
          );
        })}
        <Button onClick={() => add()} isPrimary>
          項目を追加
        </Button>
      </div>
    );
  },
  save: (props) => {
    const {
      className = "wp-block-theme-dl",
      attributes: { list },
    } = props;
    const baseClassName = className.replace(/\s.+?$/, "");
    return (
      <div className={className}>
        {list &&
          list.map((l, i) => {
            return (
              <dl className={`${baseClassName}__item`} key={i}>
                <dt className={`${baseClassName}__dt`}>{list[i][0]}</dt>
                <RichText.Content
                  tagName="dd"
                  className={`${baseClassName}__dd`}
                  value={list[i][1]}
                />
              </dl>
            );
          })}
      </div>
    );
  },
});
