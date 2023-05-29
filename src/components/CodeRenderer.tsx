import React, { memo, useEffect, useMemo } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/themes/prism-tomorrow.min.css";

type Props = {
  code: string;
};

const CodeRenderer = ({ code }: Props) => {
  const [lang, ...body] = code.split("\n\n");

  const language = lang.slice(1).toLowerCase().replace(/-/g, "_");
  const _body = body.join("\n");

  useEffect(() => {
    async function highlight() {
      if (typeof window !== "undefined" || !language) {
        await import(`prismjs/components/prism-${language}`);
        Prism.highlightAll();
      }
    }
    highlight();
  }, [language, code]);

  return (
    <pre className="rounded-default">
      <code className={`language-${language}`}>{_body}</code>
    </pre>
  );
};

export default memo(CodeRenderer);
