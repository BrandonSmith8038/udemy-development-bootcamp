const movies = [
  {
    name: 'Walk The Line',
    rating: 9.2,
    haveSeen: true
  },
  {
    name: 'Dale',
    rating: 8.7,
    haveSeen: false
  },
  {
    name: 'Deadpool',
    rating: 4.7,
    haveSeen: true
  },
  {
    name: 'Titanic',
    rating: 7.8,
    haveSeen: false
  }
];

const printMovies = arr => {
  arr.forEach(el => {
    if (el.haveSeen) {
      console.log(`You have seen "${el.name}" - ${el.rating} stars`);
    } else {
      console.log(`You have not seen "${el.name}" - ${el.rating} stars`);
    }
  });
};

printMovies(movies);
