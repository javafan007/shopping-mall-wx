import api from '../../api/api-request';
import Constants from '../../utils/Constants.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: null,
    recommendList: [],

    // 商品状态
    goodsStatus: null,

    region: ['广东省', '广州市', '海珠区'],
  },

  onLoad: function (options) {
    options.id = '00a302f2-9df7-411a-81c3-4e947f852d20';
    api.get(`goo/view/${options.id}`).then(res => {
      res.badgeArray = this._formatBadge(res.badge);
      res.formatedUnit = this._formatUnit(res.unit);
      this.setData({ goods: res });
      this.setData({ goodsStatus: this._getGoodStatus(res) });
    });
    api.get(`goo/recommend/${options.id}`).then(res => {
      this.setData({ recommendList: res });
    });
  },

  chooseAddress (e) {
    this.setData({
      region: e.detail.value
    })
  },

  // 格式化商品单位
  _formatUnit (unitCode) {
    const unitMap = {
      1: '1斤',
      2: '1公斤',
      3: '1个',
      4: '1只',
      5: '1件',
      6: '1盒',
      7: '1瓶',
      8: '1箱',
      19: '1袋',
      10: '1根',
    }
    return unitMap[unitCode] || '';
  },

  // 格式化商品标签
  _formatBadge(source='') {
    let result = [];
    source.split('|').forEach(row => {
      result = [...result, ...row.split(',')];
    });
    return result.filter(item => !!item);
  },

  _getGoodStatus(goods) {
    if (goods.status == 1){
      if (goods.stock > 0){
        return getItemStatus('有货', '#006400', true);
      }
      return getItemStatus('无货', '#CC3333', false);
    } 
    return getItemStatus('无效', '#CC3333', false);

    function getItemStatus(statusText, statusColor, canAddToCart) {
      return { statusText, statusColor, canAddToCart };
    }
  }

})