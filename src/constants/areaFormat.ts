export default function formatAreaData(options) {
  return options.map((province) => {
    const obj: any = {};
    obj.value = province.provinceName;
    obj.label = province.provinceName;
    obj.children = province.districts.map((city) => ({
      value: city.cityName,
      label: city.cityName,
      children: city.districts.map((area) => ({
        value: area,
        label: area,
      })),
    }));
    return obj;
  });
}
