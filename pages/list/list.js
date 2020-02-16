// pages/list/list.js
import Constants from '../../utils/Constants.js';
import api from '../../api/api-request';

const CAT_FIRST = 1;
const CAT_SECOND = 2;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filters: {
      cat1: '', // 一级分类
      cat2: '', // 二级分类
      sort: 1, // 排序
      page: 1, // 分页
    },

    catList1: [],
    catList2: [],
    goodsList: [],
    sortList: Constants.DICT_SORT_LIST,

    loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('---->', api);
    this._loadCatList1().then(catList1 => {
      if (!catList1 || catList1.length === 0) return;

      this._changeFilter({ cat1: catList1[0].id });
      this._loadCatList2(catList1[0].id);
    });
  },

  // 选择一级分类
  onChangeCat1: function(e) {
    const { id } = e.currentTarget.dataset;
    this._changeFilter({ cat1: id, cat2: '', page: 1, sort: 1 });
    this._loadCatList2(id);
  },

  // 选择二级分类
  onChangeCat2 (e) {
    this._changeFilter({ cat2: e.detail, page: 1, sort: 1 });
  },

  // 选择排序
  onChangeSort (e) {
    this._changeFilter({ sort: e.detail});
  },

  // 分页加载
  onScrollToBottom (e) {
    const nextPage = this.data.filters.page + 1;
    this._changeFilter({ page: nextPage });
  },

  // 一级分类
  _loadCatList1: function(callback) {
    return api.get('sub/list').then(data => {
      this.setData({ catList1: data });
      return data;
    });
  },

  // 二级分类
  _loadCatList2: function (parentId) {
    api.get(`cat/list/${parentId}`).then(catList2 => {
      const l = catList2.map(item => ({ value: item.id, text: item.name }));
      this.setData({
        catList2: [{ value: '', text: '全部' }, ...l],
       });
    });
  },

  // 商品列表
  _loadGoodList: function () {
    const { filters: { cat1, cat2, sort, page }, goodsList, total, loading } = this.data;
    if(loading) return;

    this.setData({ loading: true });
    api.post('goo/list', {
      data: {
        id: cat2 ? cat2 : cat1,
        type: cat2 ? CAT_SECOND : CAT_FIRST,
        sort,
        page
      }
    }).then(res => {
      const { list, total } = res;
      this.setData({
        goodsList: page === 1 ? res.list : [...goodsList, ...list],
        loading: false
      });
    });
  },

  _changeFilter (newFilters) {
    const { filters } = this.data;
    this.setData({ filters: { ...filters, ...newFilters} });
    this._loadGoodList();
  }
})