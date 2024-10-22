const fetchapi = async() => {
  const response = await fetch('http://10.63.0.111:8080/api/temp/historic')
  const data = await response.json()

  return data;
}

export default fetchapi