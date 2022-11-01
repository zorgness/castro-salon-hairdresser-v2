import React from 'react'
import CookieConsent from "react-cookie-consent";

const MyCookie = () => {


  return (
    <CookieConsent
      enableDeclineButton
      flipButtons
      cookieName={`castr_cookie`}
      style={{ background: "rgb(90, 40, 4)" }}
      buttonText={'accepter'}
      declineButtonText={'refuser'}
      buttonStyle={{ background: "white", color: "black", fontSize: "13px" }}
      declineButtonStyle={{ background: "black" ,color: "white", fontSize: "13px" }}
      cookieValue={true}
      declineCookieValue={false}
      expires={150}
      >
      Nous utilisons nos cookies pour personnaliser le contenu et pour analyser notre trafic.

      </CookieConsent>


  )
}

export default MyCookie
