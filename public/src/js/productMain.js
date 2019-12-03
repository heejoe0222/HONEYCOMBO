import honeycomboAPI from "../apis/honeycomboAPI.js";

async function fn(showResult, productList, result) {
    if (productList.result === 1) {
        console.log(productList.items)
        // TODO : show result in default section
        var article = '';
        for (var i = 0; i < productList.items.length; i++) {
            var imgSrc = '/images/' + productList.items[i].IMGFILENAME;
            article += '<article id="item"><img src='+imgSrc+'><li id="itemCompany">'+productList.items[i].COMPANY+'</li><li id="itemName">'+productList.items[i].ITEMNAME+'</li><li id="itemPrice">'+productList.items[i].ITEMPRICE +'원</li><br></article>';
        }
        showResult.innerHTML = '<ul>'+article+'</ul>';
    } else {
        showResult.innerHTML = '<article id="item">해당 상품이 없습니다.</article>';
    }
}

document.querySelector('.showWrap').addEventListener('click', async function (e) {
    let url, method;
    const target = e.target;
    const li = target.closest('LI');
    const showResult = document.querySelector(".defaultResult");
    const type = li.className;
    let productList = undefined;

    if (target.tagName !== "BUTTON") return;

    switch (type) {
        case "productSearch":
            url = "/product/main/search/" + li.getElementsByTagName("input")[0].value;
            productList = await honeycomboAPI.getProduct(url);
            console.log(productList);
            await fn(showResult, productList, "일치하는 상품 이름 없음");
            break;

        case "companySort":
            var companyName = target.name
            url = "/product/main/classify/" + companyName
            productList = await honeycomboAPI.getProduct(url);
            await fn(showResult, productList, "회사별 상품 결과 없음");
            break;
    }
})