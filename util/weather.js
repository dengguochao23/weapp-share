class Weather {
  constructor ({province,city, degree, weather, quality, pm2, co, no2, so2, pm10}) {
    this.province = province
    this.city = city
    this.degree = degree
    this.weather = weather
    this.quality = quality
    this.pm2 = pm2
    this.co = co
    this.no2= no2
    this.so2= so2
    this.pm10=pm10
  }
}
let creatWeather = function createComment (data) {
  return new Weather({
    province: data.province,
    city: data.city,
    degree: data.temp.degree,
    weather: data.temp.weather,
    quality: data.air.aqi_name,
    pm2: data.air['pm2.5'],
    co: data.air['co'],
    no2: data.air['no2'],
    so2: data.air['so2'],
    pm10: data.air['pm10']
  })
}
export {creatWeather}