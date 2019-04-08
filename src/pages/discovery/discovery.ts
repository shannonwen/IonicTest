import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Refresher } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { BaseUI } from '../../common/baseui';
import { DetailsPage } from '../../pages/details/details'


/**
 * Generated class for the DiscoveryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-discovery',
  templateUrl: 'discovery.html',
})
export class DiscoveryPage extends BaseUI {

  feeds: string[];
  errorMessage: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
    public rest: RestProvider) {
      super();
  }

    /**
   * 页面加载完成后执行
   *
   * @memberof HomePage
   */
  ionViewDidLoad(){
    this.getFeeds(null);
  }

  getFeeds(refresher){
    this.rest.getFeeds()
      .subscribe( 
        f => {
          this.feeds = f;
          refresher && refresher.complete();
        },
        error => {
          this.errorMessage = <any>error
          refresher && refresher.complete();
        });
  }


  gotoDetails(questionId){
    this.navCtrl.push(DetailsPage, {id: questionId});
  }


}
