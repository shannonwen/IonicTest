import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest'

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage extends BaseUI {

  userNickName: string = "加载中...";
  headface: string;
  errorMessage: string;
  userId: any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage,
    public rest: RestProvider,
    public loadCtrl: LoadingController,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController) {
      super();
  }

  ionViewDidEnter() {
    this.loadUserPage();
  }

  loadUserPage(){
    this.storage.get("UserId")
      .then((val)=>{
        if(val != null){
          //加载用户数据
          var loading = super.showLoading(this.loadCtrl, "加载中");
          this.rest.getUserInfo(val)
          .subscribe(
            userinfo => {
              this.userId = userinfo["UserId"];
              this.userNickName = userinfo["UserNickName"];
              this.headface = userinfo["UserHeadface"] + "?" + new Date().valueOf();
              loading.dismiss();
            },
            error => this.errorMessage = <any>error
          );
            
        }
      });
  }

  doSave(){
    this.storage.get("UserId").then(
      val => {
      var loading = super.showLoading(this.loadCtrl, "修改中...");
      this.rest.updateUserInfo(this.userId, this.userNickName)
      .subscribe(
          f => {
              if(f['Status'] == "OK"){
                //保存token
                super.showToast(this.toastCtrl, f["StatusContent"]);
                loading.dismiss();
              } else {
                loading.dismiss();
                super.showToast(this.toastCtrl, f["StatusContent"]);
              }
          },
          error => this.errorMessage = <any>error
          )
      });
    
  }

  doCancel(){
    this.storage.remove("UserId");
    this.viewCtrl.dismiss();
  }

}
