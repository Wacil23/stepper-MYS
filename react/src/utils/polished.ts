/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
type Styles = {
  [ruleOrSelector: string]: string | number | Styles;
};

function endsWith(string: string, suffix: string): boolean {
  return string.endsWith(suffix);
}

class PolishedError extends Error {
  constructor(code: string | number, ..._args: any[]) {
    super(
      `An error occurred. See https://github.com/styled-components/polished/blob/main/src/internalHelpers/error.md#${code} for more info.`,
    );
    this.name = "PolishedError";
  }
}

const cssRegex = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;

export default function stripUnit(value: string | number): string | number {
  if (typeof value !== "string") return value;
  const matchedValue = value.match(cssRegex);
  return matchedValue ? parseFloat(matchedValue[1]) : value;
}

const pixelsto =
  (to: string) =>
  (pxval: string | number, base: string | number = "16px"): string => {
    let newPxval = pxval;
    let newBase = base;
    if (typeof pxval === "string") {
      if (!endsWith(pxval, "px")) {
        throw new PolishedError(69, to, pxval);
      }
      newPxval = stripUnit(pxval);
    }

    if (typeof base === "string") {
      if (!endsWith(base, "px")) {
        throw new PolishedError(70, to, base);
      }
      newBase = stripUnit(base);
    }

    if (typeof newPxval === "string") {
      throw new PolishedError(71, pxval, to);
    }

    if (typeof newBase === "string") {
      throw new PolishedError(72, base, to);
    }

    return `${newPxval / newBase}${to}`;
  };

export const rem: (value: string | number, base?: string | number) => string =
  pixelsto("rem");

export function hideVisually(): Styles {
  return {
    border: "0",
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    whiteSpace: "nowrap",
    width: "1px",
  };
}
