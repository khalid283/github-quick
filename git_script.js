var elemDiv = document.createElement('div');
elemDiv.id = 'khaid-some';
elemDiv.style.cssText = 'position:absolute;width:100%;height:100%;opacity:0.3;z-index:100;background:#000;';


elemDiv.innerHTML = 
`<div class="icon-bar" style="position: fixed;
top: 50%;
right: 0%;
-webkit-transform: translateY(-50%);
-ms-transform: translateY(-50%);
transform: translateY(30%);"
>
<div 
style=" display: block;
    text-align: center;
    padding: 16px;
    transition: all 0.3s ease;
    color: white;
    font-size: 20px; background-color: aqua;" 
class="facebook"
id="kh_next"
>Next</i></div> 

<div style=" display: block;
    text-align: center;
    padding: 16px;
    transition: all 0.3s ease;
    color: white;
    font-size: 20px; background-color: aqua;"
class="twitter"
id="kh_prev"
>Prev</i></div> 
</div>`;

document.body.appendChild(elemDiv);


var allgid = document.querySelectorAll("[data-gid]");
var currentComment = 0;
var allgidArray = Object.keys(allgid).map(function (key) { 
    return allgid[key]; 
});

var newArr = []
var reactArr = []

allgidArray.map((dataGid, key) => {
    //item close check
    var check_item_close = document.querySelectorAll(`[data-gid='${dataGid.dataset.gid}']`)[0].childNodes[1].childNodes[3];
    var check_ref = document.querySelectorAll(`[data-gid='${dataGid.dataset.gid}']`)[0].childNodes[1].className;

    if(check_item_close && check_ref != 'discussion-item' && check_ref != 'discussion-item discussion-commits' ){
        var check_react = document.querySelectorAll(`[data-gid='${dataGid.dataset.gid}']`)[0].childNodes[1].childNodes[3].childNodes[3].childNodes[3].childNodes[3].childNodes[3];
        if(check_react){
            var dataObj = { data: []  }
            var btn_lenght = document.querySelectorAll(`[data-gid='${dataGid.dataset.gid}']`)[0].childNodes[1].childNodes[3].childNodes[3].childNodes[3].childNodes[3].childNodes[3].childNodes[6].childNodes.length;
            for(i = 1; i <= btn_lenght; i++){
                var check_extra_loop = document.querySelectorAll(`[data-gid='${dataGid.dataset.gid}']`)[0].
                childNodes[1].childNodes[3].childNodes[3].childNodes[3]
                .childNodes[3].childNodes[3].childNodes[6].childNodes[i];
                if(check_extra_loop){
                    var alias = document.querySelectorAll(`[data-gid='${dataGid.dataset.gid}']`)[0].
                    childNodes[1].childNodes[3].childNodes[3].childNodes[3]
                    .childNodes[3].childNodes[3].childNodes[6].childNodes[i]
                    .childNodes[1].getAttribute("alias");
                    
                    var react_data = document.querySelectorAll(`[data-gid='${dataGid.dataset.gid}']`)[0]
                    .childNodes[1].childNodes[3].childNodes[3].childNodes[3].childNodes[3]
                    .childNodes[3].childNodes[6].childNodes[i].childNodes[2].nodeValue.trim();
                    dataObj.key = dataGid.dataset.gid;
                    dataObj.data.push({count: react_data, alias: alias})
                }
               
                i++;
            }
            dataObj.count = sortingCount(dataObj.data);
            //var alias = document.querySelectorAll(`[data-gid='${dataGid.dataset.gid}']`)[0].childNodes[1].childNodes[3].childNodes[3].childNodes[3].childNodes[3].childNodes[3].childNodes[6].childNodes[1].childNodes[1].getAttribute("alias");
            reactArr.push(dataObj);
        }
    }
})


function sortingCount(data){
    var count = 0
    data.map((dataC, key) => {
        if(dataC.alias === '-1'){
            count = count - Number(dataC.count);
        }else{
            count = count + Number(dataC.count)
        }
    })
    return count;
}


reactArr.sort(function(a,b) {return (a.count < b.count) ? 1 : ((b.count < a.count) ? -1 : 0);} );
console.log('all', reactArr);

function goNext(){
    if(currentComment < reactArr.length){
        document.querySelectorAll(`[data-gid='${reactArr[currentComment].key}']`)[0].scrollIntoView();
        currentComment = currentComment != reactArr.length - 1 ? Number(currentComment + 1) : reactArr.length - 1;
    }
}

function goPrev(){
    if(currentComment > 0){
        document.querySelectorAll(`[data-gid='${reactArr[currentComment].key}']`)[0].scrollIntoView();
        currentComment = currentComment != 0 ? Number(currentComment - 1) : 0;
    } 
}

document.getElementById("kh_next").addEventListener("click", goNext);
document.getElementById("kh_prev").addEventListener("click", goPrev);