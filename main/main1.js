'use strict';

function printReceipt(inputs) {
   
  let orderArray=getAllOrder(inputs);
  let receipt=createReceipt(orderArray);
  console.log(receipt);
}

function countNumOfItem(inputs){
   
    return Object.entries(inputs.reduce((m, item) => {
        let barcode = item, count = 1
        if (item.includes('-')) {
          [barcode, count] = item.split('-')
          count = Number(count)
        }
        m[barcode] ? m[barcode].count += count : m[barcode] = {barcode, count}
        return m
      }, {})).map(item => item[1])
}

function getAllOrder(inputs){
    let orderArray=new Array();
    let barcodeArray=countNumOfItem(inputs);
    let allItems=loadAllItems(); 
    let promotion=loadPromotions()[0].barcodes;
    barcodeArray.map(e=>{
        let itemId=e.barcode;
        let count=e.count;
        let isPromotionItem1=isPromotionItem(itemId,promotion);
          //统计优惠个数
       let promotionCount=parseInt(count/3);
       let item=null;
       item=allItems.filter(e=>e.barcode==itemId)[0];
       var order=new Object();
       order.item=item;
       order.number=count;
       order.promotionCount=promotionCount;
       order.promotionMoney=(item.price* promotionCount).toFixed(2);
       order.totalMOney=(item.price*(Number.parseFloat(count)-promotionCount)).toFixed(2);
       orderArray.push(order);
       
    }); 
   return orderArray; 
}


function isPromotionItem(barcode,promotion){
    let isPromotionItemFlag=false;
    let length=promotion.filter(e=>e===barcode).length;
    if(length>0){
    isPromotionItemFlag=true;  
   }  
    return isPromotionItemFlag;
}
function createReceipt(orderArray){
let receipt=`***<没钱赚商店>收据***\n`;

// let name="名称";
// let num="数量";
// let price="单价";
// let count="小计";
// let util="(元)";
// let style="：";
// let style1="，";

var totalMOney=0;
var totalPromotionMoney=0;
for(let i=0;i<orderArray.length;i++){
  totalMOney+=Number.parseFloat(orderArray[i].totalMOney);
  totalPromotionMoney+=Number.parseFloat(orderArray[i].promotionMoney);
   receipt+=`名称：${orderArray[i].item.name}，数量：${orderArray[i].number}${orderArray[i].item.unit}，单价：${orderArray[i].item.price.toFixed(2)}(元)，小计：${orderArray[i].totalMOney}(元)\n`;
//    receipt+=name+style+orderArray[i].item.name
//    +style1+num+style+orderArray[i].number+orderArray[i].item.unit+style1
//    +price+style+orderArray[i].item.price.toFixed(2)+util+style1+count+style+orderArray[i].totalMOney+util+"\n";
}
receipt+=`----------------------\n`;
//receipt+=`总计：${}+totalMOney.toFixed(2)+util+\n`;
receipt+=`总计：${totalMOney.toFixed(2)}(元)\n`;
receipt+=`节省：${totalPromotionMoney.toFixed(2)}(元)\n`;
receipt+=`**********************`;


return receipt;
}
