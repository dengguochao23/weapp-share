class Weather {
  constructor ({ degree, weather, quality}) {
    this.degree = degree
    this.weather = weather
    this.quality = quality
  }
}
let creatWeather = function createComment (data) {
  return new Weather({
    degree: data.temp.degree,
    weather: data.temp.weather,
    quality: data.air.aqi_name
  })
}
export {creatWeather}