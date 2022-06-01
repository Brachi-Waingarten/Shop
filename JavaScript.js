
class Product {
    static numOfProducts = 0
    constructor(productName, category, price, unitsInStock) {
        this.productName = productName
        this.category = category
        this.price = price
        this.unitsInStock = unitsInStock
        this.id = ++Product.numOfProducts
    }

    setPrice(newPrice) {
        this.price = newPrice;
    }

    addProductToQty(num) {
        num = -num
        this.unitsInStock = this.unitsInStock - num
    }

    subProductToQty(num) {
        num = num;
        this.unitsInStock = this.unitsInStock - num;
        if (this.unitsInStock < 0)
            this.unitsInStock = 0;
    }
}

class Store {
    arrProducts = [new Product("pizza", "FOOD", 15, 250), new Product("ball", "TOYS", 15, 250)]
    static start = 0;

    constructor() {
        this.showAllCodes();
    }

    show(txt, div, fontSize = "h3") {
        var property = document.createElement(fontSize);
        div.appendChild(property);
        var txt = document.createTextNode(txt);
        property.appendChild(txt);
    }

    ShowAllProducts(array) {
        var container = document.createElement("div");

        const arr = array.map(product => {
            var productDiv = document.createElement("div");
            productDiv.classList.add("div")
            this.show(product.productName, productDiv, "h1");
            this.show("code:" + product.id, productDiv);
            this.show("category: " + product.category, productDiv);
            this.show("price: " + product.price, productDiv);
            this.show("units in stock: " + product.unitsInStock, productDiv);
            return productDiv;
        })

        container.append(...arr);
        return container;
    }

    addProduct(name, category, price, unitsInStock) {
        let product = new Product(name, category, price, unitsInStock)
        console.log(product)
        this.arrProducts.push(product)
        document.getElementById('store').innerHTML = ""
        // document.getElementById('changes').innerHTML = ""
        this.ShowAllProducts(this.arrProducts)
        console.log(this.arrProducts)
        document.getElementById('store').append(this.ShowAllProducts(this.arrProducts))
        // document.getElementById('changes').append(this.showAllCodes())
    }

    findProductByName() {
        let name = document.getElementById("selectName").value;
        let product = this.arrProducts.find(p => p.productName === name)
        if (product !== undefined) {
            let temp = []
            temp.push(product)
            console.log(product)
            document.getElementById('store').innerHTML = ""
            document.getElementById('store').append(this.ShowAllProducts(temp))
        }
        else alert("No suitable products were found for filtration")
    }

    findByRangePrice() {

        let num1 = document.getElementById("rangeA").value;
        let num2 = document.getElementById("rangeB").value;

        let result = []
        result = this.arrProducts.filter(p => p.price >= num1 && p.price <= num2)
        if (result .length!==0) {
            console.log(result)
            document.getElementById('store').innerHTML = ""
            document.getElementById('store').append(this.ShowAllProducts(result))
        }
        else alert("No suitable products were found for filtration")
    }


    findByCategory() {
        let categoryName = document.getElementById("selectCategory").value;
        let categorys = []
        console.log(categoryName)
        categorys = this.arrProducts.filter(p => p.category === categoryName)
        if (categorys.length !== 0) {
            document.getElementById('store').innerHTML = ""
            document.getElementById('store').append(this.ShowAllProducts(categorys))
            console.log(categorys)
        }
        else alert("No suitable products were found for filtration")
    }

    findByOutOfStock(num = 50) {
        let resultArr = []
        resultArr = this.arrProducts.filter(p => p.unitsInStock < num)
        if (resultArr.length !== 0) {
            document.getElementById('store').innerHTML = ""
            document.getElementById('store').append(this.ShowAllProducts(resultArr))
            console.log(resultArr)
        }
        else alert("No suitable products were found for filtration")
    }

    showAllCodes() {
        for (var i = 0; i < this.arrProducts.length; i++) {
            var para = document.createElement("option");
            var para1 = document.createElement("option");
            var para2 = document.createElement("option");

            para.innerHTML = this.arrProducts[i].id;
            para1.innerHTML = this.arrProducts[i].id;
            para2.innerHTML = this.arrProducts[i].id;

            para.value = this.arrProducts[i].id;
            para1.value = this.arrProducts[i].id;
            para2.value = this.arrProducts[i].id;

            document.getElementById('addQtyInStock').appendChild(para);

            document.getElementById('lower').appendChild(para1);
            document.getElementById('changePrice').appendChild(para2);

        }
    }

    whichIdAdd() {
        for (var i = 0; i < this.arrProducts.length; i++) {
            if (this.arrProducts[i].id == document.getElementById("addQtyInStock").value) {
                this.arrProducts[i].addProductToQty(document.getElementById("addChange").value);
                break;
            }
        }
        document.getElementById('store').innerHTML = ""
        document.getElementById('store').append(this.ShowAllProducts(this.arrProducts))
    }

    whichIdSub() {
        for (var i = 0; i < this.arrProducts.length; i++) {
            if (this.arrProducts[i].id == document.getElementById("lower").value) {
                this.arrProducts[i].subProductToQty(document.getElementById("subChange").value);
                break;
            }
        }
        document.getElementById('store').innerHTML = ""
        document.getElementById('store').append(this.ShowAllProducts(this.arrProducts))
    }

    whichIdChangePrice() {
        for (var i = 0; i < this.arrProducts.length; i++) {
            if (this.arrProducts[i].id == document.getElementById("changePrice").value) {
                this.arrProducts[i].setPrice(document.getElementById("changeProductPrice").value);
                break;
            }
        }
        document.getElementById('store').innerHTML = ""
        document.getElementById('store').append(this.ShowAllProducts(this.arrProducts))
    }

    editProduct() {
        if (document.getElementById("edit").value === "Editing products") {
            document.getElementById("changes").style.display = "block";
            document.getElementById("edit").value = "Close"
        }
        else {
            document.getElementById("changes").style.display = "none";
            document.getElementById("edit").value = "Editing products"
        }

    }

    addProductButton() {
        if (document.getElementById("addButton").value === "Add Product") {
            document.getElementById("form").style.display = "block";
            document.getElementById("addButton").value = "Close"
        }
        else {
            document.getElementById("form").style.display = "none";
            document.getElementById("addButton").value = "Add Product"
        }

    }

    filterProduct() {
        if (document.getElementById("filterProducts").value === "Filters") {
            document.getElementById("filters").style.display = "block";
            document.getElementById("filterProducts").value = "Close"
        }
        else {
            document.getElementById("filters").style.display = "none";
            document.getElementById("filterProducts").value = "Filters"
        }

    }
}

function startStore() {
    if (Store.start === 0) {
        window.shop = new Store();

        document.getElementById('store').append(shop.ShowAllProducts(shop.arrProducts));
        shop.start++;
    }
}
onload = () => startStore(); 
