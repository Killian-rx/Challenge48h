import { useRef, useEffect } from 'react';

export default function HtmlComment({ text }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const comment = document.createComment(` ${text} `);
      ref.current.parentNode.insertBefore(comment, ref.current);
      return () => comment.remove();
    }
  }, [text]);

  return <span ref={ref} style={{ display: 'none' }} />;
}
