declare module '*.module.scss' {
  const styles: { [key: string]: string };
  export default styles;
}

declare module "*.svg"

declare module "*.png" {
  const value: any
  export = value;
}

declare module "*.jpeg";

declare module "*.jpg";

declare module "*.gif";

declare const __IS_DEV__: boolean;