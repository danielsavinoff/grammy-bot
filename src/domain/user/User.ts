import type { Provider } from "../provider/Provider";

export interface User {
  id: string;
  firstName: string;
  providers?: Provider[];
}
