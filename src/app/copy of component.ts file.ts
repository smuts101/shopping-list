


<br>
<br>
<br>
<div style="width:40%;margin-left:30%;">
  <form #listData="ngForm">
  <input type="text" 
         [(ngModel)]="item" 
         name="item"
         class="form-control" 
         placeholder="Item name..." 
         aria-label="Recipient's username" 
         aria-describedby="button-addon2" 
         #ctrl="ngModel" required>

         <div *ngIf="ctrl.invalid && (ctrl.dirty || ctrl.touched)"
         class="alert alert-danger">
      <div *ngIf="ctrl.errors.required">
                  Username is required
      </div>
    </div>






  <div class="input-group mb-3">
    <div class="input-group-prepend">
      <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
    </div>
    <div class="custom-file">
      <input type="file" (change)="fileChangeEvent($event)" class="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01">
      <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
    </div>
  </div>
  <div style="color:red;">
    <p>{{  this.imageError}}</p>
  </div>
    <button class="btn btn-success" [disabled] = "!listData.form.valid"  (click)="newItem()" type="button" >Add</button>
</form>
<br>
<br>
<br>
    <ng-container *ngIf="valueEdit!=''">    
    <input text="text" [(ngModel)]="valueEdit" class="form-control"  aria-label="Recipient's username" aria-describedby="button-addon2" placeholder="Item...">
    <input type="file" (change)="editfileChangeEvent($event)" >
    <br><br>
    <button class="btn btn-primary" (click)="editItem(idEdit,valueEdit)">Edit</button>
  </ng-container> 
</div>

<div style = "width: 50%; height: 300px;  overflow:scroll;margin-left: 25%;" >

<div *ngFor="let y of combined,let i =index">
  <ng-container *ngIf="isImageSaved; else elseTemplate">
    <div style="width:50%;height:150%;background-color: lavender;text-align: center;margin-left: 25%;">
      <img [src]="y.url" style="width:100%;height:150%;" /><br>
      <span style="color:royalblue;font-weight: bold;">{{y.item}}</span>
      <button style="background-color: white;border:3px solid red;color:red"  (click)="removeItem(i)" type="button" >Remove</button>
      <button style="background-color: white;border:3px solid orange;margin-top: 2px;"   (click)="editItem(i,y.item)" type="button" >edit</button>
    </div>
  </ng-container>
  <ng-template #elseTemplate>
    <img src="./../../assets/download.jpg" >
  </ng-template>
</div>
</div>























