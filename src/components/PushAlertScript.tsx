"use client";

import { useEffect } from "react";

export default function PushAlertScript() {
  useEffect(() => {
    (function(d: Document, t: string) {
      const g = d.createElement(t) as HTMLScriptElement;
      const s = d.getElementsByTagName(t)[0];
      g.src = "https://cdn.pushalert.co/integrate_ce9a2faca88ee8de366995bea92439dd.js";
      if (s && s.parentNode) {
        s.parentNode.insertBefore(g, s);
      }
    })(document, "script");
  }, []);

  return null;
}