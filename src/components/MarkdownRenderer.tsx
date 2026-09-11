"use client";

import React, { useMemo } from "react";
import { marked } from "marked";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const htmlContent = useMemo(() => {
    if (!content) return "";

    try {
      marked.setOptions({
        gfm: true,
        breaks: true,
      });

      let parsed = marked.parse(content) as string;

      // Wrap tables in responsive wrapper so they never overflow containers
      parsed = parsed.replace(/<table/g, '<div class="table-responsive-wrapper"><table');
      parsed = parsed.replace(/<\/table>/g, '</table></div>');

      // Ensure links open in new tab securely
      parsed = parsed.replace(/<a (?!.*target=)/g, '<a target="_blank" rel="noopener noreferrer" ');

      return parsed;
    } catch (err) {
      console.error("Error parsing markdown:", err);
      return content;
    }
  }, [content]);

  return (
    <div
      className={`safi-markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
