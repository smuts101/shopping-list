import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
ItemList:any=[]
ImgList:any=[]  
objItem1:any = {}
objImg1:any = {}
item = "";
itemEdit ="";
fileSelected = null
status = false

newItem(){
  this.status = true;
  this.objItem1 =this.item
  this.ItemList.push(this.objItem1);
  this.item = "";
  console.log(this.objItem1)
  return this.ItemList;
  
}
onFileElected(event){
  
  if(event.target.files.length>0){
this.fileSelected = event.target.files
    this.objImg1 = this.fileSelected;
    this.ItemList.push(this.objImg1);
  
  
  console.log(this.ImgList)
  
 
  



  }

  
}


removeItem(removeID){
  for(let k = 0;k<=this.ItemList.length-1;k++){
    if(this.ItemList[removeID]==this.ItemList[k]){
       let temp = this.ItemList[k];
       this.ItemList[temp] = this.ItemList[k+1];
       this.ItemList[k] = this.ItemList[temp];
       -- this.ItemList.length
    }
  }
}
editItem(id){
  for(let x = 0;x<=this.ItemList.length-1;x++){
    if(this.ItemList[id]==this.ItemList[x])
     {
       this.ItemList[x] = this.itemEdit
       
     }
    console.log( this.ItemList[x])  }
  
}






}
