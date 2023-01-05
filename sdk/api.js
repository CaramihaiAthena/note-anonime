import axios from 'axios' //handling the http request

export async function submitProject(params) {
    console.log('params', params)
    axios.post('http://127.0.0.1:8087/api/submitProject', params).then((response) => {
    console.log('response', response)
  }, (error) => {
    console.log('error', error);
  })
}
