declare module "*.svg"

declare module "*.png" {
  const value: any
  export = value;
}

declare module "*.jpeg";

declare module "*.jpg";

declare module "*.gif";