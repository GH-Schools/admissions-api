/* eslint-disable class-methods-use-this */
const { capitalizeFirstLetters } = require("../utils/helpers");

/**
 *
 */
const HtmlViews = {
  /**
   * @method
   * @param {{subject: string, content: string}} payload
   * @returns string
   */
  MailBody(payload) {
    return `
    <!doctype html>
    <html lang="en-US">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Email</title>
      <meta name="description" content="validate email template.">
      <style type="text/css">
          a:hover {text-decoration: underline !important;}
      </style>
    </head>
    
    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
      <!--100% body table-->
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
          <td>
            <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
              align="center" cellpadding="0" cellspacing="0">
              <tr>
                <td style="height:80px;">&nbsp;</td>
              </tr>
              <tr>
                <td style="text-align:center;">
                  <a href="${process.env.APP_BASE_URL}" title="logo" target="_blank">
                  <img width="180" height= "50" src="${process.env.APP_BASE_URL}/favicon.png" title="logo" alt="logo" style="object-fit:contain;">
                  </a>
                </td>
              </tr>
              <tr>
                <td style="height:20px;">&nbsp;</td>
              </tr>
              <tr>
                <td>
                  <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                    <tr>
                      <td style="height:40px;">&nbsp;</td>
                    </tr>
                    <tr>
                      <td style="padding:0 35px;">
                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">${payload.subject}</h1>
                        <span style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                          ${payload.content}
                        </p>
                      </td>
                    </tr>
                      <tr>
                          <td style="height:40px;">&nbsp;</td>
                      </tr>
                  </table>
                </td>
              <tr>
                <td style="height:20px;">&nbsp;</td>
              </tr>
              <tr>
                <td style="text-align:center;">
                  <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>Visit our Homepage</strong></p>
                </td>
              </tr>
              <tr>
                <td style="height:80px;">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <!--/100% body table-->
    </body>
    </html>`;
  },

  /**
   * @method
   * @param {{subject: string, content: string}} payload
   * @returns string
   */
  MailBody1(payload) {
    return `
    <!doctype html>
    <html lang="en-US">
    <head>
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title>Email</title>
      <meta name="description" content="validate email template.">
      <style type="text/css">
          a:hover {text-decoration: underline !important;}
      </style>
    </head>
    
    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <div class="">
      <div id=":11o" tabindex="-1"></div>
      <div id=":11e" class="ii gt">
        <div id=":11d" class="">
          <div
            class="m_2966877167459467684em_body"
            style="margin: 0px auto; padding: 0px"
            bgcolor="#f5f8fa"
          >
            <table
              width="100%"
              cellspacing="0"
              cellpadding="0"
              class="m_2966877167459467684em_full_wrap"
              align="center"
              bgcolor="#050505"
            >
              <tbody>
                <tr>
                  <td align="center" valign="top">
                    <table
                      align="center"
                      width="650"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                      class="m_2966877167459467684em_main_table"
                      style="width: 650px; table-layout: fixed"
                    >
                      <tbody>
                        <tr>
                          <td
                            align="center"
                            valign="top"
                            style="padding: 0 25px"
                            class="m_2966877167459467684em_aside10"
                          >
                            <table
                              width="100%"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                              align="center"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    height="25"
                                    style="height: 25px"
                                    class="m_2966877167459467684em_h20"
                                  >
                                    &nbsp;
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" valign="top">
                                    <a
                                      href="${process.env.APP_BASE_URL}"
                                      style="text-decoration: none"
                                      target="_blank"
                                      data-saferedirecturl="https://www.google.com/url?q=${process.env.APP_BASE_URL}&amp;source=gmail&amp;ust=1715678974105000&amp;usg=AOvVaw16KwfAhxpm9PB-vsRjMqDD"
                                      ><img
                                        src="${process.env.APP_BASE_URL}/favicon.png"
                                        width="172"
                                        height="auto"
                                        alt="GH Schools"
                                        border="0"
                                        style="
                                          display: block;
                                          font-family: Arial, sans-serif;
                                          font-size: 18px;
                                          line-height: 25px;
                                          text-align: center;
                                          color: #1d4685;
                                          font-weight: bold;
                                          max-width: 172px;
                                          max-height: 48px;
                                        "
                                        class="m_2966877167459467684em_w150 CToWUd"
                                        data-bit="iit"
                                    /></a>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    height="28"
                                    style="height: 28px"
                                    class="m_2966877167459467684em_h20"
                                  >
                                    &nbsp;
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

            <table
              width="100%"
              cellspacing="0"
              cellpadding="0"
              class="m_2966877167459467684em_full_wrap"
              align="center"
              bgcolor="#ffffff"
            >
              <tbody>
                <tr>
                  <td
                    align="center"
                    valign="top"
                    class="m_2966877167459467684em_aside5"
                  >
                    <table
                      align="center"
                      width="650"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                      class="m_2966877167459467684em_main_table"
                      style="width: 650px; table-layout: fixed"
                    >
                      <tbody>
                        <tr>
                          <td
                            align="center"
                            valign="top"
                            style="padding: 0 25px; background-color: #ffffff"
                            class="m_2966877167459467684em_aside10"
                          >
                            <table
                              width="100%"
                              cellspacing="0"
                              cellpadding="0"
                              align="center"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    height="45"
                                    style="height: 45px"
                                    class="m_2966877167459467684em_h20"
                                  >
                                    &nbsp;
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    height="14"
                                    style="
                                      height: 14px;
                                      font-size: 0px;
                                      line-height: 0px;
                                    "
                                  >
                                    &nbsp;
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    height="26"
                                    style="height: 26px"
                                    class="m_2966877167459467684em_h20"
                                  >
                                    &nbsp;
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    class="m_2966877167459467684em_grey"
                                    align="left"
                                    valign="top"
                                    style="
                                      font-family: Arial, sans-serif;
                                      font-size: 16px;
                                      line-height: 26px;
                                      color: #666666;
                                    "
                                  >
                                    <h3 style="color: #051d39">${payload.subject}</h3>
                                    ${payload.content}
                                    <br />
                                    <br />
                                    <p>Thank you,</p>
                                    <br />
                                    <p>GH Schools Admissions Team</p>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    height="26"
                                    style="height: 26px"
                                    class="m_2966877167459467684em_h20"
                                  >
                                    &nbsp;
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left" valign="top">
                                    <table
                                      width="250"
                                      style="
                                        width: 250px;
                                        background-color: #439b73;
                                        border-radius: 4px;
                                      "
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                      align="left"
                                    ></table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    height="25"
                                    style="height: 25px"
                                    class="m_2966877167459467684em_h20"
                                  >
                                    &nbsp;
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    class="m_2966877167459467684em_grey"
                                    align="center"
                                    valign="top"
                                    style="
                                      font-family: Arial, sans-serif;
                                      font-size: 16px;
                                      line-height: 26px;
                                      color: #666666;
                                    "
                                  >
                                    <br class="m_2966877167459467684em_hide" />
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    height="44"
                                    style="height: 44px"
                                    class="m_2966877167459467684em_h20"
                                  >
                                    &nbsp;
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

            <table
              width="100%"
              cellspacing="0"
              cellpadding="0"
              class="m_2966877167459467684em_full_wrap"
              align="center"
              bgcolor="#f5f8fa"
            >
              <tbody>
                <tr>
                  <td align="center" valign="top">
                    <table
                      align="center"
                      width="650"
                      border="0"
                      cellspacing="0"
                      cellpadding="0"
                      class="m_2966877167459467684em_main_table"
                      style="width: 650px; table-layout: fixed"
                    >
                      <tbody>
                        <tr>
                          <td
                            align="center"
                            valign="top"
                            style="padding: 0 25px"
                            class="m_2966877167459467684em_aside10"
                          >
                            <table
                              width="100%"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                              align="center"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    height="16"
                                    style="
                                      height: 16px;
                                      font-size: 1px;
                                      line-height: 1px;
                                      height: 16px;
                                    "
                                  >
                                    &nbsp;
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    class="m_2966877167459467684em_grey"
                                    align="center"
                                    valign="top"
                                    style="
                                      font-family: Arial, sans-serif;
                                      font-size: 15px;
                                      line-height: 18px;
                                      color: #666666;
                                      font-weight: bold;
                                    "
                                  >
                                    Problems or questions?
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    height="10"
                                    style="
                                      height: 10px;
                                      font-size: 1px;
                                      line-height: 1px;
                                    "
                                  >
                                    &nbsp;
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    align="center"
                                    valign="top"
                                    style="font-size: 0px; line-height: 0px"
                                  >
                                    <table
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                      align="center"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            width="15"
                                            align="left"
                                            valign="middle"
                                            style="
                                              font-size: 0px;
                                              line-height: 0px;
                                              width: 15px;
                                            "
                                          >
                                            <a
                                              href="mailto:admissionsregistration@ghschools.online"
                                              style="text-decoration: none"
                                              target="_blank"
                                              ><img
                                                src="https://ci3.googleusercontent.com/meips/ADKq_NY3881aryEKgYtDIpIxFGTmPTA5gyCBd8dZPDG9OYXUuNX_RI0vbud8phK3FEx2zAq9XsZBYP2tiwVTDLuFMlPiDj2Hfl2gQKggacLMD0BPsQIx9MPcXaM6=s0-d-e1-ft#https://app.mailgun.com/assets/pilot/images/templates/email_img.png"
                                                width="15"
                                                height="12"
                                                alt=""
                                                border="0"
                                                style="
                                                  display: block;
                                                  max-width: 15px;
                                                "
                                                class="CToWUd"
                                                data-bit="iit"
                                            /></a>
                                          </td>
                                          <td
                                            width="9"
                                            style="
                                              width: 9px;
                                              font-size: 0px;
                                              line-height: 0px;
                                            "
                                            class="m_2966877167459467684em_w5"
                                          >
                                            <img
                                              src="https://ci3.googleusercontent.com/meips/ADKq_NZf75n6bvAU1pNuJMv85vfEMQOCRFaRLlLPOqltrS0Bk4H18Z2gvHav5SyYMvLX7gjbQGJYAiHcOi9Y08WSimPsolu3FpFXndzPMVHiWJR3ifBCMZD4=s0-d-e1-ft#https://app.mailgun.com/assets/pilot/images/templates/spacer.gif"
                                              width="1"
                                              height="1"
                                              alt=""
                                              border="0"
                                              style="display: block"
                                              class="CToWUd"
                                              data-bit="iit"
                                            />
                                          </td>
                                          <td
                                            class="m_2966877167459467684em_grey m_2966877167459467684em_font_11"
                                            align="left"
                                            valign="middle"
                                            style="
                                              font-family: Arial, sans-serif;
                                              font-size: 13px;
                                              line-height: 15px;
                                              color: #666666;
                                            "
                                          >
                                            <a
                                              href="mailto:admissionsregistration@ghschools.online"
                                              style="
                                                text-decoration: none;
                                                color: #666666;
                                              "
                                              target="_blank"
                                              >admissionsregistration@ghschools.online</a
                                            >
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    height="9"
                                    style="
                                      font-size: 0px;
                                      line-height: 0px;
                                      height: 9px;
                                    "
                                    class="m_2966877167459467684em_h10"
                                  >
                                    <img
                                      src="https://ci3.googleusercontent.com/meips/ADKq_NZf75n6bvAU1pNuJMv85vfEMQOCRFaRLlLPOqltrS0Bk4H18Z2gvHav5SyYMvLX7gjbQGJYAiHcOi9Y08WSimPsolu3FpFXndzPMVHiWJR3ifBCMZD4=s0-d-e1-ft#https://app.mailgun.com/assets/pilot/images/templates/spacer.gif"
                                      width="1"
                                      height="1"
                                      alt=""
                                      border="0"
                                      style="display: block"
                                      class="CToWUd"
                                      data-bit="iit"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" valign="top">
                                    <table
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                      align="center"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            width="12"
                                            align="left"
                                            valign="middle"
                                            style="
                                              font-size: 0px;
                                              line-height: 0px;
                                              width: 12px;
                                            "
                                          ></td>
                                          <td
                                            width="7"
                                            style="
                                              width: 7px;
                                              font-size: 0px;
                                              line-height: 0px;
                                            "
                                            class="m_2966877167459467684em_w5"
                                          >
                                            &nbsp;
                                          </td>
                                          <td
                                            class="m_2966877167459467684em_grey m_2966877167459467684em_font_11"
                                            align="left"
                                            valign="middle"
                                            style="
                                              font-family: Arial, sans-serif;
                                              font-size: 13px;
                                              line-height: 15px;
                                              color: #666666;
                                            "
                                          >
                                            <a
                                              href="${process.env.APP_BASE_URL}"
                                              style="
                                                text-decoration: none;
                                                color: #666666;
                                              "
                                              target="_blank"
                                              data-saferedirecturl="https://www.google.com/url?q=${process.env.APP_BASE_URL}&amp;source=gmail&amp;ust=1715678974105000&amp;usg=AOvVaw16KwfAhxpm9PB-vsRjMqDD"
                                              >Mailgun</a
                                            >
                                            • 112 E. Pecan St. #1135 • San
                                            Antonio, TX 78205
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    height="35"
                                    style="height: 35px"
                                    class="m_2966877167459467684em_h20"
                                  >
                                    &nbsp;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td
                            height="1"
                            bgcolor="#dadada"
                            style="
                              font-size: 0px;
                              line-height: 0px;
                              height: 1px;
                            "
                          >
                            <img
                              src="https://ci3.googleusercontent.com/meips/ADKq_NZf75n6bvAU1pNuJMv85vfEMQOCRFaRLlLPOqltrS0Bk4H18Z2gvHav5SyYMvLX7gjbQGJYAiHcOi9Y08WSimPsolu3FpFXndzPMVHiWJR3ifBCMZD4=s0-d-e1-ft#https://app.mailgun.com/assets/pilot/images/templates/spacer.gif"
                              width="1"
                              height="1"
                              alt=""
                              border="0"
                              style="display: block"
                              class="CToWUd"
                              data-bit="iit"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td
                            align="center"
                            valign="top"
                            style="padding: 0 25px"
                            class="m_2966877167459467684em_aside10"
                          >
                            <table
                              width="100%"
                              border="0"
                              cellspacing="0"
                              cellpadding="0"
                              align="center"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    height="16"
                                    style="
                                      font-size: 0px;
                                      line-height: 0px;
                                      height: 16px;
                                    "
                                  >
                                    &nbsp;
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center" valign="top">
                                    <table
                                      border="0"
                                      cellspacing="0"
                                      cellpadding="0"
                                      align="left"
                                      class="m_2966877167459467684em_wrapper"
                                    >
                                      <tbody>
                                        <tr>
                                          <td
                                            class="m_2966877167459467684em_grey"
                                            align="center"
                                            valign="middle"
                                            style="
                                              font-family: Arial, sans-serif;
                                              font-size: 11px;
                                              line-height: 16px;
                                              color: #666666;
                                            "
                                          >
                                            © GH Schools ${new Date().getFullYear()} &nbsp;|&nbsp;
                                            <a
                                              href="https://email.mailgun.net/u/eJwUy1EOgyAMANDTyKephVr54GNHoaU6F4VlSnb9ZQd4JU3snokQOPtlVb_MxIaeA5sgERiDiXd7QsAANHmISMjjUkpYRS2iqkgsQ4Az78fW61jtdu98XdqKJZ4pzuA-qW29Sq6vdtu5H-3o3zwE2P5o1Ha6Ow34-AUAAP__RWErTw"
                                              style="
                                                text-decoration: underline;
                                                color: #666666;
                                              "
                                              target="_blank"
                                              data-saferedirecturl="https://www.google.com/url?q=https://email.mailgun.net/u/eJwUy1EOgyAMANDTyKephVr54GNHoaU6F4VlSnb9ZQd4JU3snokQOPtlVb_MxIaeA5sgERiDiXd7QsAANHmISMjjUkpYRS2iqkgsQ4Az78fW61jtdu98XdqKJZ4pzuA-qW29Sq6vdtu5H-3o3zwE2P5o1Ha6Ow34-AUAAP__RWErTw&amp;source=gmail&amp;ust=1715678974105000&amp;usg=AOvVaw3Gkud5K_kGmUVNafAZbCU_"
                                              >Unsubscribe</a
                                            >
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    height="16"
                                    style="
                                      font-size: 0px;
                                      line-height: 0px;
                                      height: 16px;
                                    "
                                  >
                                    &nbsp;
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
          </div>
        </div>
      </div>
      <div class="WhmR8e" data-hash="0"></div>
    </div>
    <!--/100% body table-->
    </body>
    </html>`;
  },

  /**
   * @param {*} response
   * @param {*} statusCode
   * @param {*} redirectUrl
   * @returns string
   */
  VerificationPage(response, statusCode, redirectUrl) {
    // console.log(
    //   !!redirectUrl && redirectUrl !== '#' && redirectUrl !== null,
    //   redirectUrl
    // );
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Verification</title>
      <script src="https://use.fontawesome.com/d902c87f4f.js"></script>
    </head>
    <body>
      <style type="text/css">
        * {
          font-family: Arial, Helvetica, sans-serif;
          box-sizing: border-box;
        }
    
        body{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 0;
          padding: 0;
          background-color: #eee;
        }
    
        main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: black;
          width: 90%;
          background-color: #fcfcff;
          padding: 3rem;
          margin: 3rem 0;
          border-radius: 10px;
        }
      </style>
      <main>
        <div>
        ${
          statusCode && statusCode === 200
            ? '<i style="font-size: 20px; color: green" class="fa fa-check-circle" aria-hidden="true"></i>'
            : '<i style="font-size: 20px; color: crimson"class="fa fa-times" aria-hidden="true"></i>'
        }
        </div>
        <h1>${response}</h1>
        ${
          !!redirectUrl && redirectUrl !== "#" && redirectUrl !== null
            ? `<p>Your would be redirected to the login page soon. If not, click <a href="${redirectUrl}">here</a></p>`
            : `<p>Go to <a href="${process.env.BNJ_WEB_BASE_URL}">homepage</a></p>`
        }
      </main>
      <script>
        ${
          !!redirectUrl && redirectUrl !== "#" && redirectUrl !== null
            ? `document.addEventListener("DOMContentLoaded", function() {
        setTimeout(function(){
          window.location.replace("${redirectUrl}");
        }, 80000);
      });`
            : ""
        }
      </script>
    </body>
    </html>`;
  },

  /**
   * @param {string} firstname
   * @param {string} lastname
   * @param {string} emailVerificationLink
   * @returns string
   */
  UserVerificationMailContent(
    firstname,
    lastname,
    onboardingPassword,
    emailVerificationLink
  ) {
    firstname = capitalizeFirstLetters(firstname);
    lastname = capitalizeFirstLetters(lastname);
    return !onboardingPassword
      ? `
    <div>
      <p style="font-size: 18px;">Welcome ${firstname} ${lastname}!</p><br/>
      <p style="font-size: 18px;line-height: 1.5">Please click the button below to verify your new account and have fun!</p><br><br/>
      <a href='${emailVerificationLink}' style="display:block;">
        <button style="background-color: darkgreen;border: none;border-radius:5px;color: white;width: 70%;height: 60px;text-align:center">Next Steps</button>
      </a>
    </div>
  `
      : `
  <div>
    <p style="font-size: 18px;">Welcome ${firstname} ${lastname}!</p><br/>
    <p style="font-size: 18px;">A one-time password has been generated for you: ${onboardingPassword}</p><br/>
    <p style="font-size: 18px;line-height: 1.5">Please click the button below to verify/login to your new account using your mobile number and your one-time password!</p><br><br/>
    <a href='${emailVerificationLink}' style="display:block;">
      <button style="background-color: darkgreen;border: none;border-radius:5px;color: white;width: 70%;height: 60px;text-align:center">Next Steps</button>
    </a>
  </div>
`;
  },

  /**
   * @param {User} user
   * @param {string} reactivationDate
   * @returns string
   */
  AccountReactivationMailContent(user, reactivationDate) {
    const fullName = `${capitalizeFirstLetters(
      user.firstname
    )} ${capitalizeFirstLetters(user.lastname)}`;
    return `
    <div>
    <p style="font-size: 18px;">Hello ${fullName}!</p>
    <p style="font-size: 16px;line-height: 1.5; text-align: left;">This is to notify you that the suspension on your account with the informations below has been lifted and account reactivated due settlement of your previous outstandings.</p>
    <div style="font-size: 14px;line-height: 2.2;margin-top: 1em; text-align: left;">
      <div><b>User ID: </b><span style="text-transform: uppercase">${
        user.userId
      }</span><div>
      <div><b>First Name: </b><span>${user.firstname}</span><div>
      <div><b>Last Name: </b><span>${user.lastname}</span><div>
      <div><b>Status: </b><span>${"Active"}</span><div>
      <div><b>Reactivated On: </b><span>${reactivationDate}</span><div>
    </div>

    <p style="font-size: 16px;line-height: 1.5">Login to you account to view more information. Have a nice day!</p>
  </div>
`;
  },

  /**
   * @param {*} fullname
   * @param {*} resetLink
   * @returns string
   */
  ResetPasswordMailContent(fullname, resetLink) {
    return `
    <div>
      <p style="font-size: 18px;">Welcome ${fullname.trim()}!</p><br/>

      <p style="font-size: 18px;line-height: 1.5">You requested for a password reset. If this request was not made by you, <a href="#">report this action</a>.</p>
      <p style="font-size: 18px;line-height: 1.5">To proceed with your password reset, click the button below:</p><br><br/>

      <a href='${resetLink}' style="display:block;">
        <button style="background-color: darkgreen;border: none;border-radius:5px;color: white;width: 70%;height: 60px;text-align:center">Reset Password</button>
      </a>
    </div>
  `;
  },
};

module.exports = HtmlViews;
