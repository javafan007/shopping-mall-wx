import api from '../../api/api-request';
import { CART_KEY } from '../../utils/Constants';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    checkedAll: false, // 全选
    checkedMap: {}, // 商品选中列表
    cartItems: [],  // 商品列表
    totalPrice: 0,
  },

  // 全选
  toggleCheckedAll () {
		const { checkedMap, checkedAll } = this.data;
		for(let key in checkedMap) {
			checkedMap[key] = !checkedAll;
    }
		this._setChecked(checkedMap);
  }, 

  // 单选
  onChecked (e) {
    const { id } = e.currentTarget.dataset;
    const { checkedMap } = this.data;
		checkedMap[id] = !checkedMap[id];

		this._setChecked(checkedMap);
  },

  // 变更数量
  onChangeNum (e) {
    const { id } = e.currentTarget.dataset;
    const amount = e.detail;

    // api.post('sho/setAmount', {
    //   data: {
    //     id,
    //     amount,
    //   }
    // }).then(res => {
    //
    // });
    // 接口请求成功，调用更新UI
		const { cartItems } = this.data;
		const found = cartItems.find(item => item.id === id);
		if(found) {
			found.amount = amount;
      this.setData({ cartItems });
			this._computeTotalPrice();
		}
  },

	// 提交表单
	onSubmit () {
		const { cartItems, totalPrice } = this.data;
		const checkedIds = cartItems.filter(item => item.checked).map(item => item.id);
		console.log(checkedIds, totalPrice);

		// 情况购物车
		wx.removeStorage({ key: CART_KEY });
	},

  // 计算总价
  _computeTotalPrice () {
    const { cartItems, checkedMap } = this.data;
    const checkedList = cartItems.filter(item => checkedMap[item.id]);
    const totalYuan = checkedList.reduce((total, item) => total + item.price * item.amount, 0);

    this.setData({ totalPrice: totalYuan * 100 /* 转成分 */ });
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this._loadCart();
  },

  // 加载购物车数据
  _loadCart () {
		api.post('sho/list', {
			data: {
				"selectGoodsIds": ""
			}
		}).then(cartItems => {
			this.setData({ cartItems });
      this._initCheckedMap(cartItems);
		});
  },

  // 初始化存储在本地的选中状态
  _initCheckedMap (cartItems = []) {
		const checkedMap = {};
		const storageCheckedMap = wx.getStorageSync(CART_KEY);
		cartItems.forEach(item => {
			checkedMap[item.id] = !!storageCheckedMap[item.id];
		});
		this._setChecked(checkedMap);
  },

	_setChecked(checkedMap) {
		const vList = Object.values(checkedMap);
		const checkedCount = vList.filter(val => val).length;

    this.setData({
			checkedMap,
			checkedAll: vList.length === checkedCount,
    });

		this._computeTotalPrice();

		// 存储商品选中状态
		wx.setStorage({
			key: CART_KEY,
			data: checkedMap
		});
	}
});