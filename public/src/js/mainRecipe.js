import honeycomboAPI from "../apis/honeycomboAPI.js";

async function fn(recipeList, showResult, comment) {
    console.log(recipeList)
    if (recipeList.items.length >0) {
        // TODO : show result in default section
        for (var i = 0; i < recipeList.items.length; i++) {
            var length = recipeList.items.length;
            var imgSrc = '/images/' + recipeList.items[i].IMGFILENAME;
            var tagStr = recipeList.items[i].TAGCONTENTS;
            var subItemList = tagStr.split('#');
            var tempTitle = recipeList.items[i].TITLE;
            var actionUrl = "/recipe/detailRecipe/viewDetail/" + tempTitle;


            showResult.innerHTML = 
            '<div class="existRecipe">총 <a>'+length+'</a>개의 레시피 </div>\
            <ul>\
                    <article class="recipe">\
                        <li class="seeDetail">\
                            <form action="'+actionUrl+'method="get">\
                                <input id="recipeimage" type="image" src="'+imgSrc+'" alt="Submit Form" />\
                            </form>\
                        </li>\
                        <li id="recipeUser">'+recipeList.items[i].USERID+'님의 레시피</li>\
                        <li id="recipeTitle">'+tempTitle+'</li>\
                        <li id="recipePrice">'+recipeList.items[i].TOTALPRICE+'원</li>\
                        <li id="recipeItem"><a>필요한 재료:</a>\
                            '+subItemList.join('|').slice(1,)+'\
                        </li>\
                    </article>\
            </ul>';
        }
    } else {
        showResult.innerHTML = comment;
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
            await fn(result, showResult, "일치하는 레시피가 없습니다.");
            break;
    }
});