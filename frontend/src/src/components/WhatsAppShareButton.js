// src/components/WhatsAppShareButton.js
import React from "react";
import { useState } from "react";
const WhatsAppShareButton = ({ userName }) => {
    const [showPopup, setShowPopup] = useState(false);
    const dynamicImageUrl = `https://picsum.photos/200`;
    const inviteLink = `${window.location.origin}/invite?inviter=${userName}`;
    const handleOpenPopup = () => {
        setShowPopup(true);
      };
      const shareOnWhatsApp = () => {
        const text = encodeURIComponent(
          `Check out my score on Globetrotter!\n\n${inviteLink}`
        );
        window.open(`https://wa.me/?text=${text}`, "_blank");
      };

  return (
    <div
      style={{
        //position: "fixed",
        // bottom: "20px",
         left: "0%",
        //transform: "translateX(-50%)",
      }}
    >
      <button
        onClick={handleOpenPopup}
        style={{
          backgroundColor: "#25D366",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          left: "10px",
          bottom: "10px",
          position:"absolute"
        }}
      >
        Share 
      </button>
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              maxWidth: "400px",
              width: "100%",
              textAlign: "center",
              position: "relative",
            }}
          >
            <h3>Your Invite Preview</h3>
            {/* Dynamic image preview */}
            <img src={dynamicImageUrl} alt="Score Preview" style={{ width: "60%" }} />
            <p style={{ margin: "10px 0" }}>
              Share Link: <br />
              <a href={inviteLink} target="_blank" rel="noreferrer">
                {inviteLink}
              </a>
            </p>

            {/* Actual share button inside pop-up */}
            <button
              onClick={shareOnWhatsApp}
              style={{
                marginRight: "10px",
                backgroundColor: "#25D366",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Share on WhatsApp
            </button>

            {/* Close pop-up */}
            <button
              onClick={() => setShowPopup(false)}
              style={{
                backgroundColor: "#ccc",
                color: "#333",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppShareButton;
