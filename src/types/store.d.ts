import "react-redux";
import { RootState } from "./../redux/index";

declare module "react-redux" {
  export interface DefaultRootState extends RootState {}
}
