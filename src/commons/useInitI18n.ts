import { useEffect, useState } from "react";

import i18n from "./i18n";

export default function useInitI18n() {
  const [ready, setReady] = useState(i18n.isInitialized);

  useEffect(() => {
    if (!i18n.isInitialized) {
      i18n.on("initialized", () => setReady(true));
    } else {
      setReady(true);
    }
  }, []);

  return ready;
}
