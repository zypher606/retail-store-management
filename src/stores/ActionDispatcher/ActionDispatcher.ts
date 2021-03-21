import { dispatch } from "../index";
import { AnyAction } from "redux";

export class ActionDispatcher {
  private static instance: ActionDispatcher;

  public static getInstance(): ActionDispatcher {
    if (!ActionDispatcher.instance) {
      ActionDispatcher.instance = new ActionDispatcher();
    }
    return ActionDispatcher.instance;
  }

  dispatch(action: AnyAction): void {
    dispatch(action);
  }
}
