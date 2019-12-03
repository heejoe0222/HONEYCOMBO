document.querySelector('.showWrap').addEventListener('click', async function (e) {
    var data = {};
    var title = document.querySelector('rcp_title').value;
    var tagcontentsAll = document.querySelectorAll('#rcp_product'); //#xxx#xxx;
    var tagcontents = '';
    for(var i=0;i<tagcontentsAll.length;i++){
        tagcontents += '#'+tagcontentsAll[i].value;
    }
    var difficulty = ''; //mid/low/high 중 하나
    var totaltime = document.querySelector('#rcp_time').value;
    var videoUrl = '';
    var content1 = '';
    var content2 = '';
    var content3 = '';
    var content4 = '';
    var content5 = '';

    data.title = title;
    data.tagcontents = tagcontents;
    
});