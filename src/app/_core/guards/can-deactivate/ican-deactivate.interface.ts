/**
 * It must be implemented by every component whose data
 * can be lost if the user leaves the page without saving.
 */

export interface ICanDeactivate {
  canDeactivate(): boolean;
}
