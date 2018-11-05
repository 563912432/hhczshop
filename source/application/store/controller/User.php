<?php

namespace app\store\controller;

use app\store\model\User as UserModel;

/**
 * 用户管理
 * Class User
 * @package app\store\controller
 */
class User extends Controller
{
    /**
     * 用户列表
     * @return mixed
     * @throws \think\exception\DbException
     */
    public function index()
    {
        $model = new UserModel;
        $list = $model->getList();
        return $this->fetch('index', compact('list'));
    }

    public function auth()
    {
      $model = new UserModel;
      $data['user_id'] = input('post.user_id');
      $data['is_agent'] = 1;
      if (input('post.user_id') === '')
      {
        return $this->renderError('参数异常！');
      }
//      if ($this->postData('tel') === '')
//      {
//        return $this->renderError('手机号不为空！');
//      }
      if (!$model->allowField(true)->isUpdate(true)->save($data))
      {
        $error = $model->getError()?:'授权失败';
        return $this->renderError($error);
      }
      return $this->renderSuccess('授权成功', url('user/index'));
    }
}
