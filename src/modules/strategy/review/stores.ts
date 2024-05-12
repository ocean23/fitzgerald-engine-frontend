import { makeAutoObservable } from 'mobx';

class SearchValue {
  searchValue = {};

  constructor() {
    makeAutoObservable(this);
  }

  setSearchValue(value) {
    this.searchValue = value;
  }
}

export default new SearchValue();
