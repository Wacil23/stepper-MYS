import { AriaAttributes, AriaRole } from "react";

export interface BaseComponentModel {
  id?: string;
  className?: string;
  role?: AriaRole;
  "aria-label"?: AriaAttributes["aria-label"];
  "aria-hidden"?: AriaAttributes["aria-hidden"];
}
