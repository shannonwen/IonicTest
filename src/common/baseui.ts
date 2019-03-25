import {Loading, LoadingController, ToastController, Toast } from 'ionic-angular'

export abstract class BaseUI{
    constructor(){}
    /**
     * 通用进度条
     *
     * @protected
     * @param {LoadingController} loadingCtrl
     * @param {string} message
     * @returns {Loading}
     * @memberof BaseUI
     */
    protected showLoading(loadingCtrl: LoadingController, 
        message: string): Loading{
        let loader = loadingCtrl.create({
            content: message,
            dismissOnPageChange: true
        });
        loader.present();
        return loader;
    }

    protected showToast(toastCtrl: ToastController, message: string): Toast{
        let toast = toastCtrl.create({
            message: message,
            duration: 3000,
            position: "bottom"
        });
        toast.present();
        return toast;
    }
}