/* eslint-disable quote-props */
import yin from '/@/assets/images/weather/yin.png'
import yu from '/@/assets/images/weather/yu.png'
import duoyun from '/@/assets/images/weather/duoyun.png'
import zhenyu from '/@/assets/images/weather/zhenyu.png'
import leizhenyu from '/@/assets/images/weather/leizhenyu.png'
import qing from '/@/assets/images/weather/qing.png'
import dongyu from '/@/assets/images/weather/dongyu.png'
import yujiaxue from '/@/assets/images/weather/yujiaxue.png'
import xue from '/@/assets/images/weather/xue.png'
import baofengxue from '/@/assets/images/weather/baofengxue.png'
import feng from '/@/assets/images/weather/feng.png'
import longjuanfeng from '/@/assets/images/weather/longjuanfeng.png'
import bingbao from '/@/assets/images/weather/bingbao.png'
import wumai from '/@/assets/images/weather/wumai.png'
import shachenbao from '/@/assets/images/weather/shachenbao.png'
import wu from '/@/assets/images/weather/wu.png'
import unknown from '/@/assets/images/weather/unknown.png'
import hot from '/@/assets/images/weather/hot.png'
import cool from '/@/assets/images/weather/cool.png'

export const getWeatherIcon = (weather: string) => {
  const map: { [key: string]: any; } = {
    '晴': qing,
    '少云': duoyun,
    '多云': duoyun,
    '阴': yin,
    '有风': feng,
    '平静': feng,
    '微风': feng,
    '和风': feng,
    '清风': feng,
    '强风/劲风': feng,
    '疾风': feng,
    '大风': feng,
    '烈风': feng,
    '风暴': longjuanfeng,
    '狂爆风': longjuanfeng,
    '飓风': longjuanfeng,
    '热带风暴': longjuanfeng,
    '霾': wumai,
    '中度霾': wumai,
    '重度霾': wumai,
    '严重霾': wumai,
    '阵雨': zhenyu,
    '雷阵雨': leizhenyu,
    '雷阵雨并伴有冰雹': bingbao,
    '小雨': yu,
    '中雨': yu,
    '大雨': yu,
    '暴雨': yu,
    '大暴雨': yu,
    '特大暴雨': yu,
    '强阵雨': zhenyu,
    '强雷阵雨': leizhenyu,
    '极端降雨': yu,
    '毛毛雨/细雨': yu,
    '雨': yu,
    '小雨-中雨': yu,
    '中雨-大雨': yu,
    '大雨-暴雨': yu,
    '暴雨-大暴雨': yu,
    '大暴雨-特大暴雨': yu,
    '雨雪天气': yujiaxue,
    '雨夹雪': yujiaxue,
    '阵雨夹雪': yujiaxue,
    '冻雨': dongyu,
    '雪': xue,
    '阵雪': xue,
    '小雪': xue,
    '中雪': xue,
    '大雪': xue,
    '暴雪': baofengxue,
    '小雪-中雪': xue,
    '中雪-大雪': xue,
    '大雪-暴雪': xue,
    '浮尘': shachenbao,
    '扬沙': shachenbao,
    '沙尘暴': shachenbao,
    '强沙尘暴': shachenbao,
    '龙卷风': longjuanfeng,
    '雾': wu,
    '浓雾': wu,
    '强浓雾': wu,
    '轻雾': wu,
    '大雾': wu,
    '特强浓雾': wu,
    '热': hot,
    '冷': cool,
    '未知': unknown
  }

  return map[weather] || unknown
}
