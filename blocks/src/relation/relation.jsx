import { registerBlockType } from "@wordpress/blocks";
import { URLInput } from "@wordpress/block-editor";
import { ToggleControl, Button } from "@wordpress/components";
import Link from "../components/link.jsx";
import "./editor.scss";

registerBlockType("theme/relation", {
  title: "記事リンク",
  icon: "admin-site",
  category: "layout",

  attributes: {
    href: {
      type: "string",
      default: "",
    },
    data: {
      type: "object",
      default: null,
    },
    blank: {
      type: "boolean",
      default: false,
    },
    err: {
      type: "string",
      default: "",
    },
  },

  edit(props) {
    const {
      className,
      attributes: { href, data, blank, err },
      setAttributes,
    } = props;
    const baseClassName = className.replace(/\s.+?$/, "");
    const get = () => {
      if (
        href.match(
          /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#\u3000-\u30FE\u4E00-\u9FA0\uFF01-\uFFE3]+/g
        )
      ) {
        fetch("/wp-json/api/v1/relation/?url=" + encodeURIComponent(href), {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error();
            }
            return res.json();
          })
          .then((data) => {
            const json = JSON.parse(data);
            setAttributes({
              data: {
                description: json.description,
                image: json.image,
                title: json.title,
              },
              err: "",
            });
          })
          .catch((err) => {
            setAttributes({
              data: null,
              err: "エラー：URLが無効か、対象のHTMLデータが不完全な可能性があります",
            });
          });
      } else {
        setAttributes({
          data: null,
          err: "エラー：URLの形式に誤りがあります",
        });
      }
    };
    return (
      <div className={className}>
        <div className={`${baseClassName}__input`}>
          <URLInput
            onChange={(v) => setAttributes({ href: v })}
            value={href}
            className={`${baseClassName}__url`}
          />
          <ToggleControl
            label="新しいタブで開く"
            checked={blank}
            onChange={() => setAttributes({ blank: !blank })}
          />
          <Button onClick={() => get()} isPrimary>
            データを取得
          </Button>
        </div>
        {err && <div className={`${baseClassName}__error`}>{err}</div>}
        {!err &&
          data &&
          (() => {
            const { title, image, description } = data;
            return (
              <div className={`${baseClassName}__content`}>
                <div className={`${baseClassName}__thumb`}>
                  <picture className={`${baseClassName}__picture`}>
                    <img
                      src={image}
                      alt={title}
                      className={`${baseClassName}__image`}
                    />
                  </picture>
                </div>
                <div className={`${baseClassName}__data`}>
                  <div className={`${baseClassName}__title`}>{title}</div>
                  <div className={`${baseClassName}__description`}>
                    {description}
                  </div>
                </div>
              </div>
            );
          })()}
      </div>
    );
  },

  save(props) {
    const {
      className = "wp-block-theme-relation",
      attributes: { href, data, blank, err },
    } = props;
    const baseClassName = className.replace(/\s.+?$/, "");
    return (
      <>
        {!err &&
          data &&
          (() => {
            const { title, image, description } = data;
            return (
              <Link {...props.attributes} className={`${baseClassName}__link`}>
                <div className={`${baseClassName}__thumb`}>
                  <picture className={`${baseClassName}__picture`}>
                    <img
                      src={image}
                      alt={title}
                      className={`${baseClassName}__image`}
                    />
                  </picture>
                </div>
                <div className={`${baseClassName}__data`}>
                  <div className={`${baseClassName}__title`}>{title}</div>
                  <div className={`${baseClassName}__description`}>
                    {description}
                  </div>
                </div>
              </Link>
            );
          })()}
      </>
    );
  },
});
