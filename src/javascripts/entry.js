import "./pugImport";
import "../css/index.scss";

import "./init-alpine";
import "./init-lazy";
import "./lazy-load-image";
import "./affluent"
import "./optimisation";
import "./optimisation/tooltip-delay-destroy";
import "./optimisation/tooltip-popover";
import "./revamp";

Alpine.start()

if (module.hot) {
  module.hot.accept(console.error);
  module.hot.dispose(() => {
    window.location.reload();
  });
}
