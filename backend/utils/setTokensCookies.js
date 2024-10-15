const setTokensCookies = (
  res,
  accessToken,
  refreshToken,
  newAccessTokenExp,
  newRefreshTokenExp
) => {
  // Get the environment mode
  const isProduction = process.env.NODE_ENV === 'production';

  // Calculate the expiration time for the cookies
  const accessTokenMaxAge =
    (newAccessTokenExp - Math.floor(Date.now() / 1000)) * 1000;
  const refreshTokenMaxAge =
    (newRefreshTokenExp - Math.floor(Date.now() / 1000)) * 1000;

  // Set the cookie for Access Token
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: isProduction,  // true only in production
    sameSite: isProduction ? 'None' : 'Lax',  // Allow cross-origin in production
    maxAge: accessTokenMaxAge,
    domain: isProduction ? 'https://holidayplanning.onrender.com' : undefined,  // Optional: Set domain for production
  });

  // Set the cookie for Refresh Token
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
    maxAge: refreshTokenMaxAge,
    domain: isProduction ? 'https://holidayplanning.onrender.com' : undefined,  // Optional
  });

  // Set the cookie for is_auth
  res.cookie("is_auth", true, {
    httpOnly: false,
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax',
    maxAge: refreshTokenMaxAge,
    domain: isProduction ? 'https://holidayplanning.onrender.com' : undefined,  // Optional
  });
};

export default setTokensCookies;
