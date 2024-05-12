import { makeAutoObservable } from 'mobx';

class Document {
  pageTitle = '';

  constructor() {
    makeAutoObservable(this);
  }

  setPageTitle(title) {
    this.pageTitle = title;
  }
}

export default new Document();
