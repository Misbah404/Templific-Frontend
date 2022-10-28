export const initiateSession = (redirect_uri) => {
  // const client_id = "iybdl7z27yl8dtam9s9k6cal";
  const client_id = "0246y9ehhw69r0vxqc1c0xfq";

  const scope =
    "profile_r%20email_r%20listings_r%20listings_w%20shops_r%20transactions_r%20billing_r";

  window.location.href = `https://www.etsy.com/oauth/connect?response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=${scope}&client_id=${client_id}&state=superstate&code_challenge=${process.env.REACT_APP_CODE_CHALLENGE}&code_challenge_method=S256`;
};

export const getAccessToken = (
  code,
  token,
  successCallback = () => {},
  errorCallback = () => {}
) => {
  localStorage.removeItem("etsy_access_token");
  localStorage.removeItem("etsy_refresh_token");

  fetch(`${process.env.REACT_APP_API_BASE_URL}/api/etsy/getAccessToken`, {
    method: "POST",
    body: JSON.stringify({
      redirect_uri: process.env.REACT_APP_REDIRECT_URI,
      code,
    }),

    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error && data.error?.message) {
        errorCallback(data);
      }

      if (data.access_token && data.token_type && data.refresh_token) {
        successCallback(data);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
