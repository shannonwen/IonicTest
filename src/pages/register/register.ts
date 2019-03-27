import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, LoadingController, Loading } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest'
import { BaseUI } from '../../common/baseui';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends BaseUI {

  mobile: string;
  password: string;
  nickname: string;
  errorMessage: any;


  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public rest: RestProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController) {
      super();
  }

  ionViewDidLoad() {
    
  }

  doRegister(){
    var loading = super.showLoading(this.loadingCtrl, "正在注册");
    this.rest.register(this.nickname, this.mobile, this.password)
    .subscribe(
        f=>{
            if(f['Status'] == "OK"){
              //保存token
              super.showToast(this.toastCtrl, f["StatusContent"]);
              loading.dismiss();
              this.dismiss();
            } else {
              loading.dismiss();
              super.showToast(this.toastCtrl, f["StatusContent"]);
            }
        },
        error=>this.errorMessage - <any>error
        )
  }

  dismiss(){
    this.navCtrl.pop();
  }



}
