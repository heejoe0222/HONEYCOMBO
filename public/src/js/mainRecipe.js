import honeycomboAPI from "../apis/honeycomboAPI.js";

async function fn(recipeList, showResult, comment) {
    if (recipeList.result === 1) {
        // TODO : show result in default section
        for (var i = 0; i < recipeList.items.length; i++) {
            showResult.innerHTML = recipeList.items[i].TITLE;
        }
    } else {
        showResult.innerHTML = comment
    }
}

document.querySelector('.showWrap').addEventListener('click', async function (e) {
    let url, method, data;
    const target = e.target;
    const li = target.closest('LI');
    const showResult = document.querySelector(".defaultResult");
    const type = li.className;
    let result;

    if (target.tagName !== "BUTTON") return;

    switch (type) {
        case "recipePriceSearch":
            // all elements select in form tag by name - maxPrice, minPrice
            let inputs = [].slice.call(document.querySelector("form").elements);
            data = inputs.reduce(function (pre, next) {
                pre[next.name] = next.value;
                return pre;
            }, {});

            result = await honeycomboAPI.getRecipeSearch(data);
            await fn(result, showResult, "일치하는 레시피 없음");
            break;
    }
});