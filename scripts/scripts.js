const shopping_cart = document.getElementById("shopping-cart");
const template = document.getElementById("template");
const price = document.getElementById("price");
const fragment = document.createDocumentFragment();
const botones = document.querySelectorAll(".card .btn");

let shopping_cart_list = [];

// See all the products from shopping_cart_list to messages
const show_shopping_cart = (shopping_cartArray) => {
    shopping_cart.textContent = "";
    let total_products = 0

    shopping_cartArray.forEach(item => {
        const clone = template.content.firstElementChild.cloneNode(true);
        const clone_price = price.content.firstElementChild.cloneNode(true);

        clone.querySelector(".lead").textContent = item.title;
        clone.querySelector(".badge").textContent = item.stock;

        clone_price.querySelector("#total-price").textContent = item.price;
        const add = clone_price.querySelector(".btn-success");
        add.dataset.fruit = item.title;
        add.dataset.price = (item.price / item.stock);
        add.addEventListener("click", add_to_shopping_cart, false);

        const remove = clone_price.querySelector(".btn-danger");
        remove.dataset.fruit = item.title;
        remove.addEventListener("click", removeProduct, false);

        fragment.appendChild(clone);
        fragment.appendChild(clone_price);

        total_products += parseInt(item.price);
    });

    // CREATE BUTTON BUY ALL ###############################################
    if (total_products > 0){
        const li = document.createElement("li");
        li.classList.add("mt-5", "rounded-top");
        li.classList.add("list-group-item", "d-flex", "align-items-center",
                        "text-center", "justify-content-between", "text-secondary", "border-top");
        const price_total = document.createElement("p")
        price_total.textContent = `$${total_products}`;
        price_total.classList.add("fs-3", "mb-0")
        li.appendChild(price_total);

        const button_buy_all = document.createElement("button");
        button_buy_all.classList.add("btn","btn-outline-primary");
        button_buy_all.textContent = "Buy all";
        button_buy_all.addEventListener("click", buy_all, false)
        li.appendChild(button_buy_all);

        fragment.appendChild(li);
    }
    // #####################################################################

    shopping_cart.appendChild(fragment)
}

// Add a product to shopping_cart_list
const add_to_shopping_cart = (e) => {
    const product = {
        title: e.target.dataset.fruit,
        id: e.target.dataset.fruit,
        price: parseInt(e.target.dataset.price),
        stock: 1
    };

    const index = shopping_cart_list.findIndex((item) => item.id === product.id);
    if (index > -1){
        const product_list = shopping_cart_list[index];
        product_list.stock ++;
        product_list.price += product.price;
    } else {
        shopping_cart_list.push(product);
    }

    show_shopping_cart(shopping_cart_list);
};

// Remove a product in shopping_cart_list
const removeProduct = (e) => {
    const fruit = e.target.dataset.fruit;

    const index = shopping_cart_list.findIndex((item) => item.title === fruit);

    if (index > -1){
        product = shopping_cart_list[index];
        if (product.stock == 1){
            shopping_cart_list.splice(index,1)
        }
        product.price = (product.price / product.stock);
        product.stock --;
        product.price *= product.stock;
    }

    show_shopping_cart(shopping_cart_list);
}

// message for buy_all products
const buy_all = (e) => {
    let price = 0;
    let products = ""
    Object.values(shopping_cart_list).forEach((product) => {
        price += product.price
        products += product.title + ` ${product.stock}: ` + `$${product.price}\n`
    })

    option = confirm(`you're going to buy these products:
${products}
Total: $${price}
    `);

    if (option) {
        alert(`Thanks for your purchase!
Total: $${price}`);
        
        shopping_cart.textContent = "";
        shopping_cart_list = [];
    }
};

botones.forEach(btn => {
    btn.addEventListener("click", add_to_shopping_cart, false);
});