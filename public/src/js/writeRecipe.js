import honeycomboAPI from "../apis/honeycomboAPI.js";

var adds = document.querySelectorAll('#add');

[].forEach.call(adds, function(add){
    add.addEventListener("click", addClick, false);
});
function addClick(e) {
    let itemId = "item" + e.srcElement.name;
    let itemInfos = document.querySelectorAll("#" + itemId);
    let title = itemInfos[1].textContent;
    let imgUrl = itemInfos[2].src;

    let currentItemHTML = document.querySelector("#myItemList").innerHTML;
    document.querySelector("#myItemList").innerHTML = currentItemHTML +
        '<div class="card text-align align-self-center mx-2 my-2">\
            <div class="card-body text-center">\
                <input type="button" name='+itemId+' class="row justify-content-start" style=" background: url(../images/static/delete-button.png) no-repeat; background-size: 78% 78%;" id="delete" onclick="delClick(name)" >\
                <h6 class="card-title mb-1 mx-auto" id="rcp_product">' + title + '</h6>\
                <img class="rounded mx-auto d-block" width=110 height=110 src=' + imgUrl + '>\
            </div>\
        </div>';
}

document.querySelector('#write_submit').addEventListener('click', async function (e) {

    var data = {};
    data.title = document.querySelector('#rcp_title').value;
    var tagcontentsAll = document.querySelectorAll('#rcp_product'); //#xxx#xxx;
    data.tagcontents = '';
    for(var i=0;i<tagcontentsAll.length;i++){
        data.tagcontents += '#'+tagcontentsAll[i].textContent;
    }

    try{
        data.difficulty = document.querySelector(".diff.active").id;
        data.imgUrl = document.querySelector('#preview').src;
        data.totaltime = document.querySelector('#rcp_time').value;
        data.videoUrl = document.querySelector('#youtube_url').value;
        data.content1 = document.querySelector('#step1').value;
        data.content2 = document.querySelector('#step2').value;
        data.content3 = document.querySelector('#step3').value;
        data.content4 = document.querySelector('#step4').value;
        data.content5 = document.querySelector('#step5').value;

        if(data.totaltime=="" || data.videoUrl=="" || data.content1=="" || data.title==""){
            alert("빈칸을 채워주세요!")
        }else{
            console.log(data);
            await honeycomboAPI.postUserRecipe(data);
        }
    }catch(e){
        alert("빈칸을 채워주세요!");
    }
});