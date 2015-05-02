import recipes from 'data/v0.11.22/recipes.json!json'
import _ from 'lodash'

class MainController {
  constructor() {
    this.searchText = null;
    this.selectedRecipes = null;
    this.recipes = _.map(recipes, function(r) {
      r.shortName = r.name;
      r.name = _.startCase(r.shortName);
      return r;
    })
  }
  querySearch() {
    var searchText = this.searchText;
    return _.filter(this.recipes, function(i) {
      return _.contains(i.name.toLowerCase(), searchText.toLowerCase());
    });
  }
}

export { MainController }
