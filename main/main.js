'use strict';

function printReceipt(inputs) {
  let orderArray=getAllOrder(inputs);
  let receipt=createReceipt(orderArray);
  console.log(receipt);
}

// function Order(){
//     // this.item=item;
//     // this.number=number;
//     // this.totalMoney=totalMoney;
    
// }

function countNumOfItem(inputs){
  var itemMap=new Map();
  let helpArray=[];
  let keyNum=0;
   
  inputs.forEach((item, index, array) => {
    if(!helpArray.includes(item)){
      let count=0;
      if(item.includes("-")){
          let value=item.split("-");
          item=value[0];
          
          inputs.forEach((item1,index,array)=>{
             if(item1.includes(item)){
                 let item1Value=item1.split("-");
                 count+=Number.parseFloat(item1Value[1]);
             }
          });
      }else{
        inputs.forEach((item1, index, array)=>{
            if(item1.includes("-")){

            }else{
                
            }
            if(item==item1){
              count++;
            }
      });
      }
      
      helpArray.push(item);
      itemMap.set(keyNum,item+":"+count);
      console.log(item+":"+count)
      keyNum++;
    }
  });
  return itemMap;
}


function getAllOrder(inputs){
  let orderArray=new Array();
 let itemMap=countNumOfItem(inputs);
 let allItems=loadAllItems(); 
 let promotion=loadPromotions()[0].barcodes;
 
 for(let i=0;i<itemMap.size;i++){
    let itemValue=itemMap.get(i);
    let itemIdAndCount=itemValue.split(":");
    let itemId=itemIdAndCount[0];
    let count=itemIdAndCount[1];
    
    let isPromotionItem1=isPromotionItem(itemId,promotion);
    //统计优惠个数
    let promotionCount=0;
    let number=Number.parseInt(count);
    if(isPromotionItem1){
         while(number>2){
             if(number>2){
                 promotionCount++;
                 number=number-3;
             }
         }      
    }
    let item=null;
     allItems.forEach((it,index,array)=>{
      if(itemId==it.barcode){
        item=it;
      }
     });
     var order=new Object();
     order.item=item;
     order.number=count;
     order.promotionCount=promotionCount;
     order.promotionMoney=(item.price*promotionCount).toFixed(2)
     order.totalMOney=(item.price*(Number.parseInt(count)-promotionCount)).toFixed(2);
     orderArray.push(order);
 }

return orderArray;
}
function isPromotionItem(barcode,promotion){
    let isPromotionItemFlag=false;
    promotion.forEach((it,index,array)=>{
        if(barcode==it){
            isPromotionItemFlag=true;      
          }
    });
    
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
