import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
title = 'my-app';
ItemList:any=[]
ImgList:any=[]  
objItem1:any = {}
item = "";
status = false
idEdit = "";
valueEdit = "";
imageError: string;
isImageSaved: boolean;
EditIsImageSaved: boolean;
cardImageBase64: string;
arrImg:any = []
combined:any = []

  constructor(){}

  newItem(){
    if( this.isImageSaved == true){
        this.status = true;
        this.objItem1=this.item
        this.item = "";
        this.combined.push(Object.assign({url:this.cardImageBase64},{item:this.objItem1})) 
        console.log(this.combined)
     }
   }
  
  editItem(id,value){
    this.idEdit = id;
    this.valueEdit = value;
    if(this.EditIsImageSaved==true){
      for(let x = 0;x<=this.combined.length-1;x++){
        if(this.combined[this.idEdit]==this.combined[x])
         {
           this.combined[x]=Object.assign({url:this.cardImageBase64},{item:this.valueEdit})
           this.cardImageBase64=""
         }
        console.log( this.combined[x])  }
    }
  }
  editfileChangeEvent(editFileInput: any){
    const reader = new FileReader();
        reader.onload = (e:any)=>{
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs=> {
              const imgBase64Path = e.target.result;
              this.cardImageBase64 = imgBase64Path;
              this.EditIsImageSaved = true;
             return this.cardImageBase64;
            }
          }
          reader.readAsDataURL(editFileInput.target.files[0])
  }
  fileChangeEvent(fileInput: any) {
    this. imageError = null;
    if(fileInput.target.files && fileInput.target.files[0]){
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 15200;
        const max_width = 25600;   
        if(fileInput.target.files[0].size > max_size){
          this.imageError = 'Maximum size allowed is ' + max_size / 1000 + 'Mb';
          return false;
        }
        if (!allowed_types.includes( fileInput.target.files[0].type)) {
          this.imageError = 'Only Images are allowed ( JPG | PNG )';
          return false;
        }
        const reader = new FileReader();
        reader.onload = (e:any)=>{
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs=> {
              const img_height = rs.currentTarget['height'];
              const img_width = rs.currentTarget['width'];
              console.log(img_height,img_width);
              if(img_height > max_height && img_width > max_width){
                this.imageError =
                'Maximum dimentions allowed ' +
                max_height +
                '*' +
                max_width +
                'px';
                return false;
              }else{
                const imgBase64Path = e.target.result;
                this.cardImageBase64 = imgBase64Path;
                this.isImageSaved = true;
               return this.cardImageBase64;
              }
            }
          }
        reader.readAsDataURL(fileInput.target.files[0])
    }
  }
  removeImage(removeID){
    for(let k = 0;k<=this.arrImg.length-1;k++){
      if(this.arrImg[removeID]==this.arrImg[k]){
         let temp = this.arrImg[k];
         this.arrImg[temp] = this.arrImg[k+1];
         this.arrImg[k] = this.arrImg[temp];
         -- this.arrImg.length
      }
    }
  }
  removeItem(removeID){
    for(let k = 0;k<=this.combined.length-1;k++){
      if(this.combined[removeID]==this.combined[k]){
         let temp = this.combined[k];
         this.combined[temp] = this.combined[k+1];
         this.combined[k] = this.combined[temp];
         -- this.combined.length
      }
    }
  }
}













