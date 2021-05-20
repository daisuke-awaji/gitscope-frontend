import JavaScript from "./javascript.png";
import { ReactComponent as TypeScriptSvg } from "./typescript.svg";

export const JavaScriptIcon = (props: any) => {
  return <img alt="js-icon" src={JavaScript} {...props} />;
};

export const TypeScriptIcon = (props: any) => {
  return (
    <div {...props}>
      <TypeScriptSvg width="100%" height="100%" />
    </div>
  );
};
