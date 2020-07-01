// 引入文件
import request from '../utils/request';
const vm = '/v2/movie';
const apikey = '0df993c66c0c636e29ecbb5344252a4a'

export default {
    /**
     *  获取正在热映的电影
     *  @start [数据开始项]
     *  @count [单页条数]
     */
    getInTheaters(start, count) {
      return request({
        url: vm + '/in_theaters?apikey=' + apikey,
        method: 'get',
        params: {
          start: start,
          count: count
        }
      })
    },
    /**
     *  获取Top250的电影
     *  @start [数据开始项]
     *  @count [单页条数]n
     */
    getTop250(start, count) {
      return request({
        url: vm + '/top250?apikey=' + apikey,
        method: 'get',
        params: {
          start: start,
          count: count
        }
      })
    },
    /**
     *  获取即将上映的电影
     *  @start [数据开始项]
     *  @count [单页条数]
     */
    getComingSoon(start, count) {
      return request({
        url: vm + '/coming_soon?apikey=' + apikey,
        method: 'get',
        params: {
          start: start,
          count: count
        }
      })
    },
    /**
     *  获取电影详情
     *  @id [电影id]
     */
    getMovieDetails(id) {
      return request({
        url: vm + `/${id}?apikey=${apikey}`,
        method: 'get',
        params: {}
      })
    },

    /** 电影搜索 (暂不可用)
     *  @start  [数据开始项]
     *  @count  [单页条数]
     *  @q      [关键字]
     *  @tag    [电影标签]
     */
    // getSearch(start, count, q, tag) {
    //   return request({
    //     url: vm + '/search',
    //     method: 'get',
    //     params: {
    //       start: start,
    //       count: count,
    //       q: q,
    //       tag: tag
    //     }
    //   })
    // }

    /**
     * 电影本周口碑榜
     */
    getWeeklyMovie() {
      return request({
        url: vm + '/weekly?apikey=' + apikey,
        method: 'get',
        params:{}
      })
    },
    /**
     * 北美票房榜
     */
    getUsBox() {
      return request({
        url: vm + '/us_box?apikey=' + apikey,
        method: 'get',
        params:{}
      })
    },
    /**
     * 新片榜
     */
    getNewMovie() {
      return request({
        url: vm + '/new_movies?apikey=' + apikey,
        method: 'get',
        params:{}
      })
    },
    /**
     * 影人剧照
     */
    getCelebrity(id) {
      return request({
        url: vm + `/celebrity/${id}/photos?apikey=` + apikey,
        method: 'get',
        params:{}
      })
    },
    /**
     * 电影条目剧照
     */
    getSubject(id) {
      return request({
        url: vm + `/subject/${id}/photos?apikey=` + apikey,
        method: 'get',
        params:{}
      })
    },
    /**
     * 获取电影条目评论
     */
    getMovieComments(id, start, count, key=apikey) {
      return request({
        url: vm + `/subject/${id}/comments`,
        method: 'get',
        params: {
          start: start,
          count: count,
          apikey: key
        }
      })
    }
}
