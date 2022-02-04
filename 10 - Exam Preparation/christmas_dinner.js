class ChristmasDinner {
  constructor(budget) {
    if (budget < 0) {
      throw new Error('The budget cannot be a negative number');
    }

    this.budget = budget;
    this.dishes = [];
    this.products = [];
    this.guests = {};
  }

  shopping(array) {
    const [product, price] = array;

    if (Number(price) > this.budget) {
      throw new Error('Not enough money to buy this product');
    }

    this.products.push(product);
    this.budget -= Number(price);
    return `You have successfully bought ${product}!`;
  }

  recipes(recipe) {
    if (recipe.productsList.some(product => !this.products.includes(product))) {
      throw new Error('We do not have this product');
    }

    this.dishes.push({
      recipeName: recipe.recipeName,
      productsList: recipe.productsList,
    });
    return `${recipe.recipeName} has been successfully cooked!`;
  }

  inviteGuests(name, dish) {
    if (!this.dishes.find(d => d.recipeName === dish)) {
      throw new Error('We do not have this dish');
    }

    if (this.guests[name]) {
      throw new Error('This guest has already been invited');
    }

    this.guests[name] = dish;
    return `You have successfully invited ${name}!`;
  }

  showAttendance() {
    return Object.entries(this.guests)
      .map(
        kvp =>
          `${kvp[0]} will eat ${kvp[1]}, which consists of ${this.dishes
            .find(dish => dish.recipeName === kvp[1])
            .productsList.join(', ')}`
      )
      .join('\n');
  }
}

const dinner = new ChristmasDinner(300);

dinner.shopping(['Salt', 1]);
dinner.shopping(['Beans', 3]);
dinner.shopping(['Cabbage', 4]);
dinner.shopping(['Rice', 2]);
dinner.shopping(['Savory', 1]);
dinner.shopping(['Peppers', 1]);
dinner.shopping(['Fruits', 40]);
dinner.shopping(['Honey', 10]);

dinner.recipes({
  recipeName: 'Oshav',
  productsList: ['Fruits', 'Honey'],
});
dinner.recipes({
  recipeName: 'Folded cabbage leaves filled with rice',
  productsList: ['Cabbage', 'Rice', 'Salt', 'Savory'],
});
dinner.recipes({
  recipeName: 'Peppers filled with beans',
  productsList: ['Beans', 'Peppers', 'Salt'],
});

dinner.inviteGuests('Ivan', 'Oshav');
dinner.inviteGuests('Petar', 'Folded cabbage leaves filled with rice');
dinner.inviteGuests('Georgi', 'Peppers filled with beans');

console.log(dinner.showAttendance());
