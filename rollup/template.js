// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default ({ files }) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png">
      <link rel="manifest" href="assets/site.webmanifest">
      <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet">
      <link rel="stylesheet" href=${files.css[0].fileName}>
      <title>React Cool Img</title>
      <meta property="og:title" content="React Cool Img" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://react-cool-img.org" />
      <meta property="og:image" content="http://react-cool-img.org/assets/og_image.png" />
      <meta property="og:image:secure_url" content="https://react-cool-img.org/assets/og_image.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="760" />
    </head>
    <body>
      <div id="app"></div>
      <script type="text/javascript" src=${files.js[0].fileName}></script>
    </body>
  </html>
`;
