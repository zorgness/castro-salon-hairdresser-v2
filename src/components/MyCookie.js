import React from 'react'
import CookieConsent,{ resetCookieConsentValue }  from "react-cookie-consent";

const MyCookie = () => {

  // resetCookieConsentValue(`castr_cookie`)

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
      expires={10}
      // onAccept={() => {
      //   alert(`consent given. \n\n`);
      // }}
      // onDecline={() => {
      //     alert("nay!");
      //   }}
      >
      Nous utilisons nos cookies pour personnaliser le contenu et pour analyser notre trafic.

      </CookieConsent>


  )
}

export default MyCookie
