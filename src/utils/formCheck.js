/*
 * @Description: 检测是否符合正则并出现提示弹窗
 * @Version: 1.0.0
 * @Author: Chendh
 * @Date: 2021-08-07 15:51:37
 */
export function asyncValidator(val) {
  return new Promise((resolve) => {
    Toast.loading('验证中...');
    Toast.clear();
    resolve(/\d{6}/.test(val));
  });
}