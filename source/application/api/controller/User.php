<?php

namespace app\api\controller;

use app\api\model\User as UserModel;

/**
 * 用户管理
 * Class User
 * @package app\api
 */
class User extends Controller
{
    /**
     * 用户自动登录
     * @return array
     * @throws \app\common\exception\BaseException
     * @throws \think\Exception
     * @throws \think\exception\DbException
     */
    public function login()
    {
        $model = new UserModel;
//        $user_id = $model->login($this->request->post());
        $returnInfo = $model->login($this->request->post());
        $user_id = $returnInfo['user_id'];
        $is_agent = $returnInfo['is_agent'];
        $token = $model->getToken();
//        return $this->renderSuccess(compact('user_id', 'token', 'tel'));
        return $this->renderSuccess(['user_id' => $user_id, 'token' => $token, 'is_agent' =>$is_agent]);
    }

    /*
     * 认证手机号
     * @return
     * */
    public function authTel()
    {
      $model = new UserModel;
      $data = $this->request->post();
      // 验证手机号码格式
      if (!checkTel($data['tel'])){
        return $this->renderError('手机号码格式有误');
      }
      if ($model->where(['user_id' =>$data['user_id']])->setField('tel', $data['tel']) !== false) {
        return $this->renderSuccess(['tel' => $data['tel']], '认证成功');
      } else{
        return $this->renderError('认证失败');
      }
    }
}
