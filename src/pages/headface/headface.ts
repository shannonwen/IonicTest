import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, LoadingController, Platform, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';

import { File } from '@ionic-native/file';
import { Transfer,TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

declare var cordova: any;//导入第三方库到ts中

/**
 * Generated class for the HeadfacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-headface',
  templateUrl: 'headface.html',
})
export class HeadfacePage extends BaseUI {

  userId: string;
  errorMessage: string;

  lastImage: string = null;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public storage: Storage,
    public rest: RestProvider,
    public loading: LoadingController,
    public camera: Camera,
    public transfer: Transfer,
    public filepath: FilePath,
    public file: File,
    public platform: Platform,
    public toastCtrl: ToastController
    ) {
      super();
  }

  takePicture(sourceType){
    //定义相机的一些参数
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: true,//是否保存拍摄的照片到相册中去
      correctOrientation: true,//是否纠正拍摄的照片的方向
    }

    //获取图片的方法
    this.camera.getPicture(options)
      .then(imagePath => {
        //特别处理Android 平台的文件路径问题
        if(this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY){
          //获取android平台下的路径
          this.filepath.resolveNativePath(imagePath)
            .then(filePath => {
              //获取正确的路径
              let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1)
              //获取正确的文件名
              let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));

              this.copyFileToLocalDir(correctPath, currentName, this.createFileName())

            })
        } else {
          //获取正确的路径
          let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1)
          //获取正确的文件名
          let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);

          this.copyFileToLocalDir(correctPath, currentName, this.createFileName())

        }
        
      }, error => {
        super.showToast(this.toastCtrl, "选择图片出现错误，请在App中操作或检查相关权限")
      } 
      );
  }

  //将获取到的图片或相机拍摄到的图片进行一下另存为，用于后期的图片上传使用
  copyFileToLocalDir(namePath, currentName, newFileName){
    //cordova.file.dataDirectory 临时目录
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
      .then(success => {
        this.lastImage = newFileName;
      },error =>{
        super.showToast(this.toastCtrl, "存储图片到本地图库出现错误。")
      })
      
  }

  //为文件生成一个新的文件名
  createFileName(){
    var d = new Date(),
      n = d.getTime(),
      newFileName = n+ ".jpg";//拼接文件名
    return newFileName;
  }

  ionViewDidLoad() {
    
  }

  ionViewDidEnter(){
    this.storage.get("userId")
      .then(val => {
        if(val != null){
          this.userId = val;
        }
      })
  }

  presentActionSheet(){
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择图片',
      buttons:[
        {
          text: '从图片库中选择',
          handler: () => {
            
          }
        },
        {
          text: '使用相机',
          handler: () => {

          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

}
