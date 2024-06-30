import { Doc, Store, shapeInstantiator } from "@dgmjs/core";
import wireframeJson from "@/assets/wireframe.json";

export class LibraryManager {
  docs: Doc[] = [];

  constructor() {
    this.docs = [];
    this.load(wireframeJson);
  }

  load(json: any) {
    const store = new Store(shapeInstantiator);
    store.fromJSON(json);
    this.docs.push(store.root as Doc);
  }
}

export const libraryManager = new LibraryManager();
