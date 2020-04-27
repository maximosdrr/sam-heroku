export const generateSucessConfirmationPage = (
  user: string,
  linkToSam: string,
  linkTo3h: string,
  linkTo3hLogo: string,
) => {
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <title>Confirmação do email</title>
    <style>
      body {
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
  
      img {
        border-radius: 50%;
      }
    </style>
  </head>
  
  <body>
    <div>
      <h3>Seu email foi confirmado</h3>
    </div>
    <div style="margin-top: 20px;">
      <img src="${linkTo3hLogo}" width="90" height="90">
    </div>
  
    <div style="margin-top: 20px;">
      <a href="${linkToSam}">Clique aqui para começar a utilizar o S.A.M</a>
    </div>
    <div>
      <a href="${linkTo3h}">--Mais Serviços--</a>
    </div>
    <div style="margin-top: 20px;">
      <h6>Obrigado por utilizar o S.A.M, ${user}, esperamos que ele seja de grande ajuda para você.
      </h6>
    </div>
  </body>
  
  </html>`;
};
