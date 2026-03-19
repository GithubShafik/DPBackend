export let emailTemplates = {
  verification: {
    subject: `Please Confirm Your Email`,
    body: (infoObj) => {
      return `<!DOCTYPE HTML
        PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Confirm Email</title>
        <style type="text/css">
          @media only screen and (min-width: 620px) {
            .u-row {
              width: 600px !important;
            }
            .u-row .u-col {
              vertical-align: top;
            }
            .u-row .u-col-100 {
              width: 600px !important;
            }
          }
          @media (max-width: 620px) {
            .u-row-container {
              max-width: 100% !important;
              padding-left: 0px !important;
              padding-right: 0px !important;
            }
            .u-row .u-col {
              min-width: 320px !important;
              max-width: 100% !important;
              display: block !important;
            }
            .u-row {
              width: 100% !important;
            }
            .u-col {
              width: 100% !important;
            }
            .u-col>div {
              margin: 0 auto;
            }
          }
          body {
            margin: 0;
            padding: 0;
          }
          table,
          tr,
          td {
            vertical-align: top;
            border-collapse: collapse;
          }
          p {
            margin: 0;
          }
          .ie-container table,
          .mso-container table {
            table-layout: fixed;
          }
          * {
            line-height: inherit;
          }
          a[x-apple-data-detectors='true'] {
            color: inherit !important;
            text-decoration: none !important;
          }
          table,
          td {
            color: #000000;
          }
          #u_body a {
            color: #0000ee;
            text-decoration: underline;
          }
          @media (max-width: 480px) {
            #u_content_image_4 .v-src-width {
              width: auto !important;
            }
            #u_content_image_4 .v-src-max-width {
              max-width: 43% !important;
            }
            #u_content_heading_1 .v-container-padding-padding {
              padding: 8px 20px 0px !important;
            }
            #u_content_heading_1 .v-font-size {
              font-size: 21px !important;
            }
            #u_content_heading_1 .v-text-align {
              text-align: center !important;
            }
            #u_content_text_2 .v-container-padding-padding {
              padding: 35px 15px 10px !important;
            }
            #u_content_text_3 .v-container-padding-padding {
              padding: 10px 15px 40px !important;
            }
          }
        </style>
        <link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap" rel="stylesheet" type="text/css">
      </head>
      <body class="clean-body u_body"
        style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #c2e0f4;color: #000000">
        <table id="u_body"
          style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #c2e0f4;width:100%"
          cellpadding="0" cellspacing="0">
          <tbody>
            <tr style="vertical-align: top">
              <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                  <div class="u-row"
                    style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <div class="u-col u-col-100"
                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div style="height: 100%;width: 100% !important;">
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                              cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:0px 0px 10px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
                                    <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                      style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 6px solid #6f9de1;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                      <tbody>
                                        <tr style="vertical-align: top">
                                          <td
                                            style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                            <span>&#160;</span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table id="u_content_image_4" style="font-family:arial,helvetica,sans-serif;" role="presentation"
                              cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                        <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
                                          <img align="center" border="0"
                                            src="https://cdn.templates.unlayer.com/assets/1639409043831-1.png" alt="Logo"
                                            title="Logo"
                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 30%;max-width: 174px;"
                                            width="174" class="v-src-width v-src-max-width" />
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                  <div class="u-row"
                    style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <div class="u-col u-col-100"
                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div
                          style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                              cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                      <tr>
                                        <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
                                          <img align="center" border="0"
                                            src="https://cdn.templates.unlayer.com/assets/1639409113540-2.jpeg" alt="Banner"
                                            title="Banner"
                                            style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 94%;max-width: 545.2px;"
                                            width="545.2" class="v-src-width v-src-max-width" />
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table id="u_content_heading_1" style="font-family:arial,helvetica,sans-serif;"
                              role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:9px 30px 40px 31px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
                                    <h1 class="v-text-align v-font-size"
                                      style="margin: 0px; color: #023047; line-height: 170%; text-align: center; word-wrap: break-word; font-family: 'Open Sans',sans-serif; font-size: 26px; font-weight: 400;">
                                      <strong>Please Confirm Your Email</strong>
                                    </h1>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                  <div class="u-row"
                    style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <div class="u-col u-col-100"
                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div
                          style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                            <table id="u_content_text_2" style="font-family:arial,helvetica,sans-serif;" role="presentation"
                              cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:35px 55px 10px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
                                    <div class="v-text-align v-font-size"
                                      style="font-size: 14px; color: #333333; line-height: 180%; text-align: left; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 180%;"><span
                                          style="font-size: 18px; line-height: 32.4px; font-family: Lato, sans-serif;"><strong><span
                                              style="line-height: 32.4px; font-size: 18px;">Hi ${infoObj.name},
                                            </span></strong></span></p>
                                      <p style="font-size: 14px; line-height: 180%;">&nbsp;</p>
                                      <p style="font-size: 14px; line-height: 180%;"><span
                                          style="font-family: Lato, sans-serif; font-size: 16px; line-height: 28.8px;">I hope this email finds you well. We are writing to request email verification for your email address associated with our platform. Verifying your email is a crucial step in ensuring the security and accuracy of your account information.&nbsp;</span></p>
                                      <p style="font-size: 14px; line-height: 180%;">&nbsp;</p>
                                      <p style="font-size: 14px; line-height: 180%;"><span
                                          style="font-size: 16px; line-height: 28.8px; font-family: Lato, sans-serif;"><strong><span
                                              style="line-height: 28.8px; font-size: 16px;">To proceed with the verification process, please follow these simple steps:</span></strong></span>
                                      </p>
                                      <ul style="list-style-type: square;">
                                        <li style="font-size: 14px; line-height: 25.2px;"><span
                                            style="font-family: Lato, sans-serif; font-size: 16px; line-height: 28.8px;"><strong>Click on the following link or copy and paste it into your web browser:
                                            <a href="${infoObj.link}"> Verification Link </a> &nbsp;</strong></span></li>
                                        <li style="font-size: 14px; line-height: 25.2px;"><span
                                            style="font-family: Lato, sans-serif; font-size: 16px; line-height: 28.8px;"><strong>You will be directed to a verification page where you will need to confirm your email address.&nbsp;</strong></span></li>
                                        <li style="font-size: 14px; line-height: 25.2px;"><span
                                            style="font-family: Lato, sans-serif; font-size: 16px; line-height: 28.8px;"><strong>Once you have confirmed your email address, you will receive a confirmation message, and your email will be officially verified.</strong></span></li>
                                      </ul>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                              cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 30px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
                                    <div class="v-text-align" align="center">
                                      <a href="${infoObj.link}" target="_blank" class="v-button v-font-size"
                                        style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #33428d; border-radius: 44px;-webkit-border-radius: 44px; -moz-border-radius: 44px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                        <span style="display:block;padding:20px 70px;line-height:120%;"><strong><span
                                              style="font-family: 'Open Sans', sans-serif; font-size: 14px; line-height: 16.8px;">V
                                              E R I F Y&nbsp; &nbsp;N O W</span></strong></span>
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table id="u_content_text_3" style="font-family:arial,helvetica,sans-serif;" role="presentation"
                              cellpadding="0" cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px 55px 40px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
                                    <div class="v-text-align v-font-size"
                                      style="font-size: 14px; line-height: 170%; text-align: left; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 170%;"><span
                                          style="font-family: Lato, sans-serif; font-size: 16px; line-height: 27.2px;">This
                                          will ensure the authenticity of your data and information with the verification
                                          process is pretty simple and short. The information you provide is confidential and
                                          safe with us. </span></p>
                                      <p style="font-size: 14px; line-height: 170%;">&nbsp;</p>
                                      <p style="font-size: 14px; line-height: 170%;"><span
                                          style="font-family: Lato, sans-serif; font-size: 16px; line-height: 27.2px;">If you
                                          have any questions/issues regarding the process, feel free to contact
                                          us.&nbsp;</span></p>
                                      <p style="font-size: 14px; line-height: 170%;">&nbsp;</p>
                                      <p style="font-size: 14px; line-height: 170%;"><span
                                          style="font-family: Lato, sans-serif; font-size: 16px; line-height: 27.2px;">With
                                          Regards,</span></p>
                                      <p style="font-size: 14px; line-height: 170%;"><span
                                          style="font-family: Lato, sans-serif; font-size: 14px; line-height: 23.8px;"><strong><span
                                              style="font-size: 16px; line-height: 27.2px;">${infoObj.name}</span></strong></span>
                                      </p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                  <div class="u-row"
                    style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <div class="u-col u-col-100"
                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div
                          style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                              cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:5px 10px 40px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
                                    <h1 class="v-text-align v-font-size"
                                      style="margin: 0px; color: #000000; line-height: 140%; text-align: center; word-wrap: break-word; font-family: 'Lato',sans-serif; font-size: 26px; font-weight: 400;">
                                      Call: <strong>123-456-7890</strong></h1>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="u-row-container" style="padding: 0px;background-color: transparent">
                  <div class="u-row"
                    style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #080f30;">
                    <div
                      style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                      <div class="u-col u-col-100"
                        style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                        <div
                          style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                          <div
                            style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                            <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                              cellspacing="0" width="100%" border="0">
                              <tbody>
                                <tr>
                                  <td class="v-container-padding-padding"
                                    style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 35px;font-family:arial,helvetica,sans-serif;"
                                    align="left">
                                    <div class="v-text-align v-font-size"
                                      style="font-size: 14px; color: #ffffff; line-height: 210%; text-align: center; word-wrap: break-word;">
                                      <p style="font-size: 14px; line-height: 210%;"><span
                                          style="font-family: Lato, sans-serif; font-size: 14px; line-height: 29.4px;">You're
                                          receiving this email because you asked us about regular newsletter.</span></p>
                                      <p style="font-size: 14px; line-height: 210%;"><span
                                          style="font-family: Lato, sans-serif; font-size: 14px; line-height: 29.4px;">&copy;20XX
                                          your Company | 123 San Francisco, CA. United States</span></p>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
      </html>`;
    },
  },
  verified: {
    subject: `Your Account is confirmed`,
    body: (infoObj) => {
      return `
            <!DOCTYPE HTML
            PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
            xmlns:o="urn:schemas-microsoft-com:office:office">
          
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title>Email Verified</title>
            <style type="text/css">
              @media only screen and (min-width: 620px) {
                .u-row {
                  width: 600px !important;
                }
          
                .u-row .u-col {
                  vertical-align: top;
                }
          
                .u-row .u-col-50 {
                  width: 300px !important;
                }
          
                .u-row .u-col-100 {
                  width: 600px !important;
                }
              }
          
              @media (max-width: 620px) {
                .u-row-container {
                  max-width: 100% !important;
                  padding-left: 0px !important;
                  padding-right: 0px !important;
                }
          
                .u-row .u-col {
                  min-width: 320px !important;
                  max-width: 100% !important;
                  display: block !important;
                }
          
                .u-row {
                  width: 100% !important;
                }
          
                .u-col {
                  width: 100% !important;
                }
          
                .u-col>div {
                  margin: 0 auto;
                }
              }
          
              body {
                margin: 0;
                padding: 0;
              }
          
              table,
              tr,
              td {
                vertical-align: top;
                border-collapse: collapse;
              }
          
              p {
                margin: 0;
              }
          
              .ie-container table,
              .mso-container table {
                table-layout: fixed;
              }
          
              * {
                line-height: inherit;
              }
          
              a[x-apple-data-detectors='true'] {
                color: inherit !important;
                text-decoration: none !important;
              }
          
              table,
              td {
                color: #000000;
              }
          
              #u_body a {
                color: #0000ee;
                text-decoration: underline;
              }
          
              @media (max-width: 480px) {
                #u_content_heading_2 .v-font-size {
                  font-size: 45px !important;
                }
              }
            </style>
            <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap" rel="stylesheet" type="text/css">
          </head>
          
          <body class="clean-body u_body"
            style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #e7e7e7;color: #000000">
            <table id="u_body"
              style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%"
              cellpadding="0" cellspacing="0">
              <tbody>
                <tr style="vertical-align: top">
                  <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                    <div class="u-row-container"
                      style="padding: 0px;background-image: url('https://cdn.templates.unlayer.com/assets/1697613131983-Layer%20bg.png');background-repeat: no-repeat;background-position: center top;background-color: #fdeed2">
                      <div class="u-row"
                        style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div
                          style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                          <div class="u-col u-col-100"
                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                            <div style="height: 100%;width: 100% !important;">
                              <div
                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                <table id="u_content_heading_2" style="font-family:arial,helvetica,sans-serif;"
                                  role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td
                                        style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 10px;font-family:arial,helvetica,sans-serif;"
                                        align="left">
                                        <h1 class="v-font-size"
                                          style="margin: 0px; line-height: 110%; text-align: center; word-wrap: break-word; font-family: 'Montserrat',sans-serif; font-size: 50px; font-weight: 700;">
                                          Welcome</h1>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                                  cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td
                                        style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                        align="left">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                          <tr>
                                            <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                              <img align="center" border="0" src="https://cdn.templates.unlayer.com/assets/1697613425119-wel.png" alt="image" title="image"
                                                style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 580px;"
                                                width="580" />
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                                  cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td
                                        style="overflow-wrap:break-word;word-break:break-word;padding:50px 30px;font-family:arial,helvetica,sans-serif;"
                                        align="left">
                                        <div class="v-font-size"
                                          style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
                                          <p style="line-height: 140%;">Dear ${infoObj.name},</p>
                                          <p style="line-height: 140%;">We are pleased to inform you that your email address has
                                            been <strong>successfully verified,</strong> and your account is now active. Thank you
                                            for taking the time to complete the verification process.</p>
                                          <p style="line-height: 140%;"> </p>
                                          <p style="line-height: 140%;">As a valued member of our platform, we would like to
                                            provide you with your login credentials for easy access to your account:</p>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                      <div class="u-row"
                        style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div
                          style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                          <div class="u-col u-col-50"
                            style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
                            <div
                              style="background-color: #fdeed2;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                              <div
                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                                  cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td
                                        style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                        align="left">
                                        <div class="v-font-size"
                                          style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                                          <p style="line-height: 140%;"><strong>Login</strong></p>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          <div class="u-col u-col-50"
                            style="max-width: 320px;min-width: 300px;display: table-cell;vertical-align: top;">
                            <div
                              style="background-color: #fdeed2;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                              <div
                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                                  cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td
                                        style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                        align="left">
                                        <div class="v-font-size"
                                          style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                                          <p style="line-height: 140%;"><strong>${infoObj.email}</strong></p>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="u-row-container" style="padding: 0px;background-color: #fdeed2">
                      <div class="u-row"
                        style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div
                          style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                          <div class="u-col u-col-100"
                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                            <div
                              style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                              <div
                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                                  cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td
                                        style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                        align="left">
                                        <div align="center">
                                          <a href="${infoObj.link}" target="_blank" class="v-button v-font-size"
                                            style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #d4b4b2; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
                                            <span style="display:block;padding:10px 20px;line-height:120%;"><span
                                                style="line-height: 16.8px;">Login Here</span></span>
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                                  cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td
                                        style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;"
                                        align="left">
                                        <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                          style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                          <tbody>
                                            <tr style="vertical-align: top">
                                              <td
                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                <span>&#160;</span>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="u-row-container" style="padding: 0px;background-color: #fdeed2">
                      <div class="u-row"
                        style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div
                          style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
                          <div class="u-col u-col-100"
                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                            <div
                              style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                              <div
                                style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0"
                                  cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td
                                        style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:arial,helvetica,sans-serif;"
                                        align="left">
                                        <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                          style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                          <tbody>
                                            <tr style="vertical-align: top">
                                              <td
                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                <span>&#160;</span>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </body>
          </html>
            `;
    },
  },
  forgetpassward: {
    subject: "Forgot Your Password?",
    body: (infoObj) => {
      return `
      <!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		@media (max-width:620px) {

			.desktop_hide table.icons-inner,
			.social_block.desktop_hide .social-table {
				display: inline-block !important;
			}

			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}
		}
	</style>
</head>

<body style="background-color: #d9dffa; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
		style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d9dffa;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
						role="presentation"
						style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #cfd6f4;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0"
										cellspacing="0" role="presentation"
										style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 600px; margin: 0 auto;"
										width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="100%"
													style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-top: 20px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="image_block block-1" width="100%" border="0"
														cellpadding="0" cellspacing="0" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;">
																<div class="alignment" align="center"
																	style="line-height:10px"><img
																		src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/3991/animated_header.gif"
																		style="display: block; height: auto; border: 0; max-width: 600px; width: 100%;"
																		width="600"
																		alt="Card Header with Border and Shadow Animated"
																		title="Card Header with Border and Shadow Animated">
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
						role="presentation"
						style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #d9dffa; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/3991/body_background_2.png'); background-position: top center; background-repeat: repeat;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0"
										cellspacing="0" role="presentation"
										style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 600px; margin: 0 auto;"
										width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="100%"
													style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 15px; padding-left: 50px; padding-right: 50px; padding-top: 15px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="paragraph_block block-1" width="100%" border="0"
														cellpadding="10" cellspacing="0" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div
																	style="color:#506bec;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:38px;line-height:120%;text-align:left;mso-line-height-alt:45.6px;">
																	<p style="margin: 0; word-break: break-word;">
																		<strong><span>Forgot your
																				password?</span></strong></p>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-2" width="100%" border="0"
														cellpadding="10" cellspacing="0" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div
																	style="color:#40507a;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
																	<p style="margin: 0; word-break: break-word;">
																		<span>Hey ${infoObj.name}, we received a request to reset your
																			password.</span></p>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-3" width="100%" border="0"
														cellpadding="10" cellspacing="0" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div
																	style="color:#40507a;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:16px;line-height:120%;text-align:left;mso-line-height-alt:19.2px;">
																	<p style="margin: 0; word-break: break-word;">
																		<span>Let’s get you a new one!</span></p>
																</div>
															</td>
														</tr>
													</table>
													<table class="button_block block-4" width="100%" border="0"
														cellpadding="0" cellspacing="0" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad"
																style="padding-bottom:20px;padding-left:10px;padding-right:10px;padding-top:20px;text-align:left;">
																<div class="alignment" align="left">
																	<!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://www.example.com/" style="height:48px;width:212px;v-text-anchor:middle;" arcsize="34%" stroke="false" fillcolor="#506bec"><w:anchorlock/><v:textbox inset="5px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:15px"><![endif]--><a
																		href="${infoObj.link}" target="_blank"
																		style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#506bec;border-radius:16px;width:auto;border-top:0px solid TRANSPARENT;font-weight:undefined;border-right:0px solid TRANSPARENT;border-bottom:0px solid TRANSPARENT;border-left:0px solid TRANSPARENT;padding-top:8px;padding-bottom:8px;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:15px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span
																			style="padding-left:25px;padding-right:20px;font-size:15px;display:inline-block;letter-spacing:normal;"><span
																				style="word-break:break-word;"><span
																					style="line-height: 30px;"
																					data-mce-style><strong>RESET MY
																						PASSWORD</strong></span></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-5" width="100%" border="0"
														cellpadding="10" cellspacing="0" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div
																	style="color:#40507a;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
																	<p style="margin: 0; word-break: break-word;">
																		<span>Having trouble? <a
																				href="http://www.example.com/"
																				target="_blank" title="@socialaccount"
																				style="text-decoration: none; color: #40507a;"
																				rel="noopener"><strong></strong></a></span>
																	</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-6" width="100%" border="0"
														cellpadding="10" cellspacing="0" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div
																	style="color:#40507a;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
																	<p style="margin: 0; word-break: break-word;">Didn’t
																		request a password reset? You can ignore this
																		message.</p>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
						role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0"
										cellspacing="0" role="presentation"
										style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 600px; margin: 0 auto;"
										width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="100%"
													style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="image_block block-1" width="100%" border="0"
														cellpadding="0" cellspacing="0" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="width:100%;">
																<div class="alignment" align="center"
																	style="line-height:10px"><img
																		src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/3991/bottom_img.png"
																		style="display: block; height: auto; border: 0; max-width: 600px; width: 100%;"
																		width="600"
																		alt="Card Bottom with Border and Shadow Image"
																		title="Card Bottom with Border and Shadow Image">
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
						role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0"
										cellspacing="0" role="presentation"
										style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; width: 600px; margin: 0 auto;"
										width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="100%"
													style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 20px; padding-left: 10px; padding-right: 10px; padding-top: 10px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
													<table class="image_block block-1" width="100%" border="0"
														cellpadding="10" cellspacing="0" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center"
																	style="line-height:10px"><a
																		href="http://www.example.com/" target="_blank"
																		style="outline:none" tabindex="-1"><img
																			src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/3991/logo.png"
																			style="display: block; height: auto; border: 0; max-width: 145px; width: 100%;"
																			width="145" alt="Your Logo"
																			title="Your Logo"></a></div>
															</td>
														</tr>
													</table>
													<table class="social_block block-2" width="100%" border="0"
														cellpadding="10" cellspacing="0" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="center">
																	<table class="social-table" width="72px" border="0"
																		cellpadding="0" cellspacing="0"
																		role="presentation"
																		style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
																		<tr>
																			<td style="padding:0 2px 0 2px;"><a
																					href="https://www.instagram.com"
																					target="_blank"><img
																						src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/instagram@2x.png"
																						width="32" height="32"
																						alt="Instagram"
																						title="instagram"
																						style="display: block; height: auto; border: 0;"></a>
																			</td>
																			<td style="padding:0 2px 0 2px;"><a
																					href="https://www.twitter.com"
																					target="_blank"><img
																						src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/twitter@2x.png"
																						width="32" height="32"
																						alt="Twitter" title="twitter"
																						style="display: block; height: auto; border: 0;"></a>
																			</td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-3" width="100%" border="0"
														cellpadding="10" cellspacing="0" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div
																	style="color:#97a2da;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
																	<p style="margin: 0; word-break: break-word;">+(123)
																		456–7890</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-4" width="100%" border="0"
														cellpadding="10" cellspacing="0" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div
																	style="color:#97a2da;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
																	<p style="margin: 0; word-break: break-word;">This
																		link will expire in the next 24 hours.<br>Please
																		feel free to contact us at emailyourbrand.com.
																	</p>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-5" width="100%" border="0"
														cellpadding="10" cellspacing="0" role="presentation"
														style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div
																	style="color:#97a2da;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:12px;line-height:120%;text-align:center;mso-line-height-alt:14.399999999999999px;">
																	<p style="margin: 0; word-break: break-word;">
																		<span>Copyright© 2021 Your Brand.</span></p>
																	<p style="margin: 0; word-break: break-word;">
																		<span><a href="http://www.example.com/"
																				target="_blank"
																				title="Unsubscribe&nbsp;"
																				style="text-decoration: underline; color: #97a2da;"
																				rel="noopener">Unsubscribe</a> |&nbsp;<a
																				href="http://www.example.com/"
																				target="_blank"
																				title="Manage your preferences"
																				style="text-decoration: underline; color: #97a2da;"
																				rel="noopener">Manage your
																				preferences</a>&nbsp;|&nbsp;<a
																				href="http://www.example.com/"
																				target="_blank" title="Privacy Policy"
																				style="text-decoration: underline; color: #97a2da;"
																				rel="noopener">Privacy Policy</a></span>
																	</p>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table>
</body>

</html>
      `;
    },
  },
};
