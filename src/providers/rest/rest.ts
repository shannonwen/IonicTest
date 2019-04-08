//import { HttpClient } from '@angular/common/http'; test
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: Http) {
    console.log('Hello RestProvider Provider');
  }

  //feed
  private  apiUrlFeeds = 'https://imoocqa.gugujiankong.com/api/feeds/get'
  //account
  private apiUrlRegister = 'https://imoocqa.gugujiankong.com/api/account/register';
  private apiUrlLogin = 'https://imoocqa.gugujiankong.com/api/account/login';
  private apiUrlUserInfo = 'https://imoocqa.gugujiankong.com/api/account/userinfo';
  private apiUrlUpdateNickName = 'https://imoocqa.gugujiankong.com/api/account/updatenickname';
  //question
  private apiUrlQuestionSave = 'https://imoocqa.gugujiankong.com/api/question/save';
  private apiUrlQuestionList = 'https://imoocqa.gugujiankong.com/api/question/questionlist?index=1&nu';
  private apiUrlGetQuestion = 'https://imoocqa.gugujiankong.com/api/question/get';
  private apiUrlAnswer = 'https://imoocqa.gugujiankong.com/api/question/answer';
  private apiUrlGetQuestionWithUser = 'https://imoocqa.gugujiankong.com/api/question/getwithuser';
  private apiUrlSaveFavourite = 'https://imoocqa.gugujiankong.com/api/question/savefavourite';

  /**
   * 使用用户名密码登录
   *
   * @param {*} mobile
   * @param {*} password
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  login(mobile, password): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlLogin + "?mobile=" + mobile + "&password=" + password);
  }

  /**
   * 注册用户
   *
   * @param {*} nickname
   * @param {*} mobile
   * @param {*} password
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  register(nickname, mobile, password): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlRegister + "?mobile=" + mobile + "&password=" + password + "&nickname=" + nickname);
  }

  /**
   * 获取用户信息
   *
   * @param {*} userId
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  getUserInfo(userId): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlUserInfo + "?userid=" + userId );
  }

  /**
   * 更新用户昵称
   *
   * @param {*} userId
   * @param {*} nickname
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  updateUserInfo(userId, nickname): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlUpdateNickName + "?userid=" + userId + "&nickname=" + nickname);
  }

  /**
   * 发表提问
   *
   * @param {*} userId
   * @param {*} title
   * @param {*} content
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  saveQuestion(userId, title, content): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlQuestionSave + "?userid=" + userId + "&title=" + title + "&content=" + content);
  } 

  /**
   * 请求首页的feeds流 
   *
   * @type {Observable<string[]>} 
   * @memberof RestProvider
   */
  getFeeds(): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlFeeds);
  }

    /**
   * 请求发现的feeds流 
   *
   * @type {Observable<string[]>} 
   * @memberof RestProvider
   */
  getQuestions(): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlQuestionList);
  }
 
  /**
   * 获取问题的详情
   *
   * @param {*} id
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  getQuestion(id): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlGetQuestion + "?id=" + id);
  }

  /**
   * 获取问题的详情,传递userid，获取当前用户有没有关注此问题
   *
   * @param {*} id
   * @param {*} userId
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  getQuestionWithUser(id, userId): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlGetQuestionWithUser + "?id=" + id + "&userid=" + userId);
  }
  /**
   * 关注问题
   *
   * @param {*} questionId
   * @param {*} userId
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  saveFavourite(questionId, userId): Observable<string[]>{
    return this.getUrlReturn(this.apiUrlSaveFavourite + "?questionid=" + questionId + "&userid=" + userId);
  }


  /**
   * 发布问题
   *
   * @param {*} userId
   * @param {*} questionId
   * @param {*} content
   * @returns
   * @memberof RestProvider
   */
  answer(userId, questionId, content){
    return this.getUrlReturn(this.apiUrlAnswer + "?questionid=" + questionId + "&userid=" + userId + "&content=" + content);
  }

  /**
   *
   *全局获取HTTP请求的方法
   * @private
   * @param {string} url
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  private getUrlReturn(url:string):  Observable<string[]>{
    return this.http.get(url)
        .map(this.extractData)
        .catch(this.handleError)
  }
  /**
   *
   *
   * @private
   * @param {Response} res
   * @returns
   * @memberof RestProvider
   */
  private extractData(res:Response){
    let body = res.json();
    return JSON.parse(body) || {};
  }
/**
 *
 *
 * @private
 * @param {(Response | any)} error
 * @returns
 * @memberof RestProvider
 */
  private handleError(error: Response | any){
      let errMsg:string;
      if(error instanceof Response){
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} = ${error.statusText || ''} ${err}`;
      } else {
          errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
