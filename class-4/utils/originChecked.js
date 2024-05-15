const HOST_API = "localhost:3000" // Same origin of API

export const originChecked = ({ req, acceptedOriginProp }) => {
  const { origin = null, host = null } = req.headers

  return {
    acceptedOrigin: acceptedOriginProp.includes(origin) || host === HOST_API,
    origin
  }
}
