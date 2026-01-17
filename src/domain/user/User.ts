import type { Provider } from "../provider/Provider.ts";

export interface User {
  id: string;
  firstName: string;
  providers?: Provider[];
}
