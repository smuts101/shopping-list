import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {
  title = 'my-app';
  ItemList:any=[]
  ImgList:any=[] 
  objItem1:any = {}
  item:any = "";
  status = false
  idEdit = "";
  valueEdit = "";
  imageError: string;
  isImageSaved: boolean;
  EditIsImageSaved: boolean;
  cardImageBase64: string;
  arrImg:any []=[]
  combined:any[]=[] 
  unid=""
  showEdit: number=0;

  constructor() {}


  newItem(){

    if( this.isImageSaved == true){
      this.status = true;
      this.objItem1=this.item
      this.item = "";

      firebase.firestore().collection('items')
      .add(Object.assign({imgurl:this.cardImageBase64},{item:this.objItem1}))
      .then((res) => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
   }
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

  editItem(id,value){ 
  this.showEdit=1;
   console.log(id)
    this.idEdit = id;
    this.valueEdit = value;
    if(this.EditIsImageSaved==true){
      firebase.firestore().collection("items").doc(id).update({
        item: this.valueEdit,
        imgurl: this.cardImageBase64
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
      // for(let x = 0;x<=this.combined.length-1;x++){
      //   if(this.combined[this.idEdit]==this.combined[x])
      //    {
      //     // this.combined[x]=Object.assign({url:this.cardImageBase64},{item:this.valueEdit})
      //      //this.cardImageBase64=""
      //    }
      //   console.log( this.combined[x])  }
    }else{
      console.log("Noo")  
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
    firebase.firestore().collection("items").doc(removeID).delete();
  }

  ngOnInit(){

    firebase.firestore().collection('items').onSnapshot(res => {
      res.forEach(element => {
        this.combined.push(Object.assign(element.data(),{id:element.id}))
        //this.unid = element.id;
        console.log(  this.combined);
      });
      console.log('Successful!!!');
    });
  }

  back(){
    this.showEdit=0;
  }


}
