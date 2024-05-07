const containerWrapper = document.querySelector('.container-wrapper');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const select = document.getElementById('tables');
const tables = document.querySelectorAll('.table:not(.reserved)');

getFromLocalStorage();
total();

containerWrapper.addEventListener('click', function (e) {
    if (e.target.classList.contains('table') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected');
        total()
    }
});

select.addEventListener('change', function(e){
    total();
})


function total(){
     let selectedTables = containerWrapper.querySelectorAll('.table.selected');

     const selectedTableArr = [];
     const tableArr = [];

     selectedTables.forEach(function(table){  
        selectedTableArr.push(table);
     })

     tables.forEach(function(table){ 
        tableArr.push(table);
     })


     let selectedTableIndexs = selectedTableArr.map(function(table){
        return tableArr.indexOf(table);
     })
    

     let selectedTableCount = selectedTables.length;
     let price = select.value ;
        count.innerText = selectedTableCount;
        amount.innerText = selectedTableCount * price;

    saveToLocalStorage(selectedTableIndexs)
        
}
function getFromLocalStorage(){
    const selectedTables = JSON.parse(localStorage.getItem('selectedTables'));
    if(selectedTables != null && selectedTables.length > 0){
        tables.forEach(function(table, index){
            if(selectedTables.indexOf(index) > -1 ){
               table.classList.add('selected'); 
            }
        });
    }

    const selectedTableIndex = localStorage.getItem('selectedTableIndex');
    if(selectedTableIndex != null){
        select.selectedIndex = selectedTableIndex;
    }
}

function saveToLocalStorage(indexs){
    localStorage.setItem('selectedTables', JSON.stringify(indexs));
    localStorage.setItem('selectedTableIndex', select.selectedIndex);
}
