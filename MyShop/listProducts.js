const faker = require("faker")

for(let i=0;i<10;i++){
    let randomProduct = faker.commerce.productName()
    let randomPice = faker.commerce.price()
    console.log(`${randomProduct}--${randomPice}`)
}