/**
 * 配置request请求时的默认参数
 */
import { extend } from 'umi-request';

/**
 * 配置request请求时的默认参数
 */
export const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
});
