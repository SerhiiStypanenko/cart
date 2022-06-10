module.exports = function Favourite(favourite) {
    this.items = favourite.items || {};
    this.isFavourite = favourite.isFavourite || false;

    this.add = function(item, id) {
        var favouriteItem = this.items[id];
        if (!favouriteItem) {
            favouriteItem = this.items[id] = {item: item};
        }
        favouriteItem.price = favouriteItem.item.price;
    };

    this.remove = function(id) {
        this.favourite = false;
        delete this.items[id];
    };
    
    this.getItems = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };

};