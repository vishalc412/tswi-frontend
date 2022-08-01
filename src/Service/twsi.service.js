import httpClient from "../http-common";

const addition = data => {
  return httpClient.post("/addition", data);
}
const continuation = data => {
  return httpClient.post("/continuation", data);
}
const termination = data => {
  return httpClient.post("/termination", data);
}
export default {addition,continuation,termination};