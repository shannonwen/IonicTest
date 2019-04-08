import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ModalController, IonicPage } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage'
import { AnswerPage } from '../answer/answer';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage extends BaseUI {

  questionId: string;
  question: string[];
  answers: string[];
  errorMessage: any;
  isFavourite: boolean;
  userid: string;
  isMyQuestion: boolean;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public rest: RestProvider,
    public storage: Storage,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController) {
      super();
  }

  ionViewDidLoad() {
    this.questionId = this.navParams.get("id");
    this.loadQuestion(this.questionId);
  }

  loadQuestion(id){
    this.storage.get("UserId")
      .then(val =>{
        if(val != null){
          var loading = this.showLoading(this.loadingCtrl, "加载中...");
          this.rest.getQuestionWithUser(id, val)
            .subscribe(
              q =>{
                loading.dismiss();
                this.question = q;
                this.answers = q["Answers"];
                this.isFavourite = q["IsFavourite"];
                this.isMyQuestion = q["OwnUserId"] == val;
              }, 
              error => {
                this.errorMessage = <any>error
              }
            );
        }
      })
    
  }


  saveFavourite(){
    this.storage.get("UserId")
      .then(val =>{
        if(val != null){
          var loading = this.showLoading(this.loadingCtrl, "请求中...");
          this.rest.saveFavourite(this.questionId, val)
            .subscribe(
              f =>{
                loading.dismiss();
                if(f["Status"] == "OK"){
                  super.showToast(this.toastCtrl, this.isFavourite ? '取消关注成功' : '关注问题成功')
                  this.isFavourite = !this.isFavourite;
                }
              }, 
              error => {
                loading.dismiss();
                this.errorMessage = <any>error
              }
            );
        }
      })
  }

  showAnswerPage(){
    let modal = this.modalCtrl.create(AnswerPage, {id: this.questionId});
    //关闭后的回调
    modal.onDidDismiss(() =>{
      this.loadQuestion(this.questionId);
    });
    modal.present();
  }

}
