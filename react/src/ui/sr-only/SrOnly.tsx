import { PropsWithChildren } from "react";

type SrOnlyProps = PropsWithChildren<{
  content?: string | JSX.Element;
}>;

const SrOnly: React.FC<SrOnlyProps> = (props) => {
  return <span className="hide-visually">{props.content || props.children}</span>;
};

export { SrOnly };
