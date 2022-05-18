// Получение всех книг
async function GetProduct() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/api/petShop", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    // если запрос прошел нормально

    if (response.ok === true) {
        // получаем данные
        const products = await response.json();
        let rows = document.querySelector("tbody");
        products.forEach(product => {
            // добавляем полученные элементы в таблицу
            rows.append(row(product));
        });
    }
}
// Получение одного отеля
async function GetProductById(id) {
    const response = await fetch("/api/petShop/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const product = await response.json();
        const form = document.forms["productForm"];
        form.elements["id"].value = product.id;
        form.elements["name"].value = product.name;
        form.elements["dateDelivery"].value = product.dateDelivery;
        form.elements["price"].value = product.price;
        form.elements["amount"].value = product.amount;
        form.elements["image"].value = product.image
    }
}

async function CreateProduct(name, dateDelivery, price, amount, image) {

    const response = await fetch("api/petShop", {
        method: "POST",
        headers: {
            "Accept": "application/json", "Content-Type":
                "application/json"
        },
        body: JSON.stringify({
            name,
            dateDelivery: new Date(dateDelivery),
            price: parseInt(price),
            amount: parseInt(amount),
            image
        })
    });

    if (response.ok === true) {
        const product = await response.json();
        reset();
        document.querySelector("tbody").append(row(product));
    }
}

async function EditProduct(id, name, dateDelivery, price, amount, image) {
    const response = await fetch("/api/petShop/" + id, {
        method: "PUT",
        headers: {
            "Accept": "application/json", "Content-Type":
                "application/json"
        },
        body: JSON.stringify({
            id: parseInt(id),
            name,
            dateDelivery: new Date(dateDelivery),
            price: parseInt(price),
            amount: parseInt(amount),
            image
        })
    });
    if (response.ok === true) {
        const product = await response.json();
        reset();
        document.querySelector("tr[data-rowid='" + product.id + "']").replaceWith(row(product));
    }
}
// Удаление пользователя
async function DeleteProduct(id) {
    const response = await fetch("/api/petShop/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok === true) {
        const product = await response.json();
        document.querySelector("tr[data-rowid='" + product.id + "']").remove();
    }
}
// сброс формы
function reset() {
    const form = document.forms["productForm"];
    form.reset();
    form.elements["id"].value = 0;
}
// создание строки для таблицы
function row(product) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", product.id);
    const idTd = document.createElement("td");
    idTd.append(product.id);
    tr.append(idTd);

    const nameTd = document.createElement("td");
    nameTd.append(product.name);
    tr.append(nameTd);

    const dateDeliveryTd = document.createElement("td");
    dateDeliveryTd.append(product.dateDelivery);
    tr.append(dateDeliveryTd);

    const priceTd = document.createElement("td");
    priceTd.append(product.price);
    tr.append(priceTd);

    const amountTd = document.createElement("td");
    amountTd.append(product.amount);
    tr.append(amountTd);

    const imageTd = document.createElement("td");
    const imageProduct = document.createElement("img");
    imageProduct.src = product.image;
    imageProduct.width = 120;
    imageTd.append(imageProduct);
    tr.append(imageTd);

    const linksTd = document.createElement("td");
    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", product.id);
    editLink.setAttribute("style", "cursor:pointer;padding:px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {
        e.preventDefault();
        GetProductById(product.id);
    });
    linksTd.append(editLink);

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", product.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {
        e.preventDefault();
        DeleteProduct(product.id);
    });
    linksTd.append(removeLink);
    tr.appendChild(linksTd);
    return tr;
}

function InitialFunction() {
    // сброс значений формы
    document.getElementById("reset").click(function (e) {
        e.preventDefault();
        reset();
    })
    // отправка формы
    document.forms["productForm"].addEventListener("submit", e => {
        e.preventDefault();
        const form = document.forms["productForm"];
        const id = form.elements["id"].value;
        const name = form.elements["name"].value;
        const dateDelivery = form.elements["dateDelivery"].value;
        const price = form.elements["price"].value;
        const amount = form.elements["amount"].value;
        const image = form.elements["image"].value;

        if (id == 0)
            CreateProduct(name, dateDelivery, price, amount, image);
        else
            EditProduct(id, name, dateDelivery, price, amount, image);
    });
    GetProduct();
}